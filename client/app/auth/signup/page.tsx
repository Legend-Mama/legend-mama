"use client";

import { AuthContext } from "@/app/providers/AuthProvider";
import Button from "@/components/Button";
import GoogleSignInButton from "@/components/GoogleSignInButton";
import GPToken from "@/components/icons/GPToken";
import InputGroup from "@/components/input/InputGroup";
import Header from "@/components/typography/Header";
import Text from "@/components/typography/Text";
import useGoogleSignin from "@/lib/auth/useGoogleSignin";
import { Link } from "@chakra-ui/next-js";
import { Container, FormControl, Stack } from "@chakra-ui/react";
import { createFormFactory } from "@tanstack/react-form";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useRouter } from "next/navigation";
import { useContext } from "react";

interface Signup {
  nickname: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const router = useRouter();
  const auth = useContext(AuthContext);
  const { waitingForGoogle, handleGoogleSignup } = useGoogleSignin();

  const formFactory = createFormFactory<Signup>({
    defaultValues: {
      nickname: "",
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const form = formFactory.useForm({
    onSubmit: async ({ value }) => {
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth.auth!,
          value.email,
          value.password
        );
        const user = userCredential.user;
        const [, idToken] = await Promise.all([
          updateProfile(user, { displayName: value.nickname }),
          user.getIdToken(),
        ]);
        const resp = await fetch(process.env.NEXT_PUBLIC_API + "/account", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${idToken}`,
          },
        });
        if (resp.status != 201) {
          throw "Couldn't create account data";
        }
        router.push("/tavern");
      } catch (err: any) {
        console.error(err.message);
      }
    },
  });
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
          <Link href="/auth/login" _hover={{ textDecoration: "unset" }}>
            <Button secondary mb={6}>
              Already have an account?
            </Button>
          </Link>
        </div>
        <Container mb={16}>
          {!waitingForGoogle ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
            >
              <form.Field
                name="nickname"
                validators={{
                  onChange: ({ value, fieldApi }) =>
                    fieldApi.state.meta.isTouched && !value
                      ? "Please enter a nickname"
                      : null,
                }}
              >
                {(field) => (
                  <FormControl isInvalid={field.state.meta.errors.length > 0}>
                    <InputGroup
                      name="nickname"
                      leftWidth={140}
                      stackPosition="top"
                      left="Nickname"
                      placeholder="e.g. The Great Bartholomew"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FormControl>
                )}
              </form.Field>
              <form.Field
                name="email"
                validators={{
                  onChange: ({ value, fieldApi }) =>
                    fieldApi.state.meta.isTouched && !value
                      ? "Please enter a valid email"
                      : null,
                }}
              >
                {(field) => (
                  <FormControl isInvalid={field.state.meta.errors.length > 0}>
                    <InputGroup
                      name="email"
                      leftWidth={140}
                      stackPosition="mid"
                      left="Email"
                      autoComplete="email"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FormControl>
                )}
              </form.Field>
              <form.Field
                name="password"
                validators={{
                  onChange: ({ value, fieldApi }) =>
                    fieldApi.state.meta.isTouched && !value
                      ? "Please enter a password"
                      : null,
                }}
              >
                {(field) => (
                  <FormControl isInvalid={field.state.meta.errors.length > 0}>
                    <InputGroup
                      name="password"
                      leftWidth={140}
                      stackPosition="mid"
                      left="Password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FormControl>
                )}
              </form.Field>
              <form.Field
                name="confirmPassword"
                validators={{
                  onChangeListenTo: ["password"],
                  onChange: ({ value, fieldApi }) => {
                    const password = fieldApi.form.getFieldValue("password");
                    return fieldApi.state.meta.isTouched &&
                      password &&
                      password != value
                      ? "Passwords do not match"
                      : null;
                  },
                }}
              >
                {(field) => (
                  <FormControl isInvalid={field.state.meta.errors.length > 0}>
                    <InputGroup
                      name="confirmPassword"
                      leftWidth={140}
                      stackPosition="bottom"
                      left="Confirm Password"
                      type="password"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                  </FormControl>
                )}
              </form.Field>
              <Stack direction="row" justifyContent="center" mt={6}>
                <form.Subscribe
                  selector={({
                    canSubmit,
                    isSubmitting,
                    isPristine,
                    values,
                  }) => ({ canSubmit, isSubmitting, isPristine, values })}
                >
                  {({ canSubmit, isSubmitting, isPristine, values }) => (
                    <>
                      <Button
                        type="submit"
                        width={200}
                        isDisabled={
                          isPristine ||
                          !canSubmit ||
                          Object.values(values).some((val) => !val)
                        }
                        isLoading={isSubmitting}
                      >
                        Sign Up
                      </Button>
                      <GoogleSignInButton
                        onClick={handleGoogleSignup}
                        isLoading={isSubmitting}
                      />
                    </>
                  )}
                </form.Subscribe>
              </Stack>
            </form>
          ) : (
            <Text textAlign="center">
              Please sign in with the Google authentication pop-up.
            </Text>
          )}
        </Container>
        <Header as="h2">Pricing Details</Header>
        <Text>
          All accounts have 3 gold pieces (<GPToken />
          GP) to spend on character generation per day. At midnight UTC, if you
          used any of your free GP, you will be topped off back to <GPToken />3
          GP. Legend Mama requires <GPToken />1 GP for each character
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
