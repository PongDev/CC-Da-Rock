import { Header } from "@/components/Header";
import { getToken } from "@/services/user.service";
import {
  VStack,
  Heading,
  Avatar,
  Text,
  Code,
  NumberInput,
  FormControl,
  FormLabel,
  Input,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
} from "@chakra-ui/react";

export default function SolarCC() {
  return (
    <>
      <Header />

      <VStack>
        <Heading>Order Solar CC Coin</Heading>
      </VStack>

      <FormControl>
        <FormLabel fontWeight="bold">Carbon Footprint (kCO2eq)</FormLabel>
        <NumberInput min={0} max={9999}>
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>
    </>
  );
}
