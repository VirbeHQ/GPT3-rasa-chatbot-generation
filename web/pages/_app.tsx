import React from "react";
import { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "@definitions/chakra/theme";
import "@styles/global.css";
import { RootStoreProvider } from "@mobx";

function MyApp({ Component, pageProps }: AppProps): JSX.Element {
  return (
    <ChakraProvider theme={theme}>
      <RootStoreProvider>
        <Component {...pageProps} />
      </RootStoreProvider>
    </ChakraProvider>
  );
}

export default MyApp;
