import CharactersList from "@/components/CharactersList";
import Header from "@/components/typography/Header";
import { Container } from "@chakra-ui/react";

export default function CharactersPage() {
  return (
    <Container maxWidth="container.xl" as="main" pt={4} pb={12}>
      <Header textAlign="center" mt={5} mb={12}>Your Adventurers</Header>
      <CharactersList />
    </Container>
  );
}
