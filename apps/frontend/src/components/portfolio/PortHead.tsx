import { Link } from "@chakra-ui/next-js";
import { Button, Flex, Heading } from "@chakra-ui/react";
import { useRouter } from "next/router";

export const PortHead = () => {
  const router = useRouter();
  const path = router.asPath;

  return (
    <>
      <Heading size="2xl" my={8} mx={6}>
        Portfolio
      </Heading>

      <Flex justifyContent="space-around" my={8}>
        <Button
          as={Link}
          href="/portfolio/membership"
          bg={path !== "/portfolio/membership" ? "gray.300" : undefined}
          color="black"
          rounded="full"
          size={{ base: "sm", md: "md" }}
          width={{ base: 192, md: 256 }}
          height={16}
        >
          Membership
        </Button>
        <Button
          as={Link}
          href="/portfolio/history"
          bg={path !== "/portfolio/history" ? "gray.300" : undefined}
          color="black"
          rounded="full"
          size={{ base: "sm", md: "md" }}
          width={{ base: 192, md: 256 }}
          height={16}
        >
          History
        </Button>
      </Flex>
    </>
  );
};
