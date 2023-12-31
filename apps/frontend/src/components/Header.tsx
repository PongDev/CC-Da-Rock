"use client";

import {
  Box,
  BoxProps,
  Button,
  Collapse,
  Divider,
  Flex,
  forwardRef,
  Heading,
  HStack,
  IconButton,
  Skeleton,
  Spacer,
  Stack,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { Link } from "@chakra-ui/next-js";
import { FaCartPlus, FaUserAlt } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import Image from "next/image";

import { useAuthControllerProfile } from "@/oapi-client/auth";
import { getToken, logout } from "@/services/user.service";
import { NextRouter, useRouter } from "next/router";

interface HeaderProps {}

const navs: NavProps[] = [
  { display: "Home", action: "/" },
  {
    display: "Buy Offset",
    action: () => {
      return getToken() ? "/store/solar-cc" : "/auth/choose";
    },
  },
  { display: "About Us", action: "/about" },
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
            <Nav key={i} {...nav} />
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
          as={Link}
          href="/store"
          icon={<FaCartPlus size={24} />}
          aria-label="cart"
          variant="ghost"
          colorScheme="blackAlpha"
        />

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
  {
    display: "Calculate Your Carbon Footprint",
    action:
      "http://www.tgo.or.th/2020/index.php/th/post/thai-carbon-footprint-calculator-627",
  },
  {
    display: "Buy Offset",
    action: () => {
      return getToken() ? "/store/solar-cc" : "/auth/choose";
    },
  },
  { display: "Project", action: "/project" },
  { display: "Privilege", action: "/privilege" },
  { display: "FAQ", action: "/faq" },
  { display: "About Us", action: "/about" },
  { display: "Contact Us", action: "/contact" },
  {
    display: "Logout",
    action: () => {
      logout();
      return "/";
    },
    authRequired: true,
  },
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
  display: string | JSX.Element;
  action?: string | ((router: NextRouter) => string | void);
  authRequired?: boolean;
  onClick?: () => void;
};

const Nav = (props: NavProps) => {
  const { display, action, onClick } = props;
  const router = useRouter();

  const innerText =
    typeof display === "string" ? (
      <Text fontWeight="bold" fontSize="lg">
        {display}
      </Text>
    ) : (
      display
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
          const redirect = action(router);
          onClick?.();
          if (redirect) {
            router.push(redirect);
          }
        }}
        variant="unstyled"
        w="fit-content"
        m={0}
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
