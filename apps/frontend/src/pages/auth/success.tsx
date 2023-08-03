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
  Divider,
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
            <Heading>Successful Registration</Heading>
            <Divider borderWidth={2} />
            <Text
              textAlign="center"
              fontWeight="light"
              size="lg"
              letterSpacing={0.3}
            >
              Congratulations on successfully registration. you have become an
              essential part of our mission to save the world.
            </Text>
          </VStack>

          <Spacer />
          <Spacer />
          <Spacer />

          <Button as={Link} href="/" size="lg" width="60%">
            Back to Home
          </Button>
        </VStack>
      </Container>
    </>
  );
}
