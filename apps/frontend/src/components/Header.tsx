"use client";

import {
  Box,
  BoxProps,
  Button,
  Center,
  Collapse,
  Divider,
  Flex,
  forwardRef,
  Heading,
  HStack,
  Icon,
  IconButton,
  MenuButton,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";

interface HeaderProps {}

const navs = [
  { display: "Home", href: "/" },
  { display: "Buy Offset" },
  { display: "Investment" },
  { display: "About Us", href: "/about" },
];

export const Header = forwardRef<BoxProps, "div">((props, ref) => {
  const { isOpen, onToggle, onClose } = useDisclosure();

  return (
    <Box bg="white" zIndex={100} ref={ref} {...props}>
      <Flex alignItems="center" gap={4} p={4}>
        <Link href="/" onClick={onClose}>
          <HStack>
            <Image width={64} height={64} src="/favicon.png" alt="SolarCoin" />
            <Heading color="green.400" fontSize={{ sm: "md", md: "xl" }}>
              Solar CC
            </Heading>
          </HStack>
        </Link>

        <Spacer />

        <HStack as={"nav"} spacing={4} display={{ base: "none", md: "flex" }}>
          {navs.map((nav, i) => (
            <Link href={nav.href || "#"} key={i}>
              <Text fontWeight="bold">{nav.display}</Text>
            </Link>
          ))}
        </HStack>

        <Button colorScheme="green" borderRadius="3xl" gap={2}>
          <FaUserAlt />
          Login
        </Button>

        <IconButton
          color="black"
          aria-label="menu"
          icon={<GiHamburgerMenu size={32} />}
          onClick={onToggle}
        />
      </Flex>

      <Collapse in={isOpen} animateOpacity>
        <MobileNav close={onClose} />
      </Collapse>
    </Box>
  );
});

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

const MobileNav = (props: { close: () => void }) => {
  return (
    <Stack
      spacing={4}
      direction="column"
      position="absolute"
      width="100%"
      bg="white"
      top={20}
      bottom={0}
      zIndex={1}
    >
      <Divider borderWidth={3} borderColor="green" />
      <Stack mx={16} spacing={6} as={"nav"}>
        {menuNavs.map((nav, i) => (
          <Link href={nav.href || "#"} key={i} onClick={props.close}>
            <Text fontWeight="bold" fontSize="lg">
              {nav.display}
            </Text>
          </Link>
        ))}
      </Stack>
    </Stack>
  );
};
