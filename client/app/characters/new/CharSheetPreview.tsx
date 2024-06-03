import CharacterSheet from "@/lib/CharacterSheet";
import CharacterSheetTemplate from "../CharacterSheet";
import { Box, Container } from "@chakra-ui/react";
import Text from "@/components/typography/Text";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useContext } from "react";
import { PageSteps } from "../lib";
import { DataContext } from "@/app/providers/DataProvider";

export default function CharacterSheetPreview({
  charSheet,
  handleNewForm,
}: {
  charSheet: CharacterSheet;
  handleNewForm: () => void;
}) {
  const data = useContext(DataContext);

  return (
    <Box>
      <Container maxWidth="container.lg" as="header" pt={6} pb={4}>
        {data.state.user.goldBalance != null && data.state.user.goldBalance > 0 && (
          <Text
            fontWeight={600}
            fontSize={16}
            fontFamily="var(--font-source-sans)"
            onClick={handleNewForm}
            cursor="pointer"
            display="inline-block"
          >
            ← Create a new character
          </Text>
        )}
      </Container>
      <CharacterSheetTemplate charSheet={charSheet} isPreview />
    </Box>
  );
}
