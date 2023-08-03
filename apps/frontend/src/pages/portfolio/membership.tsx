import { PortHead } from "@/components/portfolio/PortHead";
import { Header } from "@/components/Header";
import { Heading, Img, Progress, Stack, Text, VStack } from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";

export default function Membership() {
  // TODO: get from api, somewhere
  const co2 = 50;

  return (
    <>
      <Header />
      <PortHead />

      <Stack textAlign="center" mt={16}>
        <Heading size="2xl">Solar Seed</Heading>

        <VStack>
          <Image
            src="/Solar Seed.png"
            alt="solar seed"
            width={192}
            height={192}
          />
          <Text> {co2} tCO2e</Text>
          <Heading>You Have Offset</Heading>
        </VStack>

        <Progress value={50} size="lg" mx={4} rounded="full" />
      </Stack>
    </>
  );
}
