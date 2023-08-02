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
  Skeleton,
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

import { useAuthControllerProfile } from "@/oapi-client/auth";
import { getToken, logout } from "@/services/user.service";

interface HeaderProps {}

const navs = [
  { display: "Home", href: "/" },
  { display: "Buy Offset" },
  { display: "Investment" },
  { display: "About Us", href: "/about" },
];

export const Header = forwardRef<BoxProps, "div">((props, ref) => {
  const { isOpen, onToggle, onClose } = useDisclosure();
  const token = getToken();
  const { data: profile, isLoading } = useAuthControllerProfile({
    query: {
      enabled: !!token,
    },
  });

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

        <Skeleton isLoaded={!token || !isLoading}>
          <Link href={token ? "/profile" : "/auth/choose"}>
            <Button colorScheme="green" borderRadius="3xl" gap={2}>
              <FaUserAlt />
              {token ? profile?.data?.name : "Login"}
            </Button>
          </Link>
        </Skeleton>

        <IconButton
          color="black"
          aria-label="menu"
          bg="transparent"
          colorScheme="blackAlpha"
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
  { display: "Home", action: "/" },
  { display: "Profile", action: "/profile", authRequired: true },
  { display: "Portfolio", action: "/portfolio", authRequired: true },
  { display: "Calculate Your Carbon Footprint" },
  { display: "Buy Offset", action: "/store/solar-cc" },
  { display: "Project", action: "/project" },
  { display: "Privilege", action: "/privilege" },
  { display: "FAQ", action: "/faq" },
  { display: "About Us", action: "/about" },
  { display: "Contact Us", action: "/contact" },
  { display: "Logout", action: logout, authRequired: true },
];

const MobileNav = (props: { close: () => void }) => {
  const token = getToken();

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
        {menuNavs
          .filter((nav) => !(nav.authRequired && !token))
          .map((nav, i) => (
            <Nav key={i} {...nav} onClick={props.close} />
          ))}
      </Stack>
    </Stack>
  );
};

type NavProps = {
  display: string;
  action?: string | (() => void);
  onClick?: () => void;
};

const Nav = (props: NavProps) => {
  const { display, action, onClick } = props;

  const innerText = (
    <Text fontWeight="bold" fontSize="lg">
      {display}
    </Text>
  );

  if (typeof action === "string") {
    return (
      <Link href={action} onClick={onClick}>
        {innerText}
      </Link>
    );
  } else if (typeof action === "function") {
    return (
      <Button
        onClick={() => {
          action();
          onClick?.();
        }}
      >
        {innerText}
      </Button>
    );
  } else if (action === undefined) {
    return innerText;
  } else {
    throw new Error("Invalid action");
  }
};
