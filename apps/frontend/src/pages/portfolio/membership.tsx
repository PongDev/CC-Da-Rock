import { PortHead } from "@/components/portfolio/PortHead";
import { Header } from "@/components/Header";
import {
  Heading,
  HStack,
  Img,
  Progress,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
} from "@chakra-ui/react";
import { Image } from "@chakra-ui/next-js";
import { useMemo } from "react";
import { useTransactionControllerGetUserTransactions } from "@/oapi-client/transaction";

type Level = {
  name: string;
  requiredExp: number; // tCo2e
  imgSrc: string;
  imgRatio?: number;
};

const levels: Level[] = [
  {
    name: "Solar Seed",
    requiredExp: 9999,
    imgSrc: "/Solar Seed.png",
  },
  {
    name: "Solar Seedling",
    requiredExp: 99999,
    imgSrc: "/Solar Seedling.png",
  },
  {
    name: "Solar Young Tree",
    requiredExp: 999999,
    imgSrc: "/Solar Young Tree.png",
  },
  {
    name: "Solar Big Tree",
    requiredExp: 9999999,
    imgSrc: "/Solar Big tree.jpg",
    imgRatio: 1.5,
  },
].sort((a, b) => a.requiredExp - b.requiredExp);

const lastLevel: Omit<Level, "requiredExp"> = {
  name: "Solar Legendary Tree",
  imgSrc: "/Solar legendary tree.webp",
};

function getLevel(exp: number): Level | undefined {
  return levels.find((level) => level.requiredExp > exp);
}

export default function Membership() {
  const {
    data: res,
    isLoading,
    error,
  } = useTransactionControllerGetUserTransactions();
  const transactions = res?.data?.data ?? [];

  const exp = useMemo(() => {
    return transactions.reduce((acc: number, t: any) => acc + t.scc, 0);
  }, [transactions]);

  const level = useMemo(() => getLevel(exp), [exp]);

  // Image dimensions
  const dim = useBreakpointValue({
    base: 128,
    md: 192,
  }) as number;
  const w = dim;
  const h = dim * (level?.imgRatio ?? 1);

  if (isLoading) {
    return <Progress isIndeterminate={true} />;
  }

  return (
    <>
      <Header />
      <PortHead />

      <Stack textAlign="center" my={16}>
        <Heading size="2xl">{level?.name ?? lastLevel.name}</Heading>

        <VStack mt={16} mb={4}>
          <Image
            src={level?.imgSrc ?? lastLevel.imgSrc}
            alt={level?.name ?? lastLevel.name}
            width={w}
            height={h}
          />
          <Spacer />
          <HStack>
            <Text fontSize="2xl" fontWeight="bold" color="green.600">
              {exp}
            </Text>
            <Text>kCO2e</Text>
          </HStack>
          <Heading size="lg">You Have Offset</Heading>
        </VStack>

        <Progress
          value={level ? (100 * exp) / level.requiredExp : 100}
          size="lg"
          mx={4}
          rounded="full"
        />

        {level && (
          <HStack m="auto">
            <Text>Offset</Text>
            <Text color="yellow.400">{level.requiredExp - exp}</Text>
            <Text>kCO2e more to upgrade to Solar Seedling</Text>
          </HStack>
        )}
      </Stack>
    </>
  );
}
