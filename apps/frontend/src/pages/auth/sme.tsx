import { FormInput } from "@/components/FormInput";
import { Header } from "@/components/Header";
import {
  RegisterUserSMEsRequestIndustry,
  RegisterUserSMEsRequestSize,
} from "@/oapi-client/aPIDocument.schemas";
import {
  useAuthControllerLogIn,
  useAuthControllerRegisterSMEs,
} from "@/oapi-client/auth";
import { useLogin } from "@/services/user.service";
import {
  Box,
  Button,
  Center,
  Container,
  FormControl,
  FormLabel,
  forwardRef,
  Heading,
  Input,
  Select,
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

export default function Sme() {
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
              <LoginSME m="auto" />
            </Container>
          </TabPanel>
          <TabPanel>
            <Container maxW="3xl" my={16}>
              <RegisterSME m="auto" />
            </Container>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  );
}

type LoginFormData = {
  identity: string;
  company: string;
  password: string;
};

const LoginSME = forwardRef<StackProps, "div">((props, ref) => {
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
        label="Company’s Name"
        type="text"
        required
        {...register("company")}
      />
      <FormInput
        label="Password"
        type="password"
        required
        {...register("password")}
      />

      <Spacer />

      <Stack justifyContent="center" textAlign="center">
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
        <Button variant="link" colorScheme="red" size="xs">
          Forgot Password?
        </Button>
      </Stack>
    </Stack>
  );
});

// TODO: validaton & error reporting
type RegisterFormData = {
  firstName: string;
  lastName: string;
  idNumber: string;
  email: string;
  phone: string;
  industry: RegisterUserSMEsRequestIndustry;
  size: RegisterUserSMEsRequestSize;
  password: string;
  confirmPassword: string;
};

const RegisterSME = forwardRef<StackProps, "div">((props, ref) => {
  const { mutateAsync: registerSME, isLoading } =
    useAuthControllerRegisterSMEs();
  const router = useRouter();

  const { register, handleSubmit } = useForm<RegisterFormData>();

  async function onSubmit(data: RegisterFormData) {
    try {
      const res = await registerSME({
        data: {
          email: data.email,
          password: data.password,
          name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
          industry: data.industry,
          size: data.size,
        },
      });

      router.push({
        pathname: "/auth/email-verify",
        query: { email: data.email, uid: res.data.id },
      });
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
      <FormInput
        label="Identification Number or Passport Number"
        type="text"
        required
        {...register("idNumber")}
      />
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
        {...register("phone")}
      />

      <FormInput
        label="Company’s Name"
        type="text"
        required
        // {...register("company")}
      />

      <FormControl>
        <FormLabel fontWeight="bold">Industry Type</FormLabel>
        <Select
          variant="filled"
          placeholder="Select Industry Type"
          size="lg"
          shadow="lg"
          required
          {...register("industry")}
        >
          {Object.entries(RegisterUserSMEsRequestIndustry).map(([k, v]) => (
            <option value={k}>{capitalCase(v)}</option>
          ))}
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Company’s Size</FormLabel>
        <Select
          variant="filled"
          placeholder="Select Company’s Size"
          size="lg"
          shadow="lg"
          required
          {...register("size")}
        >
          <option value="SMALL">
            Small (xXXX baht in total Monthly Revenue)
          </option>
          <option value="MEDIUM">
            Medium (xXXX baht in total Monthly Revenue)
          </option>
        </Select>
      </FormControl>

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

function capitalCase(str: string) {
  return str[0].toUpperCase() + str.slice(1).toLowerCase();
}
