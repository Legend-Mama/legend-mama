"use client";

import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import { Flex, Spinner } from "@chakra-ui/react";
import { Dispatch, SetStateAction, useCallback, useState } from "react";
import CharCreateForm from "./CharCreateForm";
import Hourglass from "@/components/icons/Hourglass";
import Button from "@/components/Button";
import { PageSteps, Values } from "./lib";
import CharacterSheet from "@/lib/CharacterSheet";
import CharacterSheetPreview from "./CharSheetPreview";

const DEFAULT_VALUES = {
  name: "",
  race: "",
  class: "",
  worldview: { freetext: true, value: "" },
  ethicalTraits: { freetext: true, value: "" },
  personalityScores: {
    extroversion: { freetext: true, value: "" },
    agreeableness: { freetext: true, value: "" },
    conscientiousness: { freetext: true, value: "" },
    neuroticism: { freetext: true, value: "" },
    openness: { freetext: true, value: "" },
  },
  quirks: { freetext: true, value: "" },
  motivations: { freetext: true, value: "" },
  fears: { freetext: true, value: "" },
  likes: { freetext: true, value: "" },
  dislikes: { freetext: true, value: "" },
  backstory: { freetext: true, value: "" },
} as const;

export default function NewCharacter() {
  const [pageStep, setPageStep] = useState<
    PageSteps
  >(PageSteps.form);

  const [charSheet, setCharSheet] = useState<CharacterSheet>();

  const [values, setValues] = useState<Values>(DEFAULT_VALUES);

  const handleNewForm = useCallback(
    () => {
      setValues(DEFAULT_VALUES);
      setPageStep(PageSteps.form);
    },
    []
  )

  switch (pageStep) {
    case PageSteps.form:
      return <CharCreateForm values={values} setValues={setValues} setPageStep={setPageStep} setCharSheet={setCharSheet} />;
    case PageSteps.loading:
      return <Loading />;
    case PageSteps.error:
      return <Error setPageStep={setPageStep} />;
    case PageSteps.charSheet:
      return <CharacterSheetPreview charSheet={charSheet!} handleNewForm={handleNewForm} />
  }
}

function Loading() {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Hourglass
        style={{ color: "var(--chakra-colors-brand-800)" }}
        height={32}
        width={32}
      />
      <Header>Please wait...</Header>
      <Text>
        Legend Mama is working. Please do not navigate away from this page.
      </Text>
      <Spinner size="xl" />
    </Flex>
  );
}

function Error({ setPageStep }: { setPageStep: Dispatch<SetStateAction<PageSteps>> }) {
  return (
    <Flex
      flexDir="column"
      h="100vh"
      w="100%"
      justifyContent="center"
      alignItems="center"
    >
      <Header>Sorry, something went wrong.</Header>
      <Text>An error occurred. Please try again.</Text>
      <Button onClick={() => setPageStep(PageSteps.form)}>Back</Button>
    </Flex>
  );
}
