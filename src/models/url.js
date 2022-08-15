'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Url extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Stats }) {
      // define association here
      this.hasOne(Stats, {foreignKey: 'urlId', as: 'stats'})
    }
    toJSON() {
      return {
        ...this.get(), id: undefined // hide the id from API users
      }
    }
  }
  Url.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    longUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {msg: "Url must not be empty"},
        isUrl: {msg: "Url must be valid"},
      }
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: true,
      validate: {
        notEmpty: {msg: "Url must not be empty"},
        is: process.env.BASE_URL_PATH_REGEX
      }
    }
  }, {
    sequelize,
    tableName: 'url',
    modelName: 'Url',
  });
  return Url;
};