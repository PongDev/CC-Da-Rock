import { Header } from "@/components/Header";
import { Link } from "@chakra-ui/next-js";
import {
  Box,
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
  },
  {
    name: "store-2",
    displayName: "Store 2",
    description: "Lorem ipsum dolor sit amet consectetur adipisicing elit.",
    image: "https://picsum.photos/256?blur=1",
  },
];

export default function Store() {
  return (
    <>
      <Header />

      <Box px={8}>
        <VStack gap={10}>
          <Heading size="3xl">Store</Heading>
          {stores.map((store, i) => (
            <Grid
              as={Link}
              key={i}
              gap={8}
              gridTemplateColumns="30% 70%"
              width="50%"
              p={4}
              boxShadow="lg"
              transition="all 0.2s"
              _hover={{
                transform: "scale(1.05)",
              }}
              href={`/store/${store.name}`}
            >
              <Img src={store.image} boxSize={128} objectFit="cover" />
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
