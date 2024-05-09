"use client";
import {
  Box,
  Container,
  Flex,
  Textarea,
  VStack,
  useSteps,
} from "@chakra-ui/react";
import StepperNav, { steps } from "./StepperNav";
import Header from "@/components/typography/Header";
import Button from "@/components/Button";
import { useCallback } from "react";

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
            >
              <Header mb={4}>What's your character's name?</Header>
              <Textarea />
            </Flex>
            <Flex
              id="1-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
            >
              <Header mb={4}>Beliefs/values field 1?</Header>
              <Textarea mb={4} />
              <Flex w="100%" gap={2}>
                <Button secondary flexGrow={1}>
                  Answer 1
                </Button>
                <Button secondary flexGrow={1}>
                  Answer 2
                </Button>
              </Flex>
              <Flex w="100%" gap={2} mt={2}>
                <Button secondary flexGrow={1}>
                  Answer 3
                </Button>
                <Button secondary flexGrow={1}>
                  Answer 4
                </Button>
              </Flex>
            </Flex>
            <Flex
              id="2-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
            >
              <Header mb={4}>Personality field 1?</Header>
              <Textarea mb={4} />
              <Flex w="100%" gap={2}>
                <Button secondary flexGrow={1}>
                  Answer 1
                </Button>
                <Button secondary flexGrow={1}>
                  Answer 2
                </Button>
              </Flex>
              <Flex w="100%" gap={2} mt={2}>
                <Button secondary flexGrow={1}>
                  Answer 3
                </Button>
                <Button secondary flexGrow={1}>
                  Answer 4
                </Button>
              </Flex>
            </Flex>
            <Flex
              id="3-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
            >
              <Header mb={4}>Background field 1?</Header>
              <Textarea mb={4} />
              <Flex w="100%" gap={2}>
                <Button secondary flexGrow={1}>
                  Answer 1
                </Button>
                <Button secondary flexGrow={1}>
                  Answer 2
                </Button>
              </Flex>
              <Flex w="100%" gap={2} mt={2}>
                <Button secondary flexGrow={1}>
                  Answer 3
                </Button>
                <Button secondary flexGrow={1}>
                  Answer 4
                </Button>
              </Flex>
            </Flex>
            <Flex
              id="4-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
            >
              <Header mb={4}>Skills/equipment field 1?</Header>
              <Textarea mb={4} />
              <Flex w="100%" gap={2}>
                <Button secondary flexGrow={1}>
                  Answer 1
                </Button>
                <Button secondary flexGrow={1}>
                  Answer 2
                </Button>
              </Flex>
              <Flex w="100%" gap={2} mt={2}>
                <Button secondary flexGrow={1}>
                  Answer 3
                </Button>
                <Button secondary flexGrow={1}>
                  Answer 4
                </Button>
              </Flex>
            </Flex>
            <Flex
              id="5-step"
              w="100%"
              direction="column"
              alignItems="center"
              pt={8}
            >
              <Header mb={4}>Generate backstory</Header>
            </Flex>
          </VStack>
        </Container>
      </Box>
    </Flex>
  );
}
