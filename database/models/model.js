import { DataTypes } from "sequelize";
import { sequelize } from "../utils/db.js";

//-----store-users-----
const users = sequelize.define("users", {
   user_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
   },
   item_id: {
      type: DataTypes.ARRAY(DataTypes.INTEGER),
      allowNull: false,
   },
});

//-----store-items-----
const items = sequelize.define("items", {
   item_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
   },
   item_name: {
      type: DataTypes.CHAR(25),
      unique: true,
      allowNull: false,
   },
   item_description: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
   },
   item_price: {
      type: DataTypes.FLOAT,
      allowNull: false,
   },
   open_sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   end_sale_date: {
      type: DataTypes.DATE,
      allowNull: false,
   },
   promotion_range: {
      type: DataTypes.RANGE(DataTypes.DATE),
      allowNull: true,
   },
});

//-----codes-----
const codes = sequelize.define("codes", {
   code_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
      allowNull: false,
   },
   code_name: {
      type: DataTypes.CHAR(25),
      unique: true,
      allowNull: false,
   },
   code_description: {
      type: DataTypes.TEXT,
      unique: true,
      allowNull: false,
   },
});

//-----users-items---1-to-many-----
users.hasMany(items, { foreignKey: "item_id" });
items.belongsTo(users, { foreignKey: "item_id" });

//-----items-codes---1-to-1-----
items.hasOne(codes, { foreignKey: "code_id" });
codes.belongsTo(items, { foreignKey: "code_id" });

export const synchronize = async () => {
   try {
      await sequelize.sync({ alter: true });
      console.log("All models were synchronized successfully.");
   } catch (error) {
      console.log("error:", error);
   }
};
