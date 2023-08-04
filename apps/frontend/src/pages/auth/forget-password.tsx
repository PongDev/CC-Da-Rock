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
} from "@chakra-ui/react";
import { Header } from "@/components/Header";
import { FormInput } from "@/components/FormInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";

export default function ForgetPassword() {
  const { activeStep, goToNext } = useSteps({
    index: 0,
    count: 1,
  });

  return (
    <>
      <Header />

      {activeStep === 0 ? (
        <Page1 next={() => goToNext()} />
      ) : activeStep === 1 ? (
        <Page2 next={() => {}} />
      ) : null}
    </>
  );
}

type FormData1 = { email: string };
const Page1 = (props: { next: () => void }) => {
  const { register, handleSubmit } = useForm<FormData1>();

  function onSubmit(data: FormData1) {
    const { email } = data;
    props.next();
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
          // isLoading={loading}
        >
          Confirm Email
        </Button>
      </Stack>
    </Container>
  );
};

type FormData2 = {
  verificationCode: string;
};
const Page2 = (props: { next?: () => void }) => {
  const { register, handleSubmit } = useForm<FormData2>();

  const [timer, setTimer] = useState(0);
  useEffect(() => {
    const i = setInterval(() => {
      setTimer((t) => Math.max(0, t - 1));
    }, 1000);
    return () => clearInterval(i);
  });

  function onSubmit(data: FormData2) {
    const { verificationCode } = data;

    alert("Sending " + verificationCode);
    props.next?.();
  }

  function resend() {
    const ok = timer <= 0;
    if (!ok) return;

    setTimer(30);
  }

  return (
    <Container maxW="4xl" textAlign="center" py={8}>
      <Stack
        textAlign={{
          base: "left",
          md: "center",
        }}
      >
        <Heading size="xl">Verification Code</Heading>
        <Text color="gray" fontSize="sm">
          The Code is Sent to xxxx@xxxx.com. Please Check Your Email
        </Text>
      </Stack>

      <Spacer my={16} />

      <Stack m="auto" as="form" spacing={4} onSubmit={handleSubmit(onSubmit)}>
        <HStack m="auto">
          <PinInput {...register("verificationCode")}>
            <PinInputField />
            <PinInputField />
            <PinInputField />
            <PinInputField />
          </PinInput>
        </HStack>

        <HStack m="auto">
          <Text color="gray" fontSize="sm">
            Didn’t Receive Code?
          </Text>
          <Button variant="ghost" size="sm" onClick={resend}>
            Sent Again {timer > 0 ? `in ${timer} Second` : ""}
          </Button>
        </HStack>
      </Stack>

      <Spacer my={8} />

      <Button
        colorScheme="green"
        color="black"
        size="lg"
        type="submit"
        // isLoading={loading}
      >
        Confirm Code
      </Button>
    </Container>
  );
};
