import { Sequelize } from "sequelize";
import dotenv from "dotenv";

/* dotenv.config();
const dbName = String(process.env.DATABASE_NAME);
const username = String(process.env.DATABASE_USERNAME);
const password = String(process.env.DATABASE_PASSWORD);

const url = `postgresql://${username}:${password}@localhost:5432/${dbName}`; */

// * dotenv cannot be read, I don't understand

const sequelize = new Sequelize(
   "postgresql://postgres:3c9aca00@localhost:5432/chom_chob_test_2",
   { logging: false }
);

export { sequelize };
