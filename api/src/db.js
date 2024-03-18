require('dotenv').config();
const pg = require('pg');
const { Sequelize } = require('sequelize');
const UserFunction = require("./models/User.js");
const ReviewFunction = require("./models/Review.js");
const FoodFunction = require("./models/Food.js");
const ItemFunction = require("./models/Item.js");
const OrderFunction = require("./models/Order.js")

const { DB_URL } = process.env;

const sequelize = new Sequelize(
  `${DB_URL}`,
  { 
    logging: false,
    dialectModule: pg,
  }
);

UserFunction(sequelize);
ReviewFunction(sequelize);
FoodFunction(sequelize);
ItemFunction(sequelize);
OrderFunction(sequelize);

// ASSOCIATIONS
const { User, Review, Food, Item, Order } = sequelize.models;
User.hasMany(Review);
Review.belongsTo(User);

Food.hasMany(Review);
Review.belongsTo(Food);

Item.hasOne(Review);
Review.hasOne(Item);

User.belongsToMany(Food, { through: "Favorite" });
Food.belongsToMany(User, { through: "Favorite" });

User.hasMany(Order);
Order.belongsTo(User);

Order.hasMany(Item);
Item.belongsTo(Order);

Food.hasMany(Item);
Item.belongsTo(Food);

// EXPORTS
module.exports = {
  sequelize,
  ...sequelize.models
};

