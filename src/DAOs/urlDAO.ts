// @ts-expect-error Stats and Url model
import { Stats, Url } from "./../models";

module.exports = {
  postUrl: function () {
    return new Promise((resolve, reject) => {
      Url.findOne({
        where: {
          longUrl: "https://github.com/morelmiles/sequelize-tutorial",
        },
        include: [{ model: Stats, as: "stats" }],
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
  getUrl: function () {
    return new Promise((resolve, reject) => {
      Url.findOne({
        where: {
          shortUrl: "https://xyz.com/2wji2NEG",
        },
        include: [{ model: Stats, as: "stats" }],
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
