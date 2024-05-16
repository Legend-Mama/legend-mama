"use client";
import Backpack from "@/components/icons/Backpack";
import IDCard from "@/components/icons/IDCard";
import InnerSelf from "@/components/icons/InnerSelf";
import Reading from "@/components/icons/Reading";
import ScrollQuill from "@/components/icons/ScrollQuill";
import Sparkles from "@/components/icons/Sparkles";
import {
  Box,
  Step,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
} from "@chakra-ui/react";
import { ReactNode } from "react";

export const steps: { title: string; description?: string; icon?: ReactNode }[] = [
  {
    title: "Basics",
    icon: <IDCard />,
  },
  { title: "Beliefs & Values", icon: <Reading /> },
  { title: "Personality", icon: <InnerSelf /> },
  { title: "Background", icon: <ScrollQuill /> },
  { title: "Skills & Equipment", icon: <Backpack /> },
  { title: "Generate Backstory & Character Sheet", icon: <Sparkles /> },
] as const;

export default function StepperNav({
  activeStep,
  setActiveStep,
}: {
  activeStep: number;
  setActiveStep: (step: number) => void;
}) {
  return (
    <Stepper
      colorScheme="brand"
      index={activeStep}
      orientation="vertical"
      alignSelf="center"
      h={600}
      gap={0}
      style={{ borderRight: "2px solid #373736" }}
      px={8}
      py={8}
    >
      {steps.map((step, idx) => (
        <Step key={idx}>
          <StepIndicator
            style={{
              ...(idx === 5 && { background: "#C7BFFF" }),
              ...(idx < activeStep
                ? { color: "#3A2F15" }
                : idx === 5 // generate backstory & char sheet
                ? idx > activeStep
                  ? {
                      color: "#C7BFFF",
                      borderColor: "#C7BFFF",
                      background: "unset",
                    } // Not yet on generate backstory & char sheet
                  : { color: "#2F295F", borderColor: "#C7BFFF" } // On generate backstory & char sheet
                : { color: "var(--chakra-colors-brand-800)" }),
              cursor: "pointer",
            }}
            onClick={() => setActiveStep(idx)}
          >
            <StepStatus
              complete={step.icon}
              incomplete={step.icon}
              active={step.icon}
            />
          </StepIndicator>
          <Box mt={1}>
            <StepTitle
              style={{
                cursor: "pointer",
                fontSize: 14,
                ...(idx === 5 && { color: "#C7BFFF" }),
              }}
              onClick={() => setActiveStep(idx)}
            >
              {step.title}
            </StepTitle>
          </Box>
          <StepSeparator
            style={{
              ...(idx === 4 && activeStep === 5 && { background: "#C7BFFF" }),
            }}
          />
        </Step>
      ))}
    </Stepper>
  );
}
