"use client";
import { AuthContext } from "@/app/providers/AuthProvider";
import CharactersList from "@/components/CharactersList";
import GPToken from "@/components/icons/GPToken";
import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import { Container, Flex } from "@chakra-ui/react";
import { useContext } from "react";

export default function Tavern() {
  const auth = useContext(AuthContext);
  const user = auth.user;

  return (
    <Container as="main" maxWidth="container.xl" pt={12}>
      <Header as="h1" size="2xl" textAlign="center" mb={8}>
        Welcome to the tavern,
        <br />
        {user?.displayName}!
      </Header>
      <Text textAlign="center">
        The tavern keeper welcomes you in, pouring you a tall mug of ale.
      </Text>
      <Header as="h2" size="2xl" mt={12} mb={8}>
        Your adventurers:
      </Header>
      <Flex alignItems="center" w="100%" justifyContent="center" gap={4}>
        <CharactersList mini max={3} />
      </Flex>
      <Text mt={24}>
        All accounts have 3 gold pieces (<GPToken />
        GP) to spend on character generation per day. Every day, if you used any
        of your GP, you will be topped off back to <GPToken />3 GP. Legend Mama
        requires <GPToken />1 GP for each character generation or character
        image generation.
      </Text>
    </Container>
  );
}
