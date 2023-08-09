import { Header } from "@/components/Header";
import { Image, Link } from "@chakra-ui/next-js";
import {
  Box,
  Button,
  Code,
  Container,
  Heading,
  Img,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { useRouter } from "next/router";

export default function Error() {
  const router = useRouter();
  const { mainMsg, err } = router.query;

  return (
    <>
      <Header />
      <Container>
        <VStack gap={8}>
          <Image
            src="/Crying Sun.jpg"
            alt="Crying Sun"
            width={256}
            height={256}
          />

          <VStack>
            <Heading>Something Went Wrong</Heading>
            <Text>Please Try Again later</Text>
          </VStack>

          <Spacer />
          <Spacer />
          <Spacer />

          <Button as={Link} href="/" size="lg" width="60%">
            Back to Home
          </Button>

          <Spacer />
          <Spacer />

          <Code
            whiteSpace={"pre-wrap"}
            colorScheme="yellow"
            border="2px"
            mb={8}
            p={2}
          >
            <Heading size="md">{mainMsg}</Heading>
            <br />
            {err && JSON.stringify(JSON.parse(err), null, 2)}
          </Code>
        </VStack>
      </Container>
    </>
  );
}
