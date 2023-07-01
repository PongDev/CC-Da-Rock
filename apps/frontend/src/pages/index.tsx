import Head from "next/head";
import { Inter } from "@next/font/google";
import { Header } from "@/components/Header";
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  Flex,
  Heading,
  Highlight,
  Img,
  Stack,
  Text,
  VStack,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import A from "next/link";
import Image from "next/image";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <>
      <Head>
        <title>SolarCoin</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        <Header />

        <Box position="relative">
          {/* Background image */}
          <Box
            position="absolute"
            width="100%"
            height="100%"
            left="0"
            right="0"
            top="0"
            zIndex={-1}
            filter="blur(2px) contrast(0.8) brightness(1.2)"
          >
            <img
              src="landing/solarcell.png"
              width="100%"
              style={{
                objectFit: "cover",
                height: "100%",
              }}
            />
          </Box>

          {/* Hero text */}
          <Container maxW={"3xl"} paddingTop="10vw">
            <VStack
              id="introduction"
              textAlign="center"
              filter="drop-shadow(0px 0px 8px rgba(255, 255, 255, 0.5))"
            >
              <Heading
                lineHeight="120%"
                letterSpacing="tighter"
                fontSize={{ base: "4xl", md: "6xl" }}
              >
                <Highlight query={"Net-Zero"} styles={{ color: "green.600" }}>
                  Let’s Take an Action to Net-Zero&nbsp;Together
                </Highlight>
              </Heading>
              <Text
                my={3}
                fontSize={{ base: "md", md: "xl" }}
                letterSpacing="tight"
              >
                Introducing Solar CC, the revolutionary carbon-credit based
                currency designed to pave&nbsp;the&nbsp;way for a greener
                future.
              </Text>

              <ButtonGroup p="6vw" display="flex" gap={8}>
                <Button
                  as={A}
                  colorScheme="green"
                  borderRadius="full"
                  width={150}
                  size="lg"
                  href={"/login/individual"}
                  border="2px solid black"
                >
                  <Text fontSize="xl">Individuals</Text>
                </Button>

                <Button
                  as={A}
                  colorScheme="green"
                  borderRadius="full"
                  width={150}
                  size="lg"
                  href={"/login/sme"}
                  border="2px solid black"
                >
                  <Text>SMEs</Text>
                </Button>
              </ButtonGroup>
            </VStack>
          </Container>
        </Box>

        <VStack textAlign="center" p={16} m="auto" bg="#FFED9433">
          <Heading fontWeight="bold">What We Do</Heading>
          <Wrap spacing={10} justify="center" p={16}>
            <WrapItem>
              <Box w={256} h={256} bg="blue.200" />
            </WrapItem>
            <WrapItem>
              <Box w={256} h={256} bg="blue.200" />
            </WrapItem>
          </Wrap>

          <Text>and much more</Text>
          <Button size="lg">Explore Our Project</Button>
        </VStack>

        <VStack textAlign="center" p={16} m="auto" bg="#9DC17766">
          <Heading fontWeight="bold">What We Done</Heading>
          <Stack
            width="100%"
            justify="space-evenly"
            py={16}
            direction={{ base: "column", md: "row" }}
          >
            <VStack spacing={4}>
              <Img
                boxSize={256}
                objectFit="contain"
                src="/landing/co2.png"
                alt={"co2"}
              />
              <Heading size="md">9999 tCO2e Offset</Heading>
            </VStack>
            <VStack spacing={4}>
              <Img
                boxSize={256}
                objectFit="contain"
                src="/landing/student.png"
                alt={"individual"}
              />
              <Heading size="md">134 Green Individuals</Heading>
            </VStack>
            <VStack spacing={4}>
              <Img
                boxSize={256}
                objectFit="contain"
                src="/landing/paper-bag.png"
                alt={"smes"}
              />
              <Heading size="md">69 Carbon Neutral SMEs</Heading>
            </VStack>
          </Stack>
        </VStack>

        <VStack textAlign="center" p={16} m="auto">
          <Heading fontWeight="bold" color="green.500">
            3 Easy Steps to Offset
          </Heading>
          <Stack
            spacing={10}
            justify="center"
            p={16}
            direction={{ base: "column", md: "row" }}
          >
            <WrapItem>
              <Box w={256} h={256} bg="blue.200" />
            </WrapItem>
            <WrapItem>
              <Box w={256} h={256} bg="blue.200" />
            </WrapItem>
            <WrapItem>
              <Box w={256} h={256} bg="blue.200" />
            </WrapItem>
          </Stack>

          <Button colorScheme="green">Click Here to Purchase</Button>
        </VStack>

        <VStack textAlign="center" p={16} bg="#FFED9433">
          <Heading fontWeight="bold">
            Got questions? We’re here to help!
          </Heading>
          <Text>Our highly available team is always ready to help you.</Text>
          <Button px={16} mt={8}>
            Contact us
          </Button>
        </VStack>
      </main>
    </>
  );
}
