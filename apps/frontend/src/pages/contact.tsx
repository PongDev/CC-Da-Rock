import { Header } from "@/components/Header";
import { FormInput } from "@/components/FormInput";
import {
  Box,
  Button,
  Container,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Spacer,
  Stack,
  Textarea,
} from "@chakra-ui/react";

export default function Contact() {
  return (
    <>
      <Header />

      <Container maxW="container.lg" mt="10">
        <Stack as="form" spacing={6}>
          <Box>
            <Heading>Contact Us</Heading>
            <Divider borderWidth={4} />
          </Box>

          <Spacer />

          <FormInput label="Name" type="text" required />
          <FormInput label="Email" type="text" required />
          {/* <FormInput label="Message" type="text" textare required /> */}

          <FormControl>
            <FormLabel fontWeight="bold">Message</FormLabel>
            <Textarea variant="filled" shadow="lg" required />
          </FormControl>

          <Spacer />

          <Button colorScheme="green" color="black" size="lg" type="submit">
            Send
          </Button>
        </Stack>
      </Container>
    </>
  );
}
