"use client";
import logo from "@/public/img/legend-mama-logo.png";
import { Image, Link } from "@chakra-ui/next-js";
import { Box, Flex, HStack, Spinner, Tooltip } from "@chakra-ui/react";
import Header from "./typography/Header";
import GPToken from "./icons/GPToken";
import Text from "./typography/Text";
import { PiPlusCircleFill, PiQuestionFill } from "react-icons/pi";
import Button from "./Button";
import { useCallback, useContext } from "react";
import { signOut } from "firebase/auth";
import { AuthContext } from "@/app/providers/AuthProvider";
import { usePathname, useRouter } from "next/navigation";
import { DataContext } from "@/app/providers/DataProvider";

export default function Navbar() {
  const auth = useContext(AuthContext);
  const data = useContext(DataContext);
  const router = useRouter();
  const url = usePathname();

  const handleLogout = useCallback(() => {
    signOut(auth.auth!)
      .then(() => router.push("/"))
      .catch((err) => console.error(err.message));
  }, [auth.auth, router]);

  return (
    <Box
      h="100%"
      w={"18vw"}
      maxW={356}
      minW={200}
      flexShrink="0"
      bg="#262522"
      pt={50}
      pb={38}
      px={38}
      overflowY="auto"
      borderRight="2px solid #303030"
      filter="drop-shadow(2px 0 16px rgba(73, 65, 45, 0.26))"
    >
      <Box w="80%" minW="140px" marginX="auto" h="100%">
        <Flex flexDir="column" justifyContent="space-between" h="100%">
          <Box>
            <Link href="/">
              <Image src={logo} alt="Legend Mama logo" mb={8} />
            </Link>
            {auth.loggedIn ? (
              <>
                <Link href="/tavern" _hover={{ textDecoration: "unset" }}>
                  <Header
                    as="h1"
                    size="lg"
                    mb="4"
                    color="brand.800"
                    textAlign="center"
                  >
                    Tavern
                  </Header>
                </Link>
                <Link href="/characters" _hover={{ textDecoration: "unset" }}>
                  <Header
                    as="h1"
                    size="lg"
                    mb="4"
                    color="brand.800"
                    textAlign="center"
                  >
                    Characters
                  </Header>
                </Link>
                <Link
                  href="/characters/new"
                  _hover={{ textDecoration: "unset" }}
                >
                  <Header
                    as="h1"
                    size="lg"
                    mb="4"
                    color="brand.800"
                    textAlign="center"
                  >
                    New Character
                  </Header>
                </Link>
                {/* <Link href="/account" _hover={{ textDecoration: "unset" }}>
                  <Header
                    as="h1"
                    size="lg"
                    mb="4"
                    color="brand.800"
                    textAlign="center"
                  >
                    Account
                  </Header>
                </Link>
                <Link href="/help" _hover={{ textDecoration: "unset" }}>
                  <Header
                    as="h1"
                    size="lg"
                    mb="4"
                    color="brand.800"
                    textAlign="center"
                  >
                    Help
                  </Header>
                </Link> */}
              </>
            ) : (
              <>
                <Link href="/auth/login" _hover={{ textDecoration: "unset" }}>
                  <Header
                    as="h1"
                    size="lg"
                    mb="4"
                    color="brand.800"
                    textAlign="center"
                  >
                    Log In
                  </Header>
                </Link>
                <Link href="/auth/signup" _hover={{ textDecoration: "unset" }}>
                  <Header
                    as="h1"
                    size="lg"
                    mb="4"
                    color="brand.800"
                    textAlign="center"
                  >
                    Sign Up
                  </Header>
                </Link>
              </>
            )}
          </Box>
          {auth.loggedIn && (
            <Box w="100%">
              <HStack color="brand.800" fontSize={20} mx="auto" w="fit-content">
                {data.error ? (
                  <Text>Error fetching account data.</Text>
                ) : (
                  <>
                    <Text
                      fontFamily="var(--font-source-sans)"
                      fontWeight={700}
                      mb={0}
                    >
                      <GPToken height={30} width={30} glow />{" "}
                      {data.loading ? (
                        <Spinner size="sm" />
                      ) : (
                        data.user.goldBalance || "?"
                      )}{" "}
                      GP
                    </Text>
                    <Tooltip label="You reset to 3GP every day.">
                      <span>
                        <PiQuestionFill
                          fontSize={24}
                          style={{ cursor: "help" }}
                        />
                      </span>
                    </Tooltip>
                  </>
                )}
              </HStack>

              <Button
                onClick={handleLogout}
                mt={4}
                w="100%"
                secondary
                color="gray.400"
              >
                Log Out
              </Button>
            </Box>
          )}
        </Flex>
      </Box>
    </Box>
  );
}
