import dotenv from "dotenv";
import path from "path";
import { Sequelize } from "sequelize";

const dotenvConfiguration = dotenv.config({
  path: path.resolve(__dirname, "./../../.local.env"),
  debug: true,
});

if (dotenvConfiguration.error) {
  throw dotenvConfiguration.error;
}

console.log(dotenvConfiguration.parsed);

export const sequelize = new Sequelize(
  // @ts-expect-error this will work!
  process.env.DB_SCHEMA,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect: "mysql",
    // dialectOptions: {
    //   rejectUnauthorized: false,
    // },
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);