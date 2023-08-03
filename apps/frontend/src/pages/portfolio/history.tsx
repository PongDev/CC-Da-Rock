import { PortHead } from "@/components/portfolio/PortHead";
import { Header } from "@/components/Header";
import {
  transactionControllerGetUserTransactions,
  useTransactionControllerGetUserTransactions,
} from "@/oapi-client/transaction";
import {
  Box,
  Container,
  List,
  ListItem,
  Progress,
  Spacer,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";

export default function History() {
  const {
    data: res,
    isLoading,
    error,
  } = useTransactionControllerGetUserTransactions({});

  if (isLoading) {
    return <Progress isIndeterminate={true} />;
  }
  const transactions = res?.data?.data ?? [];

  return (
    <>
      <Header />
      <PortHead />
      {error && <Text>{JSON.stringify(error.toJSON())}</Text>}
      <Container my={16} maxW="container.lg">
        {transactions.map((t: any) => (
          <TransactionCard id={t.id} date={t.createdAt} amount={t.amount} />
        ))}
      </Container>
    </>
  );
}

const TransactionCard = (props: {
  id: number;
  date: string;
  amount: number;
}) => {
  const { id, date, amount } = props;

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
    >
      <Text float="right" fontWeight="bold" color="green.500">
        Completed
      </Text>
      <List spacing={2}>
        <ListItem>Order No: {id}</ListItem>
        <ListItem>Date: {formattedDate}</ListItem>
        <ListItem>Total Payment: {amount} ฿</ListItem>
      </List>
    </Box>
  );
};
