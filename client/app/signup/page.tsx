import { type ReactNode } from "react";
import { Container, Image, Stack } from "@chakra-ui/react";
import Text from "@/components/typography/Text";
import Header from "@/components/typography/Header";
import Button from "@/components/Button";

export default function Home() {
  return (
    <>
      <Container as="main" maxWidth="container.lg" pt={12}>
        <Header as="h1" size="2xl" textAlign="center">
          Join the Guild!
        </Header>
        <Text textAlign="center">
          Your adventurer awaits! All visitors to Legend Mama’s tavern must be
          registered. Create a free account to enter.
        </Text>
        <Button secondary>Already have an account?</Button>
      </Container>
    </>
  );
}
