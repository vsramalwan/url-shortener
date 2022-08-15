// @ts-expect-error any type sequelize-cli
import { Stats, Url } from "./../models";

const getStats = async (req: any, res: any) => {
  const shortUrl = req.params.shortUrl;
  try {
    const url = await Stats.findAll({
      where: { shortUrl },
      include: [{ model: Url, as: "url" }],
    });
    return res.status(200).json(url);
  } catch (error) {
    console.log(error);
    return res.status(500).json(error);
  }
};

module.exports = {
  getStats,
};
