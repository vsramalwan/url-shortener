import dotenv from "dotenv";
import path from "path";

const dotenvConfiguration = dotenv.config({
  path: path.resolve(__dirname, "./../.local.env"),
  debug: true,
});

if (dotenvConfiguration.error) {
  throw dotenvConfiguration.error;
}

console.log(dotenvConfiguration.parsed);

import { AddressInfo } from "net";
// @ts-expect-error any type sequelize-cli
import { sequelize } from "./models";

import express from "express";
var app = express();

const routes = require("./routes");
app.use(express.json());
app.use("/", routes);

const portNumber = process.env.PORT;

var server = app.listen(portNumber, async () => {
  const serverAddress = server?.address() as AddressInfo;
  var host = serverAddress.address || "localhost";
  var port = serverAddress.port || "8081";
  console.log("Server listening at http://%s:%s", host, port);

  await sequelize.authenticate();
  console.log("Database connected!");
});
