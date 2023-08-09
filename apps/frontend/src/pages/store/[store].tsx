import { Header } from "@/components/Header";
import { UnderDev } from "@/components/Underdev";
import {
  Container,
  Divider,
  Heading,
  HStack,
  Text,
  VStack,
} from "@chakra-ui/react";
import Head from "next/head";
import { useRouter } from "next/router";

export default function DefaultStore() {
  const router = useRouter();
  const { store } = router.query;

  return (
    <>
      <Header />

      <Container textAlign="center">
        <VStack gap={6}>
          <Heading color="green.500" letterSpacing={1.2}>
            {store && titleCase(store as string)} Store
          </Heading>

          <VStack gap={1}>
            <HStack>
              <Text fontSize="xl" fontWeight="bold">
                9999
              </Text>
              <Text fontSize="xl">Coins</Text>
            </HStack>
            <HStack>
              <Text fontSize="xl" fontWeight="bold">
                0.6
              </Text>
              <Text fontSize="xl">Baht/Solar Coin</Text>
            </HStack>
          </VStack>

          <Divider borderWidth="medium" />

          <UnderDev />
        </VStack>
      </Container>
    </>
  );
}

function titleCase(s: string): string {
  return s[0].toUpperCase() + s.slice(1);
}
