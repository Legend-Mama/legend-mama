import { type ReactNode } from "react";
import { Container, Image, Stack } from "@chakra-ui/react";
import Text from "@/components/typography/Text";
import Header from "@/components/typography/Header";
import Button from "@/components/Button";
import InputGroup from "@/components/input/InputGroup";
import GPToken from "@/components/icons/GPToken";

export default function Home() {
  return (
    <>
      <Container as="main" maxWidth="container.lg" pt={12}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Header as="h1" size="2xl" textAlign="center">
            Join the Guild!
          </Header>
          <Text mb={6} textAlign="center">
            Your adventurer awaits! All visitors to Legend Mama’s tavern must be
            registered. Create a free account to enter.
          </Text>
          <Button secondary mb={6}>
            Already have an account?
          </Button>
        </div>
        <Container mb={16}>
          <InputGroup
            name="nickname"
            leftWidth={140}
            stackPosition="top"
            left="Nickname"
            placeholder="e.g. The Great Bartholomew"
          />
          <InputGroup
            name="email"
            leftWidth={140}
            stackPosition="mid"
            left="Email"
            autoComplete="email"
          />
          <InputGroup
            name="password"
            leftWidth={140}
            stackPosition="mid"
            left="Password"
            type="password"
          />
          <InputGroup
            name="confirmPassword"
            leftWidth={140}
            stackPosition="bottom"
            left="Confirm Password"
            type="password"
          />
          <Stack direction="row" justifyContent="center" mt={6}>
            <Button width={200}>Sign Up</Button>
            <Button secondary width={200}>
              Continue with Google (temp)
            </Button>
          </Stack>
        </Container>
        <Header as="h2">Pricing Details</Header>
        <Text>
          All accounts have 3 gold pieces (<GPToken />GP) to spend on character generation
          per day. At midnight UTC, if you used any of your free GP, you will be
          topped off back to <GPToken />3 GP. Legend Mama requires <GPToken />1 GP for each character
          generation.
        </Text>
        <Text>
          More GP can be purchased if you wish for more, or if you simply wish
          to support our project!
        </Text>
      </Container>
    </>
  );
}
