// @ts-expect-error Stats and Url model
import { Stats, Url } from "../models";

module.exports = {
  getStats: function () {
    return new Promise((resolve, reject) => {
      Stats.findAll({
        where: {
          shortUrl: "https://xyz.com/2wji2NEG",
        },
        include: [{ model: Url, as: "url" }],
      })
        .then((url: any) => {
          resolve(url);
        })
        .catch((error: any) => {
          console.log(error);
          reject(error);
        });
    });
  },
};
