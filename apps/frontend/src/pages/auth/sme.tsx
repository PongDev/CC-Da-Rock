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
  const { mutateAsync: login } = useLogin();
  const router = useRouter();

  const { register, handleSubmit } = useForm<LoginFormData>();

  async function onSubmit(data: LoginFormData) {
    await login({
      data: {
        email: data.identity,
        name: data.identity,
        password: data.password,
      },
    });
    router.push("/");
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

      <Button
        colorScheme="green"
        color="black"
        size="lg"
        mt={4}
        type="submit"
        disabled={isLoading}
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

  function onSubmit(data: RegisterFormData) {
    try {
      registerSME({
        data: {
          email: data.email,
          password: data.password,
          name: `${data.firstName} ${data.lastName}`,
          phone: data.phone,
          industry: data.industry,
          size: data.size,
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
        label="Identification Number"
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
            <option value={k}>{v.toLowerCase()}</option>
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
          {Object.entries(RegisterUserSMEsRequestSize).map(([k, v]) => (
            <option value={k}>{v.toLowerCase()}</option>
          ))}
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
        disabled={isLoading}
      >
        Register
      </Button>
    </Stack>
  );
});
