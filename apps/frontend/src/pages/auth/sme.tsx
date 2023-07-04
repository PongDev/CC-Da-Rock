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

export default function Sme() {
  return (
    <>
      <Header />

      <Box px="8" py="8">
        <Heading fontSize="4xl" lineHeight="10">
          Welcome
        </Heading>
        <Text>Login to Take an Action</Text>
      </Box>

      <Tabs isFitted>
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
      <FormControl>
        <FormLabel fontWeight="bold">Username or Email</FormLabel>
        <Input variant="filled" type="email" size="lg" shadow="lg" />
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Company’s Name</FormLabel>
        <Input variant="filled" size="lg" shadow="lg" />
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Password</FormLabel>
        <Input variant="filled" type="password" size="lg" shadow="lg" />
      </FormControl>

      <Button colorScheme="green" color="black">
        Login
      </Button>
    </Stack>
  );
});

const RegisterSME = forwardRef<StackProps, "div">((props, ref) => {
  return (
    <Stack spacing={6} ref={ref} {...props}>
      <FormControl>
        <FormLabel fontWeight="bold">First Name</FormLabel>
        <Input variant="filled" type="text" size="lg" shadow="lg" />
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Last Name</FormLabel>
        <Input variant="filled" type="text" size="lg" shadow="lg" />
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Identification Number</FormLabel>
        <Input variant="filled" type="text" size="lg" shadow="lg" />
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Email Address</FormLabel>
        <Input variant="filled" type="email" size="lg" shadow="lg" />
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Phone Number</FormLabel>
        <Input variant="filled" type="text" size="lg" shadow="lg" />
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Industry Type</FormLabel>
        <Select variant="filled" placeholder="Select Industry Type">
          <option value="option1">Option 1</option>
          <option value="option2">Option 2</option>
          <option value="option3">Option 3</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Company’s Size</FormLabel>
        <Select variant="filled" placeholder="Select Company’s Size">
          <option value="option1">S</option>
          <option value="option2">M</option>
          <option value="option3">L</option>
        </Select>
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Password</FormLabel>
        <Input variant="filled" type="password" size="lg" shadow="lg" />
      </FormControl>

      <FormControl>
        <FormLabel fontWeight="bold">Confirm Password</FormLabel>
        <Input variant="filled" type="password" size="lg" shadow="lg" />
      </FormControl>

      <Button colorScheme="green" color="black">
        Register
      </Button>
    </Stack>
  );
});
