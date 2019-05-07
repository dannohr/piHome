const axios = require("axios");
const apiKey = process.env.STOCK_API_KEY;
const Sequelize = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "../db/piHome.db"
});

module.exports = {
  get_all_stocks(req, res, next) {
    console.log("Trying to get all stocks");
  }
};
