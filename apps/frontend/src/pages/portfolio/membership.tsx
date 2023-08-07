import { PortHead } from "@/components/portfolio/PortHead";
import { Header } from "@/components/Header";
import {
  Heading,
  HStack,
  Img,
  Progress,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";

export default function Membership() {
  // TODO: get from api, somewhere
  const co2 = 50;

  return (
    <>
      <Header />
      <PortHead />

      <Stack textAlign="center" my={16}>
        <Heading size="2xl">Solar Seed</Heading>

        <VStack>
          <Image
            src="/Solar Seed.png"
            alt="solar seed"
            width={192}
            height={192}
          />
          <Spacer />
          <HStack>
            <Text fontSize="2xl" fontWeight="bold" color="green.600">
              {co2}
            </Text>
            <Text>kCO2e</Text>
          </HStack>
          <Heading>You Have Offset</Heading>
        </VStack>

        <Progress value={co2} size="lg" mx={4} rounded="full" />
      </Stack>
    </>
  );
}
