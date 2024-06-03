"use client";

import { DataContext, DataContextType } from "@/app/providers/DataProvider";
import { Box, Flex, Skeleton, Spinner } from "@chakra-ui/react";
import { useContext } from "react";
import Text from "./typography/Text";
import { useRouter } from "next/navigation";
import Header from "./typography/Header";
import Button from "./Button";

type CharacterShortList = DataContextType["user"]["charSheets"];
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
  return data.loading ? (
    <Flex flexWrap="wrap" gap={18} justifyContent="center">
      {[0, 1, 2, 3].map((num) => (
        <CharCard char={{} as any} key={num} mini={mini} loading />
      ))}
    </Flex>
  ) : (
    <Flex flexWrap="wrap" gap={18} justifyContent="center" alignItems="center">
      <CharCard char={{} as any} newButton mini={mini} />
      {data.user.charSheets.slice(0, max ?? undefined).map((char) => (
        <CharCard char={char} key={char.id} mini={mini} />
      ))}
      {max != null && data.user.charSheets.length > 0 && (
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
  ...props
}: {
  char: CharacterShort;
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
      bg="#231F17"
      transition="all 0.2s"
      {...props}
      onClick={() => {
        if (!loading) {
          router.push(newButton ? "/characters/new" : `/characters/${char.id}`);
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
          {char.name} asd awds a awdas dsadas daasdasds f dsfsd adsdas
        </Text>
      )}
    </Flex>
  );
}
