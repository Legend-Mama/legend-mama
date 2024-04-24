'use client';

import { type ReactNode } from "react";
import { Container, Image, Stack } from "@chakra-ui/react";
import Text from "@/components/typography/Text";
import Header from "@/components/typography/Header";
import { Link } from "@chakra-ui/next-js";

export default function Home() {
  return (
    <>
      <header
        style={{
          height: 480,
          width: "100vw",
          background: "url('/img/bg-castle-yuliya-pauliukevich-vecteezy.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{ margin: "0 auto", width: "fit-content", paddingTop: 138 }}
        >
          <Image
            src="/img/legend-mama-logo.png"
            alt="Legend Mama logo"
            mb={4}
          />
          <Link href="/signup" _hover={{ textDecoration: "unset" }}>
            <Header as="h1" size="2xl" glow mb="4">
              Start your legend
            </Header>
          </Link>
          <Header as="h2" glow color="white">
            Sign In
          </Header>
        </div>
      </header>
      <Container as="main" maxWidth="container.lg" pt={12}>
        <Stack spacing={6}>
          <div>
            <Header as="h2">Meet your hero (or villain)</Header>
            <Text ml={2}>
              D&D 5th Edition character generation, assisted by AI and powered
              by your creativity.
            </Text>
            <Text ml={2}>
              Tell Legend Mama all about your character: traits, skills, likes,
              hates, you name it! Receive a unique backstory and character sheet
              to kick start your next campaign.
            </Text>
            <Text ml={2}>
              Don{"’"}t know what you want for your character? Legend Mama can
              help you pick!
            </Text>
          </div>
          <div>
            <Header as="h2">Ready to party!</Header>
            <Text ml={2}>
              Share your adventurer’s info easily with your party for ease of
              reference. Save your characters so you can go forth and adventure
              with any of them in the future.
            </Text>
            <Text ml={2}>
              Our character sheets are print-friendly, ready for your next
              at-home tabletop session!
            </Text>
          </div>
        </Stack>
      </Container>
    </>
  );
}
