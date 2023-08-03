import { Header } from "@/components/Header";
import { useTransactionControllerPurchaseSolarCoins } from "@/oapi-client/transaction";
import { getToken, useDecodedToken } from "@/services/user.service";
import {
  VStack,
  Heading,
  Avatar,
  Text,
  Code,
  NumberInput,
  FormControl,
  FormLabel,
  Input,
  NumberInputField,
  NumberDecrementStepper,
  NumberIncrementStepper,
  NumberInputStepper,
  Box,
  Grid,
  GridItem,
  Stack,
  Spacer,
  Button,
  useSteps,
  Stepper,
  Step,
  StepIndicator,
  StepStatus,
  StepIcon,
  StepNumber,
  StepTitle,
  StepDescription,
  IconButton,
  HStack,
  StepSeparator,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Img,
} from "@chakra-ui/react";
import { isAxiosError } from "axios";
import Script from "next/script";
import { useEffect, useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { FaAngleLeft } from "react-icons/fa";
import type { PurchaseSolarCoinsRequestDTO } from "@/oapi-client/aPIDocument.schemas";
import { useRouter } from "next/router";

function calCost(cf: number) {
  const scc = cf;
  const price = 0.5 * cf;
  const vat = 0.07 * price;
  const fee = 0.03 * price;
  const total = price + vat + fee;

  return {
    scc,
    price,
    vat,
    fee,
    total,
  };
}

export default function SolarCC() {
  const [cc, setCc] = useState(1);
  const { activeStep, goToNext, goToPrevious } = useSteps({
    index: 0,
    count: 3,
  });

  // for fist page
  function onSubmit() {
    const order = calCost(cc);
    if (cc <= 0) {
      alert("Please input a valid carbon footprint");
      return;
    }
    if (order.total <= 20) {
      alert("Please order at least 20 baht");
      return;
    }

    goToNext();
  }

  return (
    <>
      <Header />

      <Stack gap={8} p={16}>
        <HStack>
          {activeStep > 0 && (
            <IconButton
              aria-label="back"
              bg="transparent"
              colorScheme="whiteAlpha"
              icon={<FaAngleLeft size={48} color="black" />}
              onClick={goToPrevious}
            />
          )}
          <Heading>
            {["Order Solar CC Coin", "Choose Payment Method"][activeStep]}
          </Heading>
        </HStack>

        <Stepper index={activeStep}>
          <Step key={1}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>Order Solar CC Coin</StepTitle>
            </Box>
            <StepSeparator />
          </Step>

          <Step key={2}>
            <StepIndicator>
              <StepStatus
                complete={<StepIcon />}
                incomplete={<StepNumber />}
                active={<StepNumber />}
              />
            </StepIndicator>
            <Box flexShrink="0">
              <StepTitle>Payment</StepTitle>
            </Box>
          </Step>
          <StepSeparator />
        </Stepper>

        {activeStep === 0 ? (
          <Page1 cf={cc} setCf={setCc} onSubmit={onSubmit} />
        ) : activeStep === 1 ? (
          <Page2 cf={cc} />
        ) : null}
      </Stack>
    </>
  );
}

const Page1 = (props: {
  cf: number;
  setCf: React.Dispatch<React.SetStateAction<number>>;
  onSubmit?: () => void;
}) => {
  const { cf, setCf } = props;

  const order = useMemo(() => calCost(cf), [cf]);

  return (
    <>
      <FormControl isRequired>
        <FormLabel fontWeight="bold">Carbon Footprint (kCO2eq)</FormLabel>
        <NumberInput
          min={1}
          max={99999999}
          value={cf}
          onChange={(x) => setCf(+x)}
        >
          <NumberInputField />
          <NumberInputStepper>
            <NumberIncrementStepper />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </FormControl>

      <OrderSummary cf={cf} order={order} />

      <Button colorScheme="yellow" type="submit" onClick={props.onSubmit}>
        Order
      </Button>
    </>
  );
};

const Page2 = (props: { cf: number }) => {
  const order = useMemo(() => calCost(props.cf), [props.cf]);
  const satang = order.total * 100;

  const [decodedToken] = useDecodedToken();
  const router = useRouter();

  const { mutateAsync: doTransaction, isLoading } =
    useTransactionControllerPurchaseSolarCoins();
  const [modelOpen, setModelOpen] = useState(false);
  useEffect(() => {
    setModelOpen((x) => x || isLoading);
  }, [isLoading]);

  async function onPayment(nonce: string) {
    console.assert(nonce.startsWith("tokn_"), { nonce });

    if (decodedToken?.userId == null) {
      alert("Please login first");
      return;
    }

    const data: PurchaseSolarCoinsRequestDTO = {
      amount: satang / 100,
      cf: props.cf,
      scc: order.scc,

      tokenId: nonce,
    };
    console.log(data);
    try {
      const res = await doTransaction({
        data: data,
      });
      console.log(res);
      await router.push("/store/success");
    } catch (err) {
      // TODO: redirect to dedicated error page
      console.error(err);
      if (isAxiosError(err)) {
        const mainMsg = err.message + ": " + err.response?.data.message;

        router.push({
          pathname: "/store/error",
          query: {
            mainMsg,
            err: JSON.stringify(err.toJSON()),
          },
        });
      }
    }
  }

  // const dataKey = process.env["NEXT_PUBLIC_OMISE_PUBLIC_KEY"];

  return (
    <>
      <Script type="text/javascript" src="https://cdn.omise.co/omise.js" />

      <OrderSummary cf={props.cf} order={order} />

      <Button
        isLoading={isLoading}
        onClick={() => {
          const publicKey = process.env.NEXT_PUBLIC_OMISE_PUBLIC_KEY;
          if (publicKey == null) {
            console.error("NEXT_PUBLIC_OMISE_PUBLIC_KEY is not set");
            return;
          }

          window.OmiseCard.configure({
            publicKey,
          });

          window.OmiseCard.open({
            amount: satang,
            currency: "THB",
            defaultPaymentMethod: "credit_card",
            // otherPaymentMethods: ["promptpay"],
            onCreateTokenSuccess: onPayment,
          });
        }}
      >
        Purchase
      </Button>

      <Modal isOpen={modelOpen} onClose={() => {}}>
        <ModalOverlay />
        <ModalContent>
          <Img src="/hourglass.gif" />
        </ModalContent>
      </Modal>
    </>
  );
};
const OrderSummary = (props: {
  cf: number;
  order: {
    scc: number;
    price: number;
    vat: number;
    fee: number;
    total: number;
  };
}) => {
  const { cf, order } = props;

  return (
    <Grid gridTemplateColumns="50% 50%">
      <Heading size="md" mb={2}>
        Order Information
      </Heading>
      <Spacer />

      <Text>Solar Carbon credit</Text>
      <Text>{cf} Coins</Text>

      <Text>Price</Text>
      <Text>{order.price.toFixed(2)} ฿</Text>

      <Text>VAT 7%</Text>
      <Text>{order.vat.toFixed(2)} ฿</Text>

      <Text>Fee</Text>
      <Text>{order.fee.toFixed(2)} ฿</Text>

      <Heading size="md">Total Payment</Heading>
      <Text fontWeight="bold">{order.total.toFixed(2)} ฿</Text>
    </Grid>
  );
};
