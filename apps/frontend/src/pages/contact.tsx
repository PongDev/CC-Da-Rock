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
  useToast,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useState } from "react";

export default function Contact() {
  const { register, reset, handleSubmit } = useForm();

  const toast = useToast();
  const [loading, setLoading] = useState(false);

  async function onSubmit(data: any) {
    console.log("Sending", data);

    // fake delay for immersive experience
    setLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    setLoading(false);

    toast({
      title: "Message sent!",
      colorScheme: "green",
    });
    reset();
  }

  return (
    <>
      <Header />

      <Container maxW="container.lg" mt="10">
        <Stack as="form" spacing={6} onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Heading>Contact Us</Heading>
            <Divider borderWidth={4} />
          </Box>

          <Spacer />

          <FormInput label="Name" type="text" required {...register("name")} />
          <FormInput
            label="Email"
            type="email"
            required
            {...register("email")}
          />
          {/* <FormInput label="Message" type="text" textare required /> */}

          <FormControl>
            <FormLabel fontWeight="bold">Message</FormLabel>
            <Textarea
              variant="filled"
              shadow="lg"
              required
              {...register("message")}
            />
          </FormControl>

          <Spacer />

          <Button
            colorScheme="green"
            color="black"
            size="lg"
            type="submit"
            isLoading={loading}
          >
            Send
          </Button>
        </Stack>
      </Container>
    </>
  );
}
