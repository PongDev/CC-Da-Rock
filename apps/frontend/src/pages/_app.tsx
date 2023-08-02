import "@/styles/globals.css";
import {
  baseTheme,
  ChakraProvider,
  extendTheme,
  withDefaultColorScheme,
} from "@chakra-ui/react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import axios from "axios";
import type { AppProps } from "next/app";
// import { AuthProvider } from "react-auth-kit";

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
  withDefaultColorScheme({ colorScheme: "brand" }),
);

const queryClient = new QueryClient();
axios.defaults.baseURL = `http://localhost:8000`;

if (typeof window !== "undefined") {
  axios.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${localStorage.getItem("accessToken")}`;
}

export default function App({ Component, pageProps }: AppProps) {
  return (
    // <AuthProvider
    //   authType="cookie"
    //   authName="_auth"
    //   cookieDomain={window.location.hostname}
    //   cookieSecure={window.location.protocol === "https:"}
    // >
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </QueryClientProvider>
    // </AuthProvider>
  );
}
