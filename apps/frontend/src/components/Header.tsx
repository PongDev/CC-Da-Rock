"use client";

import {
  Button,
  Center,
  Flex,
  Heading,
  HStack,
  Icon,
  Link,
  Menu,
  MenuButton,
  Spacer,
  Stack,
  Text,
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
  return (
    <Flex alignItems="center" gap={4} p={4}>
      <HStack>
        <Image width={64} height={64} src="/favicon.png" alt="SolarCoin" />
        <Heading color="green.400" fontSize={{ sm: "md", md: "xl" }}>
          Solar CC
        </Heading>
      </HStack>

      <Spacer />

      <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
        {navs.map((nav, i) => (
          <A href={nav.href || "#"}>
            <Link key={i} fontWeight="bold">
              {nav.display}
            </Link>
          </A>
        ))}
      </HStack>

      <Button colorScheme="green" borderRadius="3xl" gap={2}>
        <FaUserAlt />
        Login
      </Button>

      <Menu>
        <MenuButton>
          <GiHamburgerMenu size={32} />
        </MenuButton>
      </Menu>
    </Flex>
  );
};
