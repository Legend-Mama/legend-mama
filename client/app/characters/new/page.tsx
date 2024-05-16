"use client";
import Button from "@/components/Button";
import InfoBox from "@/components/InfoBox";
import GPToken from "@/components/icons/GPToken";
import InputGroup from "@/components/input/InputGroup";
import TextArea from "@/components/input/TextArea";
import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import classesJson from "@/data/dnd5e/classes.json";
import racesJson from "@/data/dnd5e/races.json";
import {
  Box,
  Container,
  Divider,
  Flex,
  Grid,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import { useCallback, useState } from "react";
import StepperNav, { steps } from "./StepperNav";
import readyBtn from "@/public/img/ready-button.png";
import Image from "next/image";

const { races } = racesJson;
const { classes } = classesJson;

interface Values {
  name: string;
  race: string;
  class: string;
  worldview: { value: string; freetext: boolean };
  ethicalTraits: { value: string; freetext: boolean };
  personalityScores: {
    extraversion: { value: string; freetext: boolean };
    agreeableness: { value: string; freetext: boolean };
    conscientiousness: { value: string; freetext: boolean };
    neuroticism: { value: string; freetext: boolean };
    opennessToExperience: { value: string; freetext: boolean };
  };
  quirks: { value: string; freetext: boolean };
  motivations: { value: string; freetext: boolean };
  fears: { value: string; freetext: boolean };
  likes: { value: string; freetext: boolean };
  dislikes: { value: string; freetext: boolean };
}

const worldviews = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const ethicalTraits = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const extraversion = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const agreeableness = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const conscientiousness = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const neuroticism = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const opennessToExperience = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const quirks = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const motivations = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const fears = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const likes = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

const dislikes = [
  { name: "option1", description: "Option 1" },
  { name: "option2", description: "Option 2" },
  { name: "option3", description: "Option 3" },
  { name: "option4", description: "Option 4" },
];

export default function NewCharacter() {
  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const setActiveStepAndScroll = useCallback(
    (step: number) => {
      setActiveStep(step);
      document
        .getElementById(`${step}-step`)
        ?.scrollIntoView({ behavior: "smooth" });
    },
    [setActiveStep]
  );

  const [values, setValues] = useState<Values>({
    name: "",
    race: "",
    class: "",
    worldview: { freetext: true, value: "" },
    ethicalTraits: { freetext: true, value: "" },
    personalityScores: {
      extraversion: { freetext: true, value: "" },
      agreeableness: { freetext: true, value: "" },
      conscientiousness: { freetext: true, value: "" },
      neuroticism: { freetext: true, value: "" },
      opennessToExperience: { freetext: true, value: "" },
    },
    quirks: { freetext: true, value: "" },
    motivations: { freetext: true, value: "" },
    fears: { freetext: true, value: "" },
    likes: { freetext: true, value: "" },
    dislikes: { freetext: true, value: "" },
  });

  return (
    <Flex as="main" h="100%" w="100%">
      <Flex h="100%" w={300}>
        <StepperNav
          activeStep={activeStep}
          setActiveStep={setActiveStepAndScroll}
        />
      </Flex>
      <Box h="100%" flexGrow={1} overflowY="auto">
        <Container maxWidth="container.md">
          <VStack w="100%" mb={8}>
            <Flex
              id="0-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
              gap={6}
            >
              <Header size="2xl" mb={4}>
                Basics
              </Header>
              <Box w="100%" textAlign="center">
                <Header mb={4}>
                  What{"'"}s your character{"'"}s name?
                </Header>
                <InputGroup
                  serif
                  onChange={(e) =>
                    setValues((v) => ({ ...v, name: e.target.name }))
                  }
                />
              </Box>
              <Box w="100%" textAlign="center">
                <Header mb={4}>
                  What{"'"}s your character{"'"}s race?
                </Header>
                <RaceSelect values={values} setValues={setValues} />
              </Box>
              <Box w="100%" textAlign="center">
                <Header mb={4}>
                  What{"'"}s your character{"'"}s class?
                </Header>
                <ClassSelect values={values} setValues={setValues} />
              </Box>
            </Flex>
            <Divider mt={8} />
            <Flex
              id="1-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
              gap={6}
            >
              <Header size="2xl" mb={4}>
                Beliefs & Values
              </Header>{" "}
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    worldview: {
                      value,
                      freetext,
                    },
                  }))
                }
                title="How does your character feel about the world?"
                valueField={values.worldview}
                options={worldviews}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    ethicalTraits: {
                      value,
                      freetext,
                    },
                  }))
                }
                title="What are their guiding principles?"
                valueField={values.ethicalTraits}
                options={ethicalTraits}
              />
            </Flex>
            <Divider mt={8} />
            <Flex
              id="2-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
              gap={6}
            >
              <Header size="2xl" mb={4}>
                Personality
              </Header>
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    personalityScores: {
                      ...v.personalityScores,
                      extraversion: {
                        value,
                        freetext,
                      },
                    },
                  }))
                }
                title="Do they have a lot of friends?"
                valueField={values.personalityScores.extraversion}
                options={extraversion}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    personalityScores: {
                      ...v.personalityScores,
                      agreeableness: {
                        value,
                        freetext,
                      },
                    },
                  }))
                }
                title="Do they get along well with those in need?"
                valueField={values.personalityScores.agreeableness}
                options={agreeableness}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    personalityScores: {
                      ...v.personalityScores,
                      conscientiousness: {
                        value,
                        freetext,
                      },
                    },
                  }))
                }
                title="How much do they plan their adventures?"
                valueField={values.personalityScores.conscientiousness}
                options={conscientiousness}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    personalityScores: {
                      ...v.personalityScores,
                      neuroticism: {
                        value,
                        freetext,
                      },
                    },
                  }))
                }
                title="What do they do when faced with great odds?"
                valueField={values.personalityScores.neuroticism}
                options={neuroticism}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    personalityScores: {
                      ...v.personalityScores,
                      opennessToExperience: {
                        value,
                        freetext,
                      },
                    },
                  }))
                }
                title="How do they feel about the unknown?"
                valueField={values.personalityScores.opennessToExperience}
                options={opennessToExperience}
              />
            </Flex>
            <Divider mt={8} />
            <Flex
              id="3-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
              gap={6}
            >
              <Header size="2xl" mb={4}>
                Background
              </Header>
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    quirks: {
                      value,
                      freetext,
                    },
                  }))
                }
                title="Do they have any unique traits or quirks?"
                valueField={values.quirks}
                options={quirks}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    motivations: {
                      value,
                      freetext,
                    },
                  }))
                }
                title="What motivates them? Do they have a goal they wish to achieve?"
                valueField={values.motivations}
                options={motivations}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    fears: {
                      value,
                      freetext,
                    },
                  }))
                }
                title="What does your character fear?"
                valueField={values.fears}
                options={fears}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    likes: {
                      value,
                      freetext,
                    },
                  }))
                }
                title="What does your character like?"
                valueField={values.likes}
                options={likes}
              />
              <FreetextOrButton
                setValues={(value, freetext) =>
                  setValues((v) => ({
                    ...v,
                    dislikes: {
                      value,
                      freetext,
                    },
                  }))
                }
                title="What does your character dislike?"
                valueField={values.dislikes}
                options={dislikes}
              />
            </Flex>
            <Divider mt={8} />
            <Flex
              id="4-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
            >
              <Header size="2xl" mb={4}>
                Generate Backstory & Character Sheet
              </Header>
              <Header size="3xl" mb={4} textAlign="center" glow>
                Are you ready to meet your adventurer?
              </Header>
              <Text>
                Legend Mama looks through her mammoth tome of wanderers. At
                last, she{"'"}s found one that fits your qualifications. Let
                {"'"}s hear the tale of how they made their mark — if any — on
                this history of this realm...
              </Text>
              <InfoBox mt={6} mb={12}>
                Generating this character will spend{" "}
                <GPToken height={14} width={14} /> 1GP as payment for Legend
                Mama{"'"}s services. Please ensure you are satisfied with your
                answers to the above questions before continuing.
              </InfoBox>
              <Image
                src={readyBtn}
                alt="Ready button"
                style={{ cursor: "pointer" }}
                onClick={() => console.log(values)}
              />
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
}

function FreetextOrButton({
  title,
  setValues,
  valueField,
  options,
}: {
  title: string;
  setValues: (val: string, freetext: boolean) => void;
  valueField: { freetext: boolean; value: string };
  options: { name: string; description: string }[];
}) {
  return (
    <Box w="100%" textAlign="center">
      <Header mb={4}>{title}</Header>
      <TextArea
        mb={4}
        onChange={(e) => {
          e.target.value && setValues(e.target.value, true);
        }}
        highlight={valueField.freetext}
        subtle={!valueField.freetext}
      />
      <Grid gap={2} templateColumns="repeat(2, 1fr)" flexShrink={0}>
        {options.map((x) => (
          <Button
            secondary
            flexGrow={1}
            key={x.name}
            onClick={() => setValues(x.name, false)}
            highlight={valueField.value === x.name}
          >
            {x.description}
          </Button>
        ))}
      </Grid>
    </Box>
  );
}

function RaceSelect({ values, setValues }: any) {
  return (
    <Flex w="100%" gap={4}>
      <Grid w="50%" gap={2} templateColumns="repeat(2, 1fr)" flexShrink={0}>
        {races.map((race) => (
          <Button
            secondary
            flexGrow={1}
            key={race.name}
            onClick={() =>
              setValues((v: Values) => ({ ...v, race: race.name }))
            }
            highlight={values.race === race.name}
          >
            {race.name}
          </Button>
        ))}
      </Grid>
      <Box flexGrow={1} overflow="hidden">
        <Text textAlign="left" fontSize={14}>
          {races.find((race) => race.name === values.race)?.description ?? "Select an option to learn more."}
        </Text>
      </Box>
    </Flex>
  );
}

function ClassSelect({ values, setValues }: any) {
  return (
    <Grid gap={2} templateColumns="repeat(2, 1fr)" flexShrink={0}>
      {classes.map((cls) => (
        <Button
          secondary
          flexGrow={1}
          key={cls.name}
          onClick={() => setValues((v: Values) => ({ ...v, class: cls.name }))}
          highlight={values.class === cls.name}
        >
          {cls.name}
        </Button>
      ))}
    </Grid>
  );
}
