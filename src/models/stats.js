'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Stats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ Url}) {
      // define association here
      this.belongsTo(Url, {foreignKey: 'urlId', as: 'url'})
    }
    toJSON() {
      return {
        ...this.get(), id: undefined, urlId: undefined // hide the id from API users
      }
    }
  }
  Stats.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    shortUrl: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {msg: "Url must not be empty"},
        is: process.env.BASE_URL_PATH_REGEX
      }
    },
    visits: {
      type: DataTypes.INTEGER,
      allowNull: true,
      defaultValue: 0
    }
  }, {
    sequelize,
    tableName: 'stats',
    modelName: 'Stats',
  });
  return Stats;
};