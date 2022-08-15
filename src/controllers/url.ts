import { INITIAL_VISIT_COUNT } from "../constants";
import { generateUniqueShortLink } from "./../utils/generateUniqueShortLink";

// @ts-expect-error any type sequelize-cli
import { Stats, Url } from "./../models";

const generateShortLink = async (req: any, res: any) => {
  const { longUrl } = await req.body;

  try {
    // Check if longUrl already exists
    const url = await Url.findOne({
      where: {
        longUrl,
      },
      include: [{ model: Stats, as: "stats" }],
    });
    if (!url) {
      const generateShortUrl = generateUniqueShortLink(
        process.env.BASE_URL_PATH || "",
        longUrl
      );

      const newUrl = await Url.create({
        longUrl: longUrl,
        shortUrl: generateShortUrl,
      });
      await Stats.create({
        shortUrl: generateShortUrl,
        visits: INITIAL_VISIT_COUNT,
        urlId: newUrl.id,
      });

      return res.status(201).json(newUrl);
    }
    return res.status(200).json(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

const visitShortLink = async (req: any, res: any) => {
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

    return res.status(200).json(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  generateShortLink,
  visitShortLink,
};
