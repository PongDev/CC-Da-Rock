import { FormInput } from "@/components/FormInput";
import { Header } from "@/components/Header";
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
import { useState } from "react";

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

const LoginSME = forwardRef<StackProps, "div">((props, ref) => {
  return (
    <Stack spacing={6} ref={ref} {...props}>
      <FormInput label="Username or Email" type="text" />
      <FormInput label="Company’s Name" type="text" />
      <FormInput label="Password" type="password" />

      <Spacer />

      <Button colorScheme="green" color="black" size="lg" mt={4}>
        Login
      </Button>
    </Stack>
  );
});

const RegisterSME = forwardRef<StackProps, "div">((props, ref) => {
  return (
    <Stack spacing={6} ref={ref} {...props}>
      <FormInput label="First Name" type="text" />
      <FormInput label="Last Name" type="text" />
      <FormInput label="Identification Number" type="text" />
      <FormInput label="Email Address" type="email" />
      <FormInput label="Phone Number" type="text" />

      <FormControl>
        <FormLabel fontWeight="bold">Industry Type</FormLabel>
        <Select
          variant="filled"
          placeholder="Select Industry Type"
          size="lg"
          shadow="lg"
        >
          <option value="manufacture">Manufacture</option>
          <option value="trade">Trade</option>
          <option value="service">Service</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Company’s Size</FormLabel>
        <Select
          variant="filled"
          placeholder="Select Company’s Size"
          size="lg"
          shadow="lg"
        >
          <option value="small">
            Small (not exceed 50 M baht in total asset)
          </option>
          <option value="medium">Medium (51-150 M baht in total asset)</option>
        </Select>
      </FormControl>

      <FormInput label="Password" type="password" />
      <FormInput label="Confirm Password" type="password" />

      <Spacer />

      <Button colorScheme="green" color="black" size="lg">
        Register
      </Button>
    </Stack>
  );
});
