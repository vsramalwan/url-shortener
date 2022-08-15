let StatsDAO = require("./statsDAO");

jest.mock("./../models/Stats", () => () => {
  const SequelizeMock = require("sequelize-mock");
  const dbMock = new SequelizeMock();
  return dbMock.define("Stats", {
    uuid: "a0d17ece-d757-4a19-91db-c189ef706e4e",
    shortUrl: "https://xyz.com/2wji2NEG",
    visits: 8,
    createdAt: "2022-08-15 15:58:57",
    updatedAt: "2022-08-15 15:58:57",
    url: {
      uuid: "44033b27-da9a-4903-afee-2fa35da087b9",
      longUrl: "https://github.com/morelmiles/sequelize-tutorial",
      shortUrl: "https://xyz.com/2wji2NEG",
      createdAt: "2022-08-15 15:58:58",
      updatedAt: "2022-08-15 15:58:58",
    },
  });
});

describe("Stats Model", () => {
  it("should get stats from mock", async () => {
    const stats = await StatsDAO.getStats();
    expect(stats.shortUrl).toEqual("https://xyz.com/2wji2NEG");
    expect(stats.visits).toEqual(8);
    expect(stats.url.longUrl).toEqual(
      "https://github.com/morelmiles/sequelize-tutorial"
    );
  });
});
