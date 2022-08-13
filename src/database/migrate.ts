var db = require("./index");

async () => {
  try {
    await db.sequelize.authenticate().then(() => {
      console.log("Connection has been established successfully.");
    });
    // db.sequelize.sync();
  } catch (error) {
    console.error("Unable to connect to the database:", error);
  } finally {
    await db.sequelize.close();
  }
};
