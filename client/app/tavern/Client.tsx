"use client";

import Header from "@/components/typography/Header";
import { Container } from "@chakra-ui/react";
import { ReactNode, useContext, useMemo } from "react";
import { AuthContext } from "../providers/auth/AuthClientProvider";
import Text from "@/components/typography/Text";

export default function Client({
  IdTokenComponent,
}: {
  IdTokenComponent: ReactNode;
}) {
  const auth = useContext(AuthContext);
  const user = auth.user;

  return (
    <Container as="main" maxWidth="container.lg" pt={12}>
      <div style={{ width: "100%", textAlign: "center" }}>
        <Header as="h1" size="2xl" textAlign="center">
          Welcome to the tavern, {user?.displayName}!
        </Header>
        <Text>Legend Mama notices Megan and ushers her to the bar:</Text>
        <Text>
          <em>
            Word is you{"'"}ve been asking around for a cryptic incantation
            known as the {'"'}ID token{'"'}... Unique to every traveler, and
            holding the secrets to guarding one{"'"}s safety across this realm.
            A knowledged wizard agreed to divine thy aura in exchange for
            lodging here - I trust you know what best to do with this
            information.
          </em>
        </Text>
        <Text>
          She gestures to the crowd and a man clad in impoverished garb hobbles
          to the counter. With an arthritic flourish of his hands, he procures a
          wrinkled parchment and nonsensical characters emboss themselves on the
          surface:
        </Text>
        {IdTokenComponent}
      </div>
    </Container>
  );
}
