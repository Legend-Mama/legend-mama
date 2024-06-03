"use client";

import { DataContext, DataContextType } from "@/app/providers/DataProvider";
import { Box, Flex, Skeleton, Spinner } from "@chakra-ui/react";
import { useContext, useEffect, useMemo, useState } from "react";
import Text from "./typography/Text";
import { useRouter } from "next/navigation";
import Header from "./typography/Header";
import Button from "./Button";
import CharacterSheet from "@/lib/CharacterSheet";
import { getCharacterImage, getCharacterSheetById } from "@/app/characters/lib";
import { AuthContext } from "@/app/providers/AuthProvider";

type CharacterShortList = DataContextType["state"]["user"]["charSheets"];
type CharacterShort = CharacterShortList[number];

export default function CharactersList({
  max,
  mini,
}: {
  max?: number;
  mini?: boolean;
}) {
  const router = useRouter();

  const data = useContext(DataContext);
  const auth = useContext(AuthContext);

  const chars = useMemo(
    () => data.state.user.charSheets.slice(0, max ?? undefined),
    [data.state.user.charSheets, max]
  );

  const [loading, setLoading] = useState(true);

  const [characters, setCharacters] = useState<
    Record<string, { charSheet: CharacterSheet; image: string }>
  >({});

  useEffect(() => {
    async function run() {
      if (!auth.idToken) return;

      setLoading(true);

      const promises: Promise<void>[] = [];
      chars.forEach((char) => {
        promises.push(
          (async () => {
            const character: { charSheet?: CharacterSheet; image?: string } =
              {};
            const charSheet = await getCharacterSheetById(
              char.id,
              auth.idToken!
            );
            character.charSheet = charSheet;

            if (charSheet.charImage) {
              const { url } = await getCharacterImage(
                charSheet.charImage,
                auth.idToken!
              );
              character.image = url;
            } else {
              character.image = "";
            }
            setCharacters((x) => ({ ...x, [char.id]: character as any }));
          })()
        );
      });

      await Promise.all(promises);
      setLoading(false);
    }
    void run();
  }, [auth.idToken, chars]);

  return data.state.loading || loading ? (
    <Flex flexWrap="wrap" gap={18} justifyContent="center">
      {[0, 1, 2, 3].map((num) => (
        <CharCard char={{} as any} key={num} mini={mini} loading />
      ))}
    </Flex>
  ) : (
    <Flex flexWrap="wrap" gap={18} justifyContent="center" alignItems="center">
      <CharCard char={{} as any} newButton mini={mini} />
      {Object.entries(characters).map(([id, char]) => (
        <CharCard char={char} key={id} mini={mini} id={id} />
      ))}
      {max != null && data.state.user.charSheets.length > 0 && (
        <Button secondary onClick={() => router.push("/characters")}>
          View All
        </Button>
      )}
    </Flex>
  );
}

export function CharCard({
  char,
  mini,
  loading,
  newButton,
  id,
  ...props
}: {
  char: { charSheet: CharacterSheet; image: string };
  id?: string;
  mini?: boolean;
  loading?: boolean;
  newButton?: boolean;
}) {
  const router = useRouter();
  return (
    <Flex
      h={mini ? "160px" : "350px"}
      w={mini ? "250px" : "280px"}
      border="1px solid #888080"
      borderRadius={16}
      transform="rotate(-1deg)"
      flexShrink={0}
      flexDirection="column"
      justifyContent="end"
      filter="drop-shadow(0 0 0px #585342)"
      _hover={{
        ...(!loading && {
          filter: "drop-shadow(0 0 6px #585342)",
          cursor: "pointer",
        }),
      }}
      bg={char.image ? `url(${char.image})` : "#231F17"}
      bgSize="cover"
      transition="all 0.2s"
      {...props}
      onClick={() => {
        if (!loading) {
          router.push(newButton ? "/characters/new" : `/characters/${id}`);
        }
      }}
    >
      {loading ? (
        <Flex h="100%" w="100%" alignItems="center" justifyContent="center">
          <Spinner color="#D7C5A055" size="xl" />
        </Flex>
      ) : newButton ? (
        <Flex
          h="100%"
          w="100%"
          flexDir="column"
          alignItems="center"
          justifyContent="center"
        >
          <Header textAlign="center">Find New Adventurer</Header>
          {!mini && (
            <Header
              textAlign="center"
              fontFamily="var(--font-source-sans)"
              mb="0"
            >
              +
            </Header>
          )}
        </Flex>
      ) : (
        <Text
          fontSize={mini ? 16 : 20}
          fontWeight="bold"
          color="white"
          textShadow="-1px 0 0 black, 0 1px 0 black, 1px 0 0 black, 0 -1px 0 black"
          mb={6}
          mx={4}
          whiteSpace="nowrap"
          textOverflow="ellipsis"
          overflow="hidden"
        >
          {char.charSheet.name}
        </Text>
      )}
    </Flex>
  );
}
