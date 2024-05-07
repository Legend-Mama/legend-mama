"use client";

import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import { Image, Link } from "@chakra-ui/next-js";
import logo from "@/public/img/legend-mama-logo.png";
import { Container, Stack } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "@/app/providers/AuthProvider";

export default function Home() {
  const auth = useContext(AuthContext);

  return (
    <>
      <header
        style={{
          height: 480,
          width: "100%",
          background: "url('/img/bg-castle-yuliya-pauliukevich-vecteezy.jpg')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          textAlign: "center",
        }}
      >
        <div
          style={{ margin: "0 auto", width: "fit-content", paddingTop: 138 }}
        >
          <Image src={logo} alt="Legend Mama logo" mb={4} />
          {auth.loggedIn ? (
            <Link href={"/tavern"} _hover={{ textDecoration: "unset" }}>
              <Header as="h1" size="2xl" glow mb="4">
                Enter the Tavern
              </Header>
            </Link>
          ) : (
            <Link href={"/auth/signup"} _hover={{ textDecoration: "unset" }}>
              <Header as="h1" size="2xl" glow mb="4">
                Start your legend
              </Header>
            </Link>
          )}
          {!auth.loggedIn && (
            <Link href="/auth/login" _hover={{ textDecoration: "unset" }}>
              <Header as="h2" glow color="white">
                Sign In
              </Header>
            </Link>
          )}
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
