import { Header } from "@/components/Header";
import { useAuthControllerResendEmailVerification } from "@/oapi-client/auth";
import { Image } from "@chakra-ui/next-js";
import {
  Button,
  Code,
  Container,
  Divider,
  Heading,
  HStack,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import { isAxiosError } from "axios";
import { useRouter } from "next/router";

export default function EmailVerify() {
  const router = useRouter();
  const { email, uid } = router.query;

  const { mutateAsync: resendEmail, isLoading } =
    useAuthControllerResendEmailVerification();

  async function resend() {
    if (!email || !uid) {
      alert("Invalid email or uid in query params");
      return;
    }

    try {
      await resendEmail({
        data: {
          email: email as string,
          id: +uid,
        },
      });
      alert("Email sent");
    } catch (e) {
      console.error(e);
      if (isAxiosError(e)) {
        alert(e.message + ":\n" + e.response?.data.message);
      }
    }
  }

  return (
    <>
      <Header />

      <Container textAlign="center" maxW="container.lg">
        <VStack pt={16} gap={8}>
          <Image src="/email.png" alt="email" width={192} height={192} />
          <Heading>Email Verification</Heading>

          <Divider />

          <VStack>
            <Heading size="md">
              Thanks for signing up to Solar CC. We’re Happy to Have you
            </Heading>
            <Text>
              We have sent verification link to <Code>{email}</Code> <br />
              Please check your e-mail.
            </Text>
          </VStack>

          <Spacer />

          <HStack>
            <Text>If you did not received the link.</Text>
            <Button
              variant="ghost"
              p={1}
              colorScheme="orange"
              onClick={resend}
              isLoading={isLoading}
            >
              Click Here
            </Button>
          </HStack>
        </VStack>
      </Container>
    </>
  );
}
