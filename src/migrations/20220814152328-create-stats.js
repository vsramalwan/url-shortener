'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('stats', {
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      shortUrl: {
        type: DataTypes.STRING,
        allowNull: false
      },
      visits: {
        type: DataTypes.INTEGER,
        allowNull: true
      },
      urlId: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('stats');
  }
};