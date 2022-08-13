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
import { INITIAL_VISIT_COUNT } from "./constants";
// @ts-expect-error any type sequelize-cli
import { sequelize, Stats, Url } from "./models";

import express from "express";
var app = express();
app.use(express.json());

const portNumber = process.env["PORT"];

app.get("/", (_req, res) => {
  res.send("working...");
});

app.post("/url", async (req, res) => {
  const { longUrl } = await req.body;

  try {
    // Check if longUrl already exists
    const url = await Url.findOne({
      where: {
        longUrl,
      },
      include: [{ model: Stats, as: "stats" }],
    });
    if (url === null) {
      const generateShortUrl =
        process.env.BASE_URL_PATH + Math.random().toString(36).slice(2, 10);
      console.log("generateShortUrl", generateShortUrl);

      const newUrl = await Url.create({
        longUrl: longUrl,
        shortUrl: generateShortUrl, // TODO: url shortening magic!
      });
      // TODO: push the short url with visit 0 in stats
      await Stats.create({
        shortUrl: generateShortUrl,
        visits: INITIAL_VISIT_COUNT,
        urlId: newUrl.id,
      });

      return res.json(newUrl);
    }
    return res.json(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/url/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const url = await Url.findOne({
      where: { shortUrl },
      include: [{ model: Stats, as: "stats" }],
    });

    const currentStat = await Stats.findOne({
      where: { shortUrl },
    });
    console.info(`current visit count: ${currentStat.visits}`);
    const updatedVisitCount = currentStat.visits + 1;

    const updatedStats = await Stats.update(
      { visits: updatedVisitCount },
      { where: { shortUrl: shortUrl } }
    );
    console.info(`updated visit count: ${updatedStats.visits}`);

    return res.json(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

app.get("/stats/:shortUrl", async (req, res) => {
  const shortUrl = req.params.shortUrl;
  try {
    const url = await Stats.findAll({
      where: { shortUrl },
      include: [{ model: Url, as: "url" }],
    });
    return res.json(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
});

var server = app.listen(portNumber, async () => {
  const serverAddress = server?.address() as AddressInfo;
  var host = serverAddress.address || "localhost";
  var port = serverAddress.port || "8081";
  console.log("Server listening at http://%s:%s", host, port);

  await sequelize.authenticate();
  console.log("Database connected!");
});
