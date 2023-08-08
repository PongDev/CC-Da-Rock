import { Header } from "@/components/Header";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
  Container,
  Grid,
  Heading,
  HStack,
  Img,
  Text,
  VStack,
} from "@chakra-ui/react";

const stores = [
  {
    name: "solar-cc",
    displayName: "Solar CC",
    description: "Official store of Solar CC",
    image: "/favicon.png",
  },
  {
    name: "store-1",
    displayName: "Store 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam",
    image: "https://picsum.photos/256",
    disable: true,
  },
  {
    name: "store-2",
    displayName: "Store 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "https://picsum.photos/256?blur=1",
    disable: true,
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
              <Box>
                <Heading>{store.displayName}</Heading>
                <Text>{store.description}</Text>
              </Box>
            </Grid>
          ))}
        </VStack>
      </Box>
    </>
  );
}
