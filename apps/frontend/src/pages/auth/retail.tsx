import { FormInput } from "@/components/FormInput";
import { Header } from "@/components/Header";
import { useLogin } from "@/services/user.service";
import {
  Box,
  Button,
  Container,
  forwardRef,
  Heading,
  HStack,
  Spacer,
  Stack,
  StackProps,
  Tab,
  TabIndicator,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { AxiosError, isAxiosError } from "axios";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { useAuthControllerRegisterRetail } from "../../oapi-client/auth";

export default function Retail() {
  const [index, setIndex] = useState(0);

  let title, subtitle;
  switch (index) {
    case 0:
      title = "Welcome";
      subtitle = "Login to Take an Action";
      break;
    case 1:
      title = "Be Our Member";
      subtitle = "Take an Action and Get More Privilege";
  }

  return (
    <>
      <Header />

      <Box px="8" py="8">
        <Heading fontSize="4xl" lineHeight="10">
          {title}
        </Heading>
        <Text>{subtitle}</Text>
      </Box>

      <Tabs isFitted index={index} onChange={setIndex}>
        <TabList>
          <Tab>Login</Tab>
          <Tab>Register</Tab>
        </TabList>

        <TabIndicator
          mt="-1.5px"
          height="1.5"
          bg="green.500"
          borderRadius="1px"
        />

        <TabPanels>
          <TabPanel>
            <Container maxW="3xl" my={16}>
              <LoginRetail m="auto" />
            </Container>
          </TabPanel>
          <TabPanel>
            <Container maxW="3xl" my={16}>
              <RegisterRetail m="auto" />
            </Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

type LoginFormData = {
  identity: string;
  password: string;
};

const LoginRetail = forwardRef<StackProps, "div">((props, ref) => {
  const { mutateAsync: login, isLoading } = useLogin();
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginFormData>();
  async function onSubmit(data: LoginFormData) {
    try {
      await login({
        data: {
          email: data.identity,
          name: data.identity,
          password: data.password,
        },
      });
      router.push("/");
    } catch (e) {
      console.error(e);
      if (isAxiosError(e)) {
        alert(e.message + ":\n" + e.response?.data.message);
      }
    }
  }

  return (
    <Stack
      spacing={6}
      ref={ref}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <FormInput
        label="Username or Email"
        type="text"
        required
        {...register("identity")}
      />
      <FormInput
        label="Password"
        type="password"
        required
        {...register("password")}
      />

      <Spacer />

      <Button
        colorScheme="green"
        color="black"
        size="lg"
        mt={4}
        type="submit"
        isLoading={isLoading}
      >
        Login
      </Button>
    </Stack>
  );
});

// TODO: validaton & error reporting
type RegisterFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  idNumber: string;
  password: string;
  confirmPassword: string;
};

const RegisterRetail = forwardRef<StackProps, "div">((props, ref) => {
  const { mutateAsync: registerRetail, isLoading } =
    useAuthControllerRegisterRetail();
  const router = useRouter();

  const { register, handleSubmit } = useForm<RegisterFormData>();

  async function onSubmit(data: RegisterFormData) {
    try {
      await registerRetail({
        data: {
          email: data.email,
          password: data.password,
          name: `${data.firstName} ${data.lastName}`,
          phone: data.phoneNumber,
        },
      });
      router.push("/");
    } catch (e) {
      console.error(e);
      if (isAxiosError(e)) {
        alert(e.message + ":\n" + e.response?.data.message);
      }
    }
  }

  return (
    <Stack
      spacing={6}
      ref={ref}
      as="form"
      onSubmit={handleSubmit(onSubmit)}
      {...props}
    >
      <HStack>
        <FormInput
          label="First Name"
          type="text"
          required
          {...register("firstName")}
        />
        <FormInput
          label="Last Name"
          type="text"
          required
          {...register("lastName")}
        />
      </HStack>

      <FormInput
        label="Email Address"
        type="email"
        required
        {...register("email")}
      />
      <FormInput
        label="Phone Number"
        type="text"
        required
        {...register("phoneNumber")}
      />
      <FormInput
        label="Identification Number"
        type="text"
        required
        {...register("idNumber")}
      />
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

      <Spacer />

      <Button
        colorScheme="green"
        color="black"
        size="lg"
        type="submit"
        isLoading={isLoading}
      >
        Register
      </Button>
    </Stack>
  );
});
