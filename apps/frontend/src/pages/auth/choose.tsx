import { Header } from "@/components/Header";
import { Image, Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Center,
  Container,
  Flex,
  Heading,
  VStack,
  Wrap,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { FaShop } from "react-icons/fa6";

export default function Choose() {
  return (
    <>
      <Header />

      <Container maxW="4xl" textAlign="center">
        <Heading fontSize="4xl" lineHeight="10" my={16}>
          Login as
        </Heading>
        <Flex justifyContent="space-around">
          {/* Retail */}
          <Link
            href="/auth/retail"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            <VStack gap={6}>
              <Center w={256} h={256} bg="green.100" rounded="lg" shadow="lg">
                <FaUserAlt size={128} />
              </Center>
              <Heading fontSize="2xl">Individual</Heading>
            </VStack>
          </Link>

          {/* SME */}
          <Link
            href="/auth/sme"
            _hover={{
              transform: "scale(1.05)",
            }}
          >
            <VStack gap={6}>
              <Center w={256} h={256} bg="green.100" rounded="lg" shadow="lg">
                <FaShop size={128} />
              </Center>

              <Heading fontSize="2xl">SMES</Heading>
            </VStack>
          </Link>
        </Flex>
      </Container>
    </>
  );
}
