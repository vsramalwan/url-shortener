// Import the built-in data types
import { DataTypes } from "sequelize";
import { sequelize } from ".";

export const UrlStats = sequelize.define("UrlStats", {
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
  visits: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  lastVisitedAt: {
    type: DataTypes.TIME,
    allowNull: false,
  },
});
