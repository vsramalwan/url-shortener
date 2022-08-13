// Import the built-in data types
import { DataTypes } from "sequelize";
import { sequelize } from ".";

export const UrlMapper = sequelize.define("UrlMapper", {
  id: {
    type: DataTypes.BIGINT,
    allowNull: false,
  },
  shortUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  longUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  domain: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  createdAt: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});
