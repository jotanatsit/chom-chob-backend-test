import { Sequelize } from "sequelize";
import { url } from "../.sequelizerc.js";

const sequelize = new Sequelize(url, { logging: false });

export { sequelize };
