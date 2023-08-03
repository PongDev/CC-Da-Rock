import { Header } from "@/components/Header";
import { Image } from "@chakra-ui/next-js";
import {
  Container,
  VStack,
  Heading,
  Button,
  Code,
  Text,
  Spacer,
  Img,
} from "@chakra-ui/react";
import Link from "next/link";

export default function Success() {
  return (
    <>
      <Header />

      <Container>
        <VStack gap={8}>
          <Image
            src="/Smile Sun.png"
            alt="Smile Sun"
            width={256}
            height={256}
          />
          <VStack>
            <Heading>Success</Heading>
            <Text>Your Order Has Been Proceeded Successfully </Text>
          </VStack>

          <Spacer />
          <Spacer />
          <Spacer />

          <VStack gap={8}>
            <Heading size="md">Thank You For Saving the World With Us</Heading>
            <Button as={Link} href="/portfolio/history" size="lg" width="60%">
              See My Order
            </Button>
            <Button as={Link} href="/" size="lg" width="60%">
              Back to Home
            </Button>
          </VStack>
        </VStack>
      </Container>
    </>
  );
}
