// server.js
const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");

const httpProxyMiddleware = require("http-proxy-middleware");
const { url } = require("inspector");
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();
const express = require('express')
/**
 *
 * @param {string[]} keys
 */
function getArg(keys) {
  const index = process.argv.findIndex((arg) => keys.includes(arg));
  if (index >= 0) {
    return process.argv[index + 1];
  } else {
    return undefined;
  }
}

function hasArg(keys) {
  const index = process.argv.findIndex((arg) => keys.includes(arg));
  return index >= 0;
}

const host = getArg(["--host", "-H"]) || process.env.HOST || "localhost";
let port = parseInt(getArg(["--port", "-p"]), 10);
port = port || port === 0 ? port : parseInt(process.env.PORT, 10) || 3000;
if (hasArg(["-h", "--help"])) {
  description = dev
    ? `
        Starts the application in development mode`
    : `
        Starts the application in production mode.
        The application should be compiled with \`next build\` first.`;
  console.log(`
      Description${description}
      Usage
        $ node src/server -p <port>
      If no directory is provided, the current directory will be used.
      Options
        --port, -p      A port number on which to start the application
        --hostname, -H  Hostname on which to start the application
        --help, -h      Displays this message
    `);
  process.exit(0);
}
app.prepare().then(() => {
  /**@type {string} */
  let apiUrl = app.nextConfig.publicRuntimeConfig.apiUrl;
  const mediaUrl = apiUrl.replace(/\/?$/, "/media/");
  console.warn(mediaUrl);
  const proxyMedia = httpProxyMiddleware.createProxyMiddleware({
    target: apiUrl,
    changeOrigin: true
  });
  const server = express()
  server.use('/media', proxyMedia)
  server.use((req, res)=>handle(req, res))
  server.listen(port, host, () => {
    console.log(`listening to http://${host}:${port}`);
  });
});
