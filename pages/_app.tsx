import "@fontsource/yrsa";
import "@fontsource/maven-pro";

import type { AppProps } from "next/app";
import { ChakraProvider } from "@chakra-ui/react";
import theme from "libs/theme";
import Head from "next/head";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Head>
        <title>Shopping List</title>
      </Head>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </>
  );
}

export default MyApp;
