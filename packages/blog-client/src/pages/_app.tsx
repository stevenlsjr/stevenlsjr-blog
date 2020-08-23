import { AppProps } from "next/app";
import React from "react";
import { ApolloProvider } from "@apollo/client";
import { makeClient } from "../services/apollo-client";
const client = makeClient();
export default function BlogApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      {" "}
      <Component {...pageProps} />
    </ApolloProvider>
  );
}
