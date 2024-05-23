import Button from "@/components/Button";
import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import { character1 } from "@/data/characterSheetTestData";
import { Box, Container, Flex } from "@chakra-ui/react";
import { BiPlusCircle } from "react-icons/bi";
import { AbilityScoreTable, SkillsTable } from "./Tables";

export default function CharacterView({
  params: { characterId },
}: {
  params: { characterId: string };
}) {
  const { charSheet } = character1;
  return (
    <Container maxWidth="container.lg" as="main" py={12}>
      <Flex gap={4}>
        {/* Name, bio, share, print */}
        <Box>
          <Flex>
            <Box>
              <Header as="h1" glow>
                {charSheet.name}
              </Header>
              <Text fontSize={16} fontWeight={500}>
                Level {charSheet.level} {charSheet.class} {charSheet.race}
              </Text>
              <Text mb={4} fontSize={16} fontWeight={500}>
                <em>{charSheet.background.description}</em>
              </Text>
              <Text fontSize={14}>{charSheet.backstory}</Text>
            </Box>
            <Box flexShrink={0}>
              <Button secondary w="100%" mb={2}>
                Share
              </Button>
              <Button secondary w="100%">
                Print
              </Button>
            </Box>
          </Flex>
        </Box>
        {/* Image card */}
        <Flex
          bg="#231F17"
          h={500}
          w={400}
          flexShrink={0}
          borderRadius={20}
          border="solid 2px #999080"
          alignItems="center"
          justifyContent="center"
          flexDir="column"
          transform="rotate(1deg)"
        >
          <BiPlusCircle color="#D7C5A0" size={32} />
          <Text>Todo: click here to generate image</Text>
        </Flex>
      </Flex>
      {/* Big stats */}
      <Flex
        w="100%"
        justifyContent="space-evenly"
        borderRadius={30}
        bg="#1F1B13"
        border="2px solid #4D4639"
        alignItems="center"
        pt="2px"
        pb="12px"
        mt={8}
      >
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {charSheet.armorClass}
          </Text>
          <Text fontWeight={600}>Armor Class</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {charSheet.initiative}
          </Text>
          <Text fontWeight={600}>Initiative</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {charSheet.speed}
          </Text>
          <Text fontWeight={600}>Speed</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {charSheet.hitDice}
          </Text>
          <Text fontWeight={600}>Hit Dice</Text>
        </Flex>
        <Flex flexDir="column" alignItems="center" justifyContent="center">
          <Text mb={0} fontSize={48}>
            {charSheet.hitPointMax}
          </Text>
          <Text fontWeight={600}>Hit Point Maximum</Text>
        </Flex>
      </Flex>
      {/* Ability Scores */}
      <Flex
        w="100%"
        justifyContent="space-evenly"
        borderRadius={10}
        bg="#1F1B13"
        border="2px solid #4D4639"
        alignItems="center"
        pt="2px"
        pb="12px"
        mt={4}
      >
        <AbilityScoreTable charSheet={charSheet} />
      </Flex>
      <Flex w="100%" pt="2px" pb="12px" mt={4} gap={4}>
        {/* Skills */}
        <Box
          flexShrink={0}
          borderRadius={10}
          bg="#1F1B13"
          border="2px solid #4D4639"
          alignItems="center"
          pt="2px"
          pb="12px"
          px="24px"
        >
          <Header as="h2" textAlign="center" fontSize={24}>
            Skills
          </Header>
          <SkillsTable charSheet={charSheet} />
        </Box>
        <Flex flexDir="column" gap={4}>
          {/* Features & Traits */}
          <Box
            w="100%"
            borderRadius={10}
            bg="#1F1B13"
            border="2px solid #4D4639"
            alignItems="center"
            pt="2px"
            pb="12px"
            px="24px"
          >
            <Header as="h2" textAlign="center" fontSize={24}>
              Features
            </Header>
            <Flex flexWrap="wrap">
              {charSheet.features.map((feature) => {
                return (
                  <Text key={feature} mb={0} px={2} fontSize={14}>
                    {feature}
                  </Text>
                );
              })}
            </Flex>
            <Header as="h2" textAlign="center" fontSize={24}>
              Traits
            </Header>
            {charSheet.personalityTraits.map((trait) => {
              return (
                <Text key={trait} fontSize={14}>
                  {trait}
                </Text>
              );
            })}
          </Box>
          {/* Proficiencies & Language */}
          <Box
            w="100%"
            borderRadius={10}
            bg="#1F1B13"
            border="2px solid #4D4639"
            alignItems="center"
            pt="2px"
            pb="12px"
            px="24px"
          >
            <Header as="h2" textAlign="center" fontSize={24}>
              Weapon Proficiency
            </Header>
            <Flex flexWrap="wrap">
              {charSheet.weaponProficiency.map((wp) => {
                return (
                  <Text key={wp} mb={0} px={2} fontSize={14}>
                    {wp}
                  </Text>
                );
              })}
            </Flex>
            <Header as="h2" textAlign="center" fontSize={24} mt={2}>
              Armor Proficiency
            </Header>
            <Flex flexWrap="wrap">
              {charSheet.armorProficiency.map((ap) => {
                return (
                  <Text key={ap} mb={0} px={2}>
                    {ap}
                  </Text>
                );
              })}
            </Flex>
            <Header as="h2" textAlign="center" fontSize={24} mt={2}>
              Tool Proficiency
            </Header>
            <Flex flexWrap="wrap">
              {charSheet.toolProficiency.length ? (
                charSheet.toolProficiency.map((tp) => {
                  return (
                    <Text key={tp} mb={0} px={2}>
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
    </Container>
  );
}
