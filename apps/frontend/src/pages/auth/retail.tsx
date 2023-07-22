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
  HStack,
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

const LoginRetail = forwardRef<StackProps, "div">((props, ref) => {
  return (
    <Stack spacing={6} ref={ref} {...props}>
      <FormInput label="Username or Email" type="text" />
      <FormInput label="Password" type="password" />

      <Spacer />

      <Button colorScheme="green" color="black" size="lg" mt={4}>
        Login
      </Button>
    </Stack>
  );
});

const RegisterRetail = forwardRef<StackProps, "div">((props, ref) => {
  return (
    <Stack spacing={6} ref={ref} {...props}>
      <HStack>
        <FormInput label="First Name" type="text" />
        <FormInput label="Last Name" type="text" />
      </HStack>

      <FormInput label="Email Address" type="email" />
      <FormInput label="Phone Number" type="text" />
      <FormInput label="Identification Number" type="text" />
      <FormInput label="Password" type="password" />
      <FormInput label="Confirm Password" type="password" />

      <Spacer />

      <Button colorScheme="green" color="black" size="lg">
        Register
      </Button>
    </Stack>
  );
});
