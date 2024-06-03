import CharacterSheet from "@/lib/CharacterSheet";
import CharacterSheetTemplate from "../CharacterSheet";
import { Box, Container } from "@chakra-ui/react";
import Text from "@/components/typography/Text";
import { useRouter } from "next/navigation";

export default function CharacterSheetPreview({
  charSheet,
}: {
  charSheet: CharacterSheet;
}) {
  const router = useRouter();

  return (
    <Box>
      <Container maxWidth="container.lg" as="header" pt={6} pb={4}>
        <Text
          fontWeight={600}
          fontSize={16}
          fontFamily="var(--font-source-sans)"
          onClick={() => router.refresh()}
          cursor="pointer"
          display="inline-block"
        >
          ← Create a new character
        </Text>
      </Container>
      <CharacterSheetTemplate charSheet={charSheet} isPreview />
    </Box>
  );
}
