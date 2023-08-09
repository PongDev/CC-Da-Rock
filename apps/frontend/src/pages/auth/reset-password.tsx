import { FormInput } from "@/components/FormInput";
import { Header } from "@/components/Header";
import { useAuthControllerResetPassword } from "@/oapi-client/auth";
import {
  Container,
  Stack,
  Heading,
  Text,
  Button,
  Spacer,
  useToast,
} from "@chakra-ui/react";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useForm } from "react-hook-form";

type FormData = {
  password: string;
  confirmPassword: string;
};

export default function ResetPassword() {
  const router = useRouter();
  const { email, token } = router.query;

  const toast = useToast();

  const { mutateAsync: resetPassword, isLoading } =
    useAuthControllerResetPassword();

  const { register, handleSubmit } = useForm<FormData>();

  async function onSubmit(data: FormData) {
    const { password, confirmPassword } = data;

    if (password !== confirmPassword) {
      toast({
        title: "Password and Confirm Password must be the same",
        status: "error",
        isClosable: true,
      });
      return false;
    }

    try {
      await resetPassword({
        data: {
          email: email as string,
          token: token as string,
          newPassword: password,
        },
      });
      toast({
        title: "Password Reset Successfully",
        description: "Please Login with your new password",
        status: "success",
        isClosable: true,
      });
      router.push("/auth/choose");
    } catch (e) {
      if (isAxiosError(e)) {
        toast({
          title: e.message + ":\n" + e.response?.data.message,
          status: "error",
          isClosable: true,
        });
      }
      return;
    }
  }

  return (
    <>
      <Header />

      <Container maxW="4xl" textAlign="center" py={8}>
        <Stack
          textAlign={{
            base: "left",
            md: "center",
          }}
        >
          <Heading size="xl">New Password</Heading>
          <Text color="gray">Please Write Your New Password</Text>
        </Stack>

        <Spacer my={16} />

        <Stack as="form" spacing={8} onSubmit={handleSubmit(onSubmit)}>
          <FormInput
            label="Password"
            type="password"
            required
            {...register("password")}
          />

          <FormInput
            label="Confirm Password"
            type="password"
            required
            {...register("confirmPassword")}
          />

          <Button
            colorScheme="green"
            color="black"
            size="lg"
            type="submit"
            isLoading={isLoading}
          >
            Reset Password
          </Button>
        </Stack>
      </Container>
    </>
  );
}
