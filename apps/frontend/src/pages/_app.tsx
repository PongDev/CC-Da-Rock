import { setup } from "@/services/user.service";
import "@/styles/globals.css";
import {
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AppProps } from "next/app";

const theme = extendTheme(
  {
    colors: {
      green: {
        "50": "#F2F9EC",
        "100": "#DBEDCA",
        "200": "#C4E1A7",
        "300": "#ADD685",
        "400": "#96CA63",
        "500": "#80BE41",
        "600": "#669834",
        "700": "#4D7227",
        "800": "#334C1A",
        "900": "#1A260D",
      },
    },
  },
  withDefaultColorScheme({ colorScheme: "green" })
);

const queryClient = new QueryClient();
console.log(process.env.BACKEND_API_URL);
axios.defaults.baseURL = process.env.NEXT_PUBLIC_BACKEND_API_URL;

// setup user service and axios
setup();

export default function App({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
  );
}
