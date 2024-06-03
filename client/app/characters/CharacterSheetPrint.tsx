import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import CharacterSheet from "@/lib/CharacterSheet";
import { Box, Container, Flex } from "@chakra-ui/react";
import { forwardRef } from "react";
import { AbilityScoreTable, SkillsTable } from "./[characterId]/Tables";

function hideNonRenderable(val: unknown) {
  if (typeof val !== "number" && typeof val !== "string") {
    return "";
  }
  return val;
}

function hideNonRenderableArr(val: unknown) {
  if (Array.isArray(val)) {
    return val;
  }
  return [];
}

// eslint-disable-next-line react/display-name
export const CharacterSheetPrint = forwardRef(
  ({ charSheet }: { charSheet: CharacterSheet }, ref) => {
    return (
      <div ref={ref as any}>
        <Box as="main" py={4} px={8} bg="white">
          <Flex gap={4}>
            {/* Name */}
            <Box>
              <Flex>
                <Box>
                  <Header as="h1" color="black" mb={1}>
                    {hideNonRenderable(charSheet.name)}
                  </Header>
                  <Text fontSize={16} fontWeight={500} color="black">
                    Level {hideNonRenderable(charSheet.level)}{" "}
                    {hideNonRenderable(charSheet.class)}{" "}
                    {hideNonRenderable(charSheet.race)}
                  </Text>
                </Box>
              </Flex>
            </Box>
          </Flex>
          {/* Big stats */}
          <Flex
            w="100%"
            justifyContent="space-evenly"
            borderRadius={30}
            bg=""
            border="2px solid #4D4639"
            alignItems="center"
            mt={4}
          >
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Text mb={0} fontSize={48} color="black">
                {hideNonRenderable(charSheet.armorClass)}
              </Text>
              <Text fontWeight={600} color="black">
                Armor Class
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Text mb={0} fontSize={48} color="black">
                {hideNonRenderable(charSheet.initiative)}
              </Text>
              <Text fontWeight={600} color="black">
                Initiative
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Text mb={0} fontSize={48} color="black">
                {hideNonRenderable(charSheet.speed)}
              </Text>
              <Text fontWeight={600} color="black">
                Speed
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Text mb={0} fontSize={48} color="black">
                {hideNonRenderable(charSheet.hitDice)}
              </Text>
              <Text fontWeight={600} color="black">
                Hit Dice
              </Text>
            </Flex>
            <Flex flexDir="column" alignItems="center" justifyContent="center">
              <Text mb={0} fontSize={48} color="black">
                {hideNonRenderable(charSheet.hitPointMax)}
              </Text>
              <Text fontWeight={600} color="black">
                Hit Point Maximum
              </Text>
            </Flex>
          </Flex>
          {/* Ability Scores */}
          <Flex
            w="100%"
            justifyContent="space-evenly"
            borderRadius={10}
            border="2px solid #4D4639"
            alignItems="center"
            pt="2px"
            pb="12px"
            mt={4}
          >
            <AbilityScoreTable charSheet={charSheet} print />
          </Flex>
          <Flex w="100%" pt="2px" pb="12px" mt={4} gap={4}>
            {/* Skills */}
            <Box
              flexShrink={0}
              borderRadius={10}
              border="2px solid #4D4639"
              alignItems="center"
              pt="10px"
              pb="12px"
              px="24px"
            >
              <Header
                as="h2"
                textAlign="center"
                fontSize={20}
                fontFamily="var(--font-source-sans)"
                color="black"
              >
                Skills
              </Header>
              <SkillsTable charSheet={charSheet} print />
            </Box>
            <Flex flexDir="column" gap={4}>
              {/* Features & Traits */}
              <Box
                w="100%"
                borderRadius={10}
                border="2px solid #4D4639"
                alignItems="center"
                pt="8px"
                pb="12px"
                px="24px"
              >
                <Header
                  as="h2"
                  textAlign="center"
                  fontSize={20}
                  fontFamily="var(--font-source-sans)"
                  color="black"
                >
                  Features
                </Header>
                <Flex flexWrap="wrap">
                  {hideNonRenderableArr(charSheet.features)?.map((feature) => {
                    return (
                      <Text
                        key={feature}
                        mb={0}
                        px={2}
                        fontSize={14}
                        color="black"
                      >
                        {feature}
                      </Text>
                    );
                  })}
                </Flex>
                <Header
                  as="h2"
                  textAlign="center"
                  fontSize={20}
                  fontFamily="var(--font-source-sans)"
                  color="black"
                >
                  Traits
                </Header>
                {hideNonRenderableArr(charSheet.personalityTraits)?.map(
                  (trait) => {
                    return (
                      <Text key={trait} fontSize={14} color="black">
                        {trait}
                      </Text>
                    );
                  }
                )}
              </Box>
              {/* Proficiencies & Language */}
              <Box
                w="100%"
                borderRadius={10}
                border="2px solid #4D4639"
                alignItems="center"
                pt="8px"
                pb="12px"
                px="24px"
              >
                <Header
                  as="h2"
                  textAlign="center"
                  fontSize={20}
                  fontFamily="var(--font-source-sans)"
                  color="black"
                >
                  Weapon Proficiency
                </Header>
                <Flex flexWrap="wrap">
                  {hideNonRenderableArr(charSheet.weaponProficiency)?.map(
                    (wp) => {
                      return (
                        <Text
                          key={wp}
                          mb={0}
                          px={2}
                          fontSize={14}
                          color="black"
                        >
                          {wp}
                        </Text>
                      );
                    }
                  )}
                </Flex>
                <Header
                  as="h2"
                  textAlign="center"
                  fontSize={20}
                  fontFamily="var(--font-source-sans)"
                  color="black"
                >
                  Armor Proficiency
                </Header>
                <Flex flexWrap="wrap">
                  {hideNonRenderableArr(charSheet.armorProficiency)?.map(
                    (ap) => {
                      return (
                        <Text key={ap} mb={0} px={2} color="black">
                          {ap}
                        </Text>
                      );
                    }
                  )}
                </Flex>
                <Header
                  as="h2"
                  textAlign="center"
                  fontSize={20}
                  fontFamily="var(--font-source-sans)"
                  color="black"
                >
                  Tool Proficiency
                </Header>
                <Flex flexWrap="wrap">
                  {hideNonRenderableArr(charSheet.toolProficiency)?.length ? (
                    charSheet.toolProficiency.map((tp) => {
                      return (
                        <Text key={tp} mb={0} px={2} color="black">
                          {tp}
                        </Text>
                      );
                    })
                  ) : (
                    <Text mb={0} px={2}>
                      N/A
                    </Text>
                  )}
                </Flex>
              </Box>
            </Flex>
          </Flex>
          <Text pt={20} mb={4} fontSize={14} fontWeight={500} color="black">
            <em>{hideNonRenderable(charSheet.background.description)}</em>
          </Text>
          <Text fontSize={14} color="black">
            {hideNonRenderable(charSheet.backstory)}
          </Text>
        </Box>
      </div>
    );
  }
);
