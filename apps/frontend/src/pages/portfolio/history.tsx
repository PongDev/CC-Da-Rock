import { PortHead } from "@/components/portfolio/PortHead";
import { Header } from "@/components/Header";
import { useTransactionControllerGetUserTransactions } from "@/oapi-client/transaction";
import {
  Box,
  BoxProps,
  Button,
  Container,
  Divider,
  forwardRef,
  Grid,
  Heading,
  HStack,
  List,
  ListItem,
  Progress,
  Spacer,
  Stack,
  Text,
  VStack,
} from "@chakra-ui/react";
import { AxiosResponse } from "axios";
import { useMemo, useRef } from "react";
import { useRouter } from "next/router";
import { Image, Link } from "@chakra-ui/next-js";
import { Certificate } from "@/components/portfolio/Certificate";
import { toPng } from "html-to-image";
import { useAuthControllerProfile } from "@/oapi-client/auth";

export default function History() {
  const router = useRouter();
  const { id } = router.query;

  const {
    data: res,
    isLoading,
    error,
  } = useTransactionControllerGetUserTransactions<AxiosResponse<any, any>>({});
  const transactions = res?.data?.data ?? [];

  const selected = useMemo(() => {
    if (id === undefined) {
      return undefined;
    }
    const i = parseInt(id as string);
    if (isNaN(i)) {
      return undefined;
    }

    return transactions.find((t) => t.id === i);
  }, [id, transactions]);

  if (isLoading) {
    return <Progress isIndeterminate={true} />;
  }

  console.log(transactions);

  return (
    <>
      <Header />
      <PortHead />

      <Container my={16} maxW="container.lg">
        <Stack gap={8}>
          {id === undefined &&
            (transactions.length > 0 ? (
              transactions.map((t: any) => (
                <Link
                  href={`/portfolio/history?id=${t.id}`}
                  _hover={{ textDecor: "none" }}
                >
                  <TransactionCard
                    no={t.id}
                    date={t.createdAt}
                    amount={t.amount}
                  />
                </Link>
              ))
            ) : (
              <TrasnactionEmpty />
            ))}
        </Stack>

        {id !== undefined && (
          <TransactionInfo
            no={selected.id}
            serial={selected.serialID}
            date={selected.createdAt}
            amount={selected.amount}
            cf={selected.cf}
            scc={selected.scc}
            status="Completed"
          />
        )}
      </Container>
    </>
  );
}

const TransactionCard = forwardRef<
  {
    no: number;
    date: string;
    amount: number;
  } & BoxProps,
  "div"
>((props, ref) => {
  const { no, date, amount, ...rest } = props;

  const formattedDate = new Date(date).toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
  });

  return (
    <Box
      shadow="md"
      borderColor="gray.300"
      borderWidth="1px"
      rounded="xl"
      p={4}
      transitionDuration="0.2s"
      _hover={{ shadow: "lg", transform: "translateY(-4px) scale(1.02)" }}
      ref={ref}
      {...rest}
    >
      <Text float="right" fontWeight="bold" color="green.500">
        Completed
      </Text>
      <List spacing={2}>
        <ListItem>Order No: {no}</ListItem>
        <ListItem>Date: {formattedDate}</ListItem>
        <ListItem>Total Payment: {amount} ฿</ListItem>
      </List>
    </Box>
  );
});

const TransactionInfo = (props: {
  serial: string;
  no: number;
  date: string;
  cf: number;
  scc: number;
  amount: number;
  status: string;
}) => {
  const formattedDate = new Date(props.date).toLocaleString("th-TH", {
    timeZone: "Asia/Bangkok",
  });
  const ref = useRef<HTMLDivElement>(null);

  const { data: profile } = useAuthControllerProfile();

  return (
    <>
      <VStack
        rounded="xl"
        w="full"
        textAlign="center"
        gap={3}
        shadow="md"
        borderColor="gray.300"
        borderWidth="1px"
        px={4}
        py={8}
      >
        <Heading size="lg" color="gray.500">
          Amount
        </Heading>

        <HStack justifyContent="center" alignContent="flex-start">
          <Heading size="2xl">{props.scc}</Heading>
          <Text>Solar CC</Text>
        </HStack>

        <Text color="gray.500" fontSize="sm">
          Your Offset is Completed. <br /> Check Your Certificate Below
        </Text>

        <Divider borderWidth={2} />

        <Grid gridTemplateColumns="50% 50%" width="50%" my={8} gap={3}>
          <Text fontWeight="bold" textAlign="left">
            Order No
          </Text>
          <Text textAlign="right">{props.no}</Text>

          <Text fontWeight="bold" textAlign="left">
            Date
          </Text>
          <Text textAlign="right">{formattedDate}</Text>

          <Text fontWeight="bold" textAlign="left">
            Solar Carbon credit Coin
          </Text>
          <Text textAlign="right">{props.scc} Coins</Text>

          <Text fontWeight="bold" textAlign="left">
            Total Carbon Footprint Offset
          </Text>
          <Text textAlign="right">{props.cf} kgCO2</Text>

          <Text fontWeight="bold" textAlign="left">
            Total Payment
          </Text>
          <Text textAlign="right">{props.amount} ฿</Text>

          <Text fontWeight="bold" textAlign="left">
            Status
          </Text>
          <Text textAlign="right" color="green.500">
            {props.status}
          </Text>
        </Grid>

        <Divider borderWidth={2} />

        <Certificate
          serial={props.serial}
          name={profile?.data.name}
          tC02={props.cf}
          date={formattedDate}
          p={4}
          ref={ref}
        />
        <Button
          size="lg"
          my="8"
          width="lg"
          onClick={() => download(ref, `certificate-${props.no}`)}
        >
          Download
        </Button>
      </VStack>
    </>
  );
};

const TrasnactionEmpty = () => {
  return (
    <Container>
      <VStack gap={4}>
        <Image src="/Sad Sun.png" alt="Sad Sun" width={384} height={384} />
        <VStack>
          <Heading>No Order Found</Heading>
          <Divider borderWidth={2} />
          <Text
            textAlign="center"
            fontWeight="light"
            size="lg"
            letterSpacing={0.3}
          >
            Look like You haven’t make any purchase yet
          </Text>
        </VStack>

        <Spacer />
        <Spacer />
        <Spacer />

        <Button as={Link} href="/store/solar-cc" size="lg" width="60%">
          Make Purchase
        </Button>
      </VStack>
    </Container>
  );
};

async function download(ref: React.RefObject<HTMLElement>, name: string) {
  if (!ref.current) {
    alert("Cannot download: ref is null");
    return;
  }

  // Convert to image, and download it
  const png = await toPng(ref.current);

  const link = document.createElement("a");
  link.download = name;
  link.href = png;
  link.click();
}
