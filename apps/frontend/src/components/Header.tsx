"use client";

import {
  Box,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  Spacer,
  Stack,
  Text,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import A from "next/link";
import Image from "next/image";

interface HeaderProps {}

const navs = [
  { display: "Home", href: "/" },
  { display: "Buy Offset" },
  { display: "Investment" },
  { display: "About Us", href: "/about" },
];

export const Header = () => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box bg="white" zIndex={100}>
      <Flex alignItems="center" gap={4} p={4}>
        <A href="/" onClick={onClose}>
          <HStack>
            <Image width={64} height={64} src="/favicon.png" alt="SolarCoin" />
            <Heading color="green.400" fontSize={{ sm: "md", md: "xl" }}>
              Solar CC
            </Heading>
          </HStack>
        </A>

        <Spacer />

        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          {navs.map((nav, i) => (
            <A href={nav.href || "#"} key={i}>
              <Link fontWeight="bold">{nav.display}</Link>
            </A>
          ))}
        </HStack>

        <Button colorScheme="green" borderRadius="3xl" gap={2}>
          <FaUserAlt />
          Login
        </Button>

        <IconButton
          aria-label="menu"
          icon={<GiHamburgerMenu size={32} />}
          onClick={onToggle}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav />
      </Collapse>
    </Box>
  );
};

const menuNavs = [
  { display: "Home", href: "/" },
  { display: "Buy Offset" },
  { display: "Project" },
  { display: "Privilege" },
  { display: "FAQ" },
  { display: "About Us", href: "/about" },
  { display: "Contact Us", href: "/contact" },
  { display: "Green Bond", href: "/green-bond" },
];

const MobileNav = () => {
  return (
    <Stack
      as={"nav"}
      spacing={4}
      // display={{ base: "flex", md: "none" }}
      direction="column"
      position="absolute"
      width="100%"
      bg="white"
      top={20}
      bottom={0}
      zIndex={99}
    >
      <Divider borderWidth={3} borderColor="green" />
      <Stack mx={16} spacing={6}>
        {menuNavs.map((nav, i) => (
          <A href={nav.href || "#"} key={i}>
            <Text fontWeight="bold" fontSize="lg">
              {nav.display}
            </Text>
          </A>
        ))}
      </Stack>
    </Stack>
  );
};
