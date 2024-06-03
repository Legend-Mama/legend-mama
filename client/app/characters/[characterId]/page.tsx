"use client";

import Button from "@/components/Button";
import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import { Box, Container, Flex, Spinner } from "@chakra-ui/react";
import { BiPlusCircle } from "react-icons/bi";
import { AbilityScoreTable, SkillsTable } from "./Tables";
import { useCallback, useContext, useEffect, useState } from "react";
import CharacterSheet from "@/lib/CharacterSheet";
import { AuthContext } from "@/app/providers/AuthProvider";
import { getCharacterSheetById } from "../lib";
import CharacterSheetTemplate from "../CharacterSheet";

export default function CharacterView({
  params: { characterId },
}: {
  params: { characterId: string };
}) {
  const auth = useContext(AuthContext);

  const [charSheet, setCharSheet] = useState<CharacterSheet>();
  const [status, setStatus] = useState<"loading" | "ready" | "error">(
    "loading"
  );

  const getCharSheet = useCallback(async () => {
    if (!auth?.idToken || !auth?.loggedIn) return;
    try {
      setStatus("loading");
      const charSheet = await getCharacterSheetById(characterId, auth.idToken);
      setCharSheet(charSheet);
      setStatus("ready");
    } catch {
      setStatus("error");
    }
  }, [auth.idToken, auth?.loggedIn, characterId]);

  useEffect(() => {
    void getCharSheet();
  }, [getCharSheet]);

  return (
    <Box py={8}>
      {status === "ready" ? (
        <CharacterSheetTemplate charSheet={charSheet!} id={characterId} getCharSheet={getCharSheet} />
      ) : status === "loading" ? (
        <Flex h={400} w="100%" alignItems="center" justifyContent="center">
          <Spinner size="xl" color="white" />
        </Flex>
      ) : (
        // Error
        <Flex h={400} w="100%" alignItems="center" justifyContent="center">
          <Text>
            Sorry, an error occurred while getting this character sheet. Please
            try refreshing your window.
          </Text>
        </Flex>
      )}
    </Box>
  );
}
