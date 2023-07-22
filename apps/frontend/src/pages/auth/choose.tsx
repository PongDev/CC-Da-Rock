import { Header } from "@/components/Header";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  VStack,
  Wrap,
} from "@chakra-ui/react";

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
              <Box w={256} h={256} bg="gray.100" rounded="lg" shadow="lg" />
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
              <Box w={256} h={256} bg="gray.100" rounded="lg" shadow="lg" />
              <Heading fontSize="2xl">SMES</Heading>
            </VStack>
          </Link>
        </Flex>
      </Container>
    </>
  );
}
