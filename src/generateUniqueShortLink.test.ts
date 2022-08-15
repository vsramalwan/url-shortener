import { generateUniqueShortLink } from "./generateUniqueShortLink";

describe("Generate Unique Short Link", () => {
  test("it generates unique short link as per base path", () => {
    const basePath = "https://xyz.com/";
    const baseUrlPathRegex = "^https?://(xyz.com){1}/[a-zA-Z0-9]{1,256}$";
    const url = "www.google.com";
    const shortUrl = generateUniqueShortLink(basePath, url);
    expect(shortUrl.match(baseUrlPathRegex));
  });
});
