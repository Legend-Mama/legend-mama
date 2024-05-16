"use client";

import { Container, FormControl, Image, Stack } from "@chakra-ui/react";
import Text from "@/components/typography/Text";
import Header from "@/components/typography/Header";
import Button from "@/components/Button";
import InputGroup from "@/components/input/InputGroup";
import GPToken from "@/components/icons/GPToken";
import { createFormFactory, useForm } from "@tanstack/react-form";
import { Link } from "@chakra-ui/next-js";

interface Recover {
  email: string;
  password: string;
  confirmPassword: string;
}

export default function SignUp() {
  const formFactory = createFormFactory<Recover>({
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });
  const form = formFactory.useForm({
    onSubmit: async ({ value }) => alert(`form data: ${JSON.stringify(value)}`),
  });
  return (
    <>
      <Container as="main" maxWidth="container.lg" pt={12}>
        <div style={{ width: "100%", textAlign: "center" }}>
          <Header as="h1" size="2xl" textAlign="center">
            Create a New Password
          </Header>
          <Text mb={6} textAlign="center">
            Lost your password, eh? Legend Mama believes in giving travelers
            second chances, so let{"'"}s get you ready to enter the tavern once
            more!
          </Text>
        </div>
        <Container mb={16}>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              e.stopPropagation();
              form.handleSubmit();
            }}
          >
            <form.Field
              name="email"
              validators={{
                onChange: ({ value, fieldApi }) =>
                  fieldApi.state.meta.isTouched && !value
                    ? "Please enter your email"
                    : null,
              }}
            >
              {(field) => (
                <FormControl isInvalid={field.state.meta.errors.length > 0}>
                  <InputGroup
                    name="email"
                    leftWidth={140}
                    stackPosition="top"
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
                    left="New Password"
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
                    Reset Password
                  </Button>
                )}
              </form.Subscribe>
              <Link href="/" _hover={{ textDecoration: "unset" }}>
                <Button secondary width={200}>
                  I changed my mind!
                </Button>
              </Link>
            </Stack>
          </form>
        </Container>
      </Container>
    </>
  );
}
