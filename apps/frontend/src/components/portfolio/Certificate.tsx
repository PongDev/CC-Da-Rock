import { Image } from "@chakra-ui/next-js";
import {
  Box,
  BoxProps,
  forwardRef,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";

type CertificateProps = Omit<BoxProps, "src" | "alt" | "width" | "height"> & {
  serial: string;
  name: string;
  tC02: number;
  date: string;
};

export const Certificate = forwardRef<CertificateProps, "div">((props, ref) => {
  const { name, tC02, date, ...rest } = props;
  const formattedDate = new Date(date)
    .toLocaleDateString("en-GB", {
      year: "2-digit",
      month: "2-digit",
      day: "2-digit",
    })
    .replaceAll("/", "-");

  return (
    <Box position="relative" {...rest} ref={ref}>
      <Image
        src="/certificate.png"
        alt="certificate"
        width={1.414 * 512}
        height={512}
      />

      <Box position="absolute" top={0} bottom={0} left={0} right={0}>
        <VStack mt={16} gap={4}>
          <Heading size="lg">Certificate</Heading>
          <Text>Awarded To</Text>
          <Heading color="green.500" size="lg">
            {" "}
            {props.name}
          </Heading>
          <Text>
            for offsetting{" "}
            <Text color="green.500" display="inline-block" fontWeight="bold">
              {props.tC02}
            </Text>{" "}
            kCO2eq of Carbon Footprint
          </Text>
          <Text>
            Date:{" "}
            <Text color="green.500" display="inline-block" fontWeight="bold">
              {formattedDate}
            </Text>
          </Text>
        </VStack>
      </Box>

      <Box position="absolute" top={8} left={8}>
        <Text fontSize="2xs" color="gray.300" fontWeight="light">
          {props.serial}
        </Text>
      </Box>
    </Box>
  );
});
