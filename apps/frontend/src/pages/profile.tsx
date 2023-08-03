import { Header } from "@/components/Header";
import { useAuthControllerProfile } from "@/oapi-client/auth";
import { Link } from "@chakra-ui/next-js";
import {
  VStack,
  Heading,
  Text,
  Skeleton,
  Code,
  Img,
  Avatar,
  ListItem,
  UnorderedList,
  Button,
  Container,
} from "@chakra-ui/react";

export default function Profile() {
  const { data, isLoading } = useAuthControllerProfile();
  const { id, name, idNumber, ...profile } = data?.data ?? {};

  return (
    <>
      <Header />

      <Container>
        <VStack my={16} gap={6}>
          <Avatar src="https://picsum.photos/256" size="3xl" />
          <Heading size="lg">{name}</Heading>

          <UnorderedList>
            {Object.entries(profile).map(([k, v]) => (
              <ListItem>
                <Text>
                  {k}: {"" + v}
                </Text>
              </ListItem>
            ))}
          </UnorderedList>

          <Button
            width="full"
            height="12"
            variant="outline"
            colorScheme="blackAlpha"
            boxShadow="md"
          >
            Edit Profile
          </Button>
          <Button
            as={Link}
            href="/portfolio/membership"
            width="full"
            height="12"
            variant="outline"
            colorScheme="blackAlpha"
            boxShadow="md"
          >
            History
          </Button>
          <Button
            as={Link}
            href="/portfolio/membership"
            width="full"
            height="12"
            variant="outline"
            colorScheme="blackAlpha"
            boxShadow="md"
          >
            MemberShip
          </Button>
        </VStack>
      </Container>
    </>
  );
}
