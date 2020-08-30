module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
    mySecret: "secret",
    secondSecret: process.env.SECOND_SECRET, // Pass through env variables
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    graphqlUrl: process.env.NEXT_GRAPHQL_URL || "http://localhost:8000/graphql",
    apiUrl: process.env.NEXT_API_URL || "http://localhost:8000/",
  },
  webpack(config, { buildId, dev, isServer, defaultLoaders, webpack }) {
    config.module.rules.push({
      test: /\.(graphql|gql)$/,
      exclude: /node_modules/,
      loader: "graphql-tag/loader",
    });
    return config;
  },
};
