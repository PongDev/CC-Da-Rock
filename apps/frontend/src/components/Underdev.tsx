import { Image } from "@chakra-ui/next-js";
import { Heading, VStack } from "@chakra-ui/react";

export const UnderDev = () => {
  return (
    <VStack m="auto">
      <Image
        src="/sun Under development.png"
        alt="Under Development"
        width={320}
        height={256}
      />
      <Heading>Under Development</Heading>
    </VStack>
  );
};
