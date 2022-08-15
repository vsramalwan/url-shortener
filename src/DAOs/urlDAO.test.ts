let UrlDAO = require("./urlDAO");

jest.mock("./../models/Url", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("Url", {
    uuid: "44033b27-da9a-4903-afee-2fa35da087b9",
    longUrl: "https://github.com/morelmiles/sequelize-tutorial",
    shortUrl: "https://xyz.com/2wji2NEG",
    createdAt: "2022-08-15 15:58:57",
    updatedAt: "2022-08-15 15:58:57",
    stats: {
      uuid: "a0d17ece-d757-4a19-91db-c189ef706e4e",
      shortUrl: "https://xyz.com/2wji2NEG",
      visits: 8,
      createdAt: "2022-08-15 15:58:58",
      updatedAt: "2022-08-15 15:58:58",
    },
  });
});

describe("Url Model", () => {
  it("should get shortUrl from mock", async () => {
    const url = await UrlDAO.getUrl();
    expect(url.longUrl).toEqual(
      "https://github.com/morelmiles/sequelize-tutorial"
    );
    expect(url.shortUrl).toEqual("https://xyz.com/2wji2NEG");
    expect(url.stats.visits).toEqual(8);
  });
  it("should post long Url and get shortUrl from mock", async () => {
    const url = await UrlDAO.postUrl();
    expect(url.shortUrl).toEqual("https://xyz.com/2wji2NEG");
    expect(url.longUrl).toEqual(
      "https://github.com/morelmiles/sequelize-tutorial"
    );
  });
});
