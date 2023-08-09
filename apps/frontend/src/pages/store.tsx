import { Header } from "@/components/Header";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Container,
  Divider,
  Grid,
  Heading,
  HStack,
  Img,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";

type Store = {
  name: string;
  displayName: string;
  description: string;
  image: string;
  disable?: boolean;
  solarCoin: number;
  price: number;
};

const stores: Store[] = [
  {
    name: "solar-cc",
    displayName: "Solar CC",
    description: "Official store of Solar CC",
    image: "/favicon.png",
    solarCoin: 99999999,
    price: 0.5,
  },
  {
    name: "store-1",
    displayName: "Store 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam",
    image: "https://picsum.photos/256",
    solarCoin: 1,
    price: 0.6,
  },
  {
    name: "store-2",
    displayName: "Store 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "https://picsum.photos/256?blur=1",
    solarCoin: 0,
    price: 0.6,
  },
];

export default function Store() {
  return (
    <>
      <Header />

      <Box>
        <VStack gap={10}>
          <Heading size="3xl">Store</Heading>
          {stores.map((store, i) => (
            <Grid
              as={Link}
              key={i}
              gap={{ base: 4, md: 8 }}
              gridTemplateColumns="30% 70%"
              width={{ base: "100%", md: "80%", lg: "60%", xl: "50%" }}
              p={4}
              boxShadow="lg"
              transition="all 0.2s"
              _hover={{
                transform: "scale(1.05)",
              }}
              href={store.disable ? {} : `/store/${store.name}`}
              opacity={store.disable ? 0.5 : 1}
              cursor={store.disable ? "not-allowed" : "pointer"}
            >
              <Img
                src={store.image}
                boxSize={{ base: 32, sm: 64, md: 128, lg: 192 }}
                objectFit="cover"
              />
              <Stack gap={2}>
                <Box>
                  <Heading>{store.displayName}</Heading>
                  <Text>{store.description}</Text>
                </Box>

                <HStack>
                  <Text
                    fontSize="sm"
                    fontWeight="thin"
                    color={store.solarCoin > 0 ? "gray.600" : "red.700"}
                  >
                    {store.solarCoin} Coins
                  </Text>
                  <Text>•</Text>
                  <Text fontSize="sm" fontWeight="thin" color="gray.600">
                    {store.price} Baht/Coins
                  </Text>
                </HStack>
              </Stack>
            </Grid>
          ))}
        </VStack>
      </Box>
    </>
  );
}
