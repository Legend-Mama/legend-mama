'use client';

import Header from "@/components/typography/Header";
import { Container } from "@chakra-ui/react";
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";

export default function Tavern() {
  const auth = useContext(AuthContext);
  const user = auth.user;
  return (
    <Container as="main" maxWidth="container.lg" pt={12}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Header as="h1" size="2xl" textAlign="center">
          Welcome to the tavern, {user?.displayName}!
        </Header>
      </div>
    </Container>
  );
}
