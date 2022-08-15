import { sha256 } from "js-sha256";
import base58 from "micro-base58";

export const generateUniqueShortLink = (basePath: string, url: string) => {
  return basePath + sha256Of(url);
};

const sha256Of = (longUrl: string) => {
  const sha256LongUrl = sha256(longUrl);
  return base58Of(sha256LongUrl);
};

const base58Of = (sha256: string) => {
  return base58(sha256).slice(0, 8);
};
