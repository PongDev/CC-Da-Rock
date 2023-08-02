import { Header } from "@/components/Header";
import { useAuthControllerProfile } from "@/oapi-client/auth";
import {
  VStack,
  Heading,
  Text,
  Skeleton,
  Code,
  Img,
  Avatar,
} from "@chakra-ui/react";

export default function Profile() {
  const { data, isLoading } = useAuthControllerProfile();
  const { id, ...profile } = data?.data;

  return (
    <>
      <Header />

      <VStack>
        <Heading>Profile</Heading>
        <Avatar src="https://picsum.photos/256" size="2xl" />
        <Heading size="lg">{profile.name}</Heading>
        <Text>{JSON.stringify(profile)}</Text>
      </VStack>
    </>
  );
}
