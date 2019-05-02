const axios = require("axios");
const apiKey = process.env.STOCK_API_KEY;
let symbol = "AMZN";
let interval = "60min";
let seriesFunction = "TIME_SERIES_DAILY";
let outputSize = "compact";
const url =
  "https://www.alphavantage.co/query?function=" +
  seriesFunction +
  "&symbol=" +
  symbol +
  "&interval=" +
  interval +
  "&apikey=" +
  apiKey +
  "&outputsize=" +
  outputSize;

module.exports = {
  current_price(req, res, next) {
    console.log("getting current stock price");

    console.log(url);

    axios
      .get(url)
      .then(response => {
        let status = response.data;
        status.currentTime = new Date();
        res.status(200).send(status);
      })
      .catch(err => {
        console.log("in .catch in thermostat controller");
        console.log(err);
        res.status(401).send({ error: err.response });
      });
  }
};
