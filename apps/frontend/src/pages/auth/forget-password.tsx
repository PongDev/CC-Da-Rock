import {
  Button,
  Container,
  Heading,
  HStack,
  PinInput,
  PinInputField,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  useSteps,
  useTab,
  useToast,
} from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { FormInput } from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useAuthControllerForgotPassword } from "@/oapi-client/auth";
import { isAxiosError } from "axios";

export default function ForgetPassword() {
  // const { activeStep, goToNext } = useSteps({
  //   index: 0,
  //   count: 1,
  // });

  const [email, setEmail] = useState("");

  return (
    <>
      <Header />
      <Page1 />
    </>
  );
}

type FormData = { email: string };
const Page1 = () => {
  const { register, handleSubmit, reset } = useForm<FormData>();
  const toast = useToast();

  const { mutateAsync: forgotPassword, isLoading } =
    useAuthControllerForgotPassword();

  async function onSubmit(data: FormData) {
    const { email } = data;

    try {
      const res = await forgotPassword({
        data: {
          email,
        },
      });
      toast({
        title: "Password reset email Sent",
        description: "Please check your email",
      });
      reset();
    } catch (e) {
      console.error(e);
      if (isAxiosError(e)) {
        // if (e.status === 404) {
        //   toast({
        //     title: "Email not found",
        //     status: "error",
        //   });
        //   return;
        // }

        alert(e.message + ":\n" + e.response?.data.message);
      }
    }
  }

  return (
    <Container maxW="4xl" textAlign="center" py={8}>
      <Stack
        textAlign={{
          base: "left",
          md: "center",
        }}
      >
        <Heading size="xl">Forgot Password</Heading>
        <Text color="gray">
          Please enter email address. You will receive a code to create a new
          password via email.
        </Text>
      </Stack>

      <Spacer my={16} />

      <Stack as="form" spacing={8} onSubmit={handleSubmit(onSubmit)}>
        <FormInput
          label="Email Address"
          type="email"
          required
          {...register("email")}
        />

        <Button
          colorScheme="green"
          color="black"
          size="lg"
          type="submit"
          isLoading={isLoading}
        >
          Confirm Email
        </Button>
      </Stack>
    </Container>
  );
};
