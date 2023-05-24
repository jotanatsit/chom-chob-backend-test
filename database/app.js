import { sequelize } from "./utils/db.js";
import { synchronize } from "./models/model.js";

async function init() {
   try {
      await sequelize.authenticate();
      console.log("Connection has been established successfully.");
      synchronize();
   } catch (error) {
      console.error("Unable to connect to the database:", error);
   }
}

init();
