import express from "express";
import { AddressInfo } from "net";
// import path from "path";

// const dotenvConfiguration = dotenv.config({
//   path: path.resolve(__dirname, "./../.local.env"),
//   debug: true,
// });

// if (dotenvConfiguration.error) {
//   throw dotenvConfiguration.error;
// }

// console.log(dotenvConfiguration.parsed);

var app = express();
const portNumber = process.env.PORT;

app.get("/", (_req, res) => {
  res.send("working...");
});

app.post("/url", (_req, res) => {
  //   console.log(req.);
  //   console.log(res.short_url);
  res.json();
});

var server = app.listen(portNumber, () => {
  const serverAddress = server?.address() as AddressInfo; //TODO: resolve this
  var host = serverAddress.address || "localhost";
  var port = portNumber || 8081;

  console.log("Listening at http://%s:%s", host, port);
});
