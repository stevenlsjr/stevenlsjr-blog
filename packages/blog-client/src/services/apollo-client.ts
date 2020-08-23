import { ApolloClient, InMemoryCache } from "@apollo/client";
import getConfig from "next/config";
import { concatPagination } from "@apollo/client/utilities";
export function makeClient() {
  const { serverRuntimeConfig, publicRuntimeConfig } = getConfig();

  return new ApolloClient({
    ssrMode: typeof window === "undefined",
    uri: publicRuntimeConfig.graphqlUrl,
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            allPosts: concatPagination(),
          },
        },
      },
    }),
  });
}
const client = makeClient();
export default client;
