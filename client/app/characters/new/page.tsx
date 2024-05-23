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
import {
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import StepperNav, { steps } from "./StepperNav";
import readyBtn from "@/public/img/die.png";
import Image from "next/image";
import * as presets from "./presets";
import { Values, canSubmit, submitCharacterCreationForm } from "./lib";
import { DataContext } from "@/app/providers/DataProvider";
import { AuthContext } from "@/app/providers/AuthProvider";

const races = racesJson as Record<string, any>;
const { classes } = classesJson;

export default function NewCharacter() {
  const userData = useContext(DataContext);
  const token = useContext(AuthContext);

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
    backstory: { freetext: true, value: "" },
  });

  const enableSubmitButton = useMemo(() => canSubmit(values), [values]);

  const scrollRef = useRef<HTMLDivElement>(null);

  const [scrollInfo, setScrollInfo] = useState<{
    scrollTop: number;
    scrollBottom: number;
  }>();

  useEffect(() => {
    // Attach scroll listener
    const ref = scrollRef.current;
    if (!ref) return;

    function scrollHandler(_e: Event) {
      if (!ref) return;
      setScrollInfo({
        scrollTop: ref?.scrollTop,
        scrollBottom: ref?.scrollHeight - window.innerHeight - ref?.scrollTop,
      });
    }

    ref.addEventListener("scroll", scrollHandler);
    return () => ref?.removeEventListener("scroll", scrollHandler);
  }, []);

  return (
    <Flex as="main" h="100%" w="100%">
      {!userData.user.goldBalance ? (
        <VStack width="100%" mt={20}>
          <Header>Not Enough GP Tokens</Header>
          <Text>Unfortunately, you don{"'"}t have enough GP to create another character. Please come back in ~24 hours, when your GP is reset to 3GP.</Text>
        </VStack>
      ) : (
        <>
          <Flex h="100%" w={300}>
            <StepperNav
              activeStep={activeStep}
              setActiveStep={setActiveStepAndScroll}
            />
          </Flex>
          <Box
            h="100%"
            flexGrow={1}
            overflowY="auto"
            position="relative"
            ref={scrollRef}
            pb={20}
          >
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
                        setValues((v) => ({ ...v, name: e.target.value }))
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
                    options={presets.worldviews}
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
                    options={presets.ethicalTraits}
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
                    options={presets.extraversion}
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
                    options={presets.agreeableness}
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
                    options={presets.conscientiousness}
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
                    options={presets.neuroticism}
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
                    options={presets.opennessToExperience}
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
                        backstory: {
                          value,
                          freetext,
                        },
                      }))
                    }
                    title="Give us a short summary of what your character did before arriving here."
                    valueField={values.backstory}
                    options={presets.backstory}
                  />
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
                    options={presets.quirks}
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
                    options={presets.motivations}
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
                    options={presets.fears}
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
                    options={presets.likes}
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
                    options={presets.dislikes}
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
                  <Header
                    size="3xl"
                    mb={4}
                    textAlign="center"
                    glow={enableSubmitButton}
                    transition="0.8s all"
                  >
                    Are you ready to meet your adventurer?
                  </Header>
                  <Box position="relative">
                    <Text
                      opacity={enableSubmitButton ? 1 : 0}
                      transition="0.6s all"
                    >
                      Legend Mama looks through her mammoth tome of wanderers.
                      At last, she{"'"}s found one that fits your
                      qualifications. Let
                      {"'"}s hear the tale of how they made their mark — if any
                      — on this history of this realm...
                    </Text>
                    <Text
                      opacity={enableSubmitButton ? 0 : 1}
                      transition="0.6s all"
                      position="absolute"
                      top={0}
                      left="50%"
                      transform="translate(-50%, 0)"
                      textAlign="center"
                    >
                      Legend Mama requires more information before she can find
                      your adventurer.
                    </Text>
                  </Box>
                  <InfoBox mt={6} mb={12}>
                    Generating this character will spend{" "}
                    <GPToken height={14} width={14} /> 1GP as payment for Legend
                    Mama{"'"}s services. Please ensure you are satisfied with
                    your answers to the above questions before continuing.
                  </InfoBox>
                  <Box
                    position="relative"
                    onClick={
                      enableSubmitButton ? async () => token.idToken && await submitCharacterCreationForm(values, token.idToken) : undefined
                    }
                    cursor={enableSubmitButton ? "pointer" : "not-allowed"}
                  >
                    <Image
                      src={readyBtn}
                      alt="Ready button"
                      style={{
                        opacity: enableSubmitButton ? 1 : 0.5,
                        filter: enableSubmitButton
                          ? "drop-shadow(0 0 16px #F1EFBB)"
                          : "unset",
                        transition: "all 0.2s",
                      }}
                    />
                    <Text
                      color="#2F295F"
                      fontFamily="var(--font-source-sans)"
                      fontSize={enableSubmitButton ? 20 : 16}
                      fontWeight={600}
                      position="absolute"
                      top="50%"
                      left="50%"
                      transform="translate(-50%, -50%)"
                    >
                      {enableSubmitButton ? "Ready" : "Incomplete"}
                    </Text>
                  </Box>
                </Flex>
              </VStack>
            </Container>
            {/* Upper shadow */}
            <Box
              position="fixed"
              top="0"
              width="100%"
              height="20vh"
              bg="linear-gradient(0deg, #13120F00, #13120F 80%)"
              opacity={
                scrollInfo?.scrollTop && scrollInfo?.scrollTop > 300 ? 1 : 0
              }
              transition="all 0.4s"
              pointerEvents="none"
            />
            {/* Lower shadow */}
            <Box
              position="fixed"
              bottom="0"
              width="100%"
              height="20vh"
              bg="linear-gradient(#13120F00, #13120F 80%)"
              opacity={
                scrollInfo?.scrollBottom === undefined ||
                scrollInfo?.scrollBottom > 300
                  ? 1
                  : 0
              }
              transition="all 0.4s"
              pointerEvents="none"
            />
          </Box>
        </>
      )}
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
          if (e.target.value) {
            setValues(e.target.value, true);
          } else {
            // field emptied - user can clear the textarea if they selected a preset but make sure not to delete the value so that we preserve the preset selection
            // clear the value if a preset is not selected
            if (valueField.freetext) setValues(e.target.value, true);
          }
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
        {Object.keys(races).map((race) => (
          <Button
            secondary
            flexGrow={1}
            key={race}
            onClick={() => setValues((v: Values) => ({ ...v, race: race }))}
            highlight={values.race === race}
          >
            {race}
          </Button>
        ))}
      </Grid>
      <Box flexGrow={1} overflow="hidden">
        <Text textAlign="left" fontSize={14}>
          {races[values.race]?.description ?? "Select an option to learn more."}
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
