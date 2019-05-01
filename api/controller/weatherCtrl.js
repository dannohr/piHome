var axios = require("axios");
var moment = require("moment");

module.exports = {
  current_weather(req, res, next) {
    console.log("getting weather info");
    // let city = req.body.city;
    // let country = req.body.country;
    let city = "Dallas";
    let country = "USA";
    let api_key = process.env.WEATHER_API_KEY;
    console.log("the api key is ", api_key);

    let url =
      "http://api.openweathermap.org/data/2.5/weather?q=" +
      city +
      "," +
      country +
      "&appid=" +
      api_key +
      "&units=imperial";

    axios
      .get(url)
      .then(response => {
        console.log(response);
        res.status(200).send(response.data);
      })
      .catch(err => {
        console.log("in .catch in qbCompController");
        console.log(err.response);
        res.status(401).send({ error: err.response });
      });
  },

  weather_forecast(req, res, next) {
    console.log("getting weather forcast info");
    // let city = req.body.city;
    // let country = req.body.country;
    let city = "Dallas";
    let country = "USA";
    let api_key = process.env.WEATHER_API_KEY;
    console.log("the api key is ", api_key);

    let url =
      "http://api.openweathermap.org/data/2.5/forecast?q=" +
      city +
      "," +
      country +
      "&appid=" +
      api_key +
      "&units=imperial";

    axios
      .get(url)
      .then(response => {
        console.log(response);
        let testTime = response.data.list[0].data;
        console.log(moment(testTime).format("dddd, MMMM Do YYYY, h:mm:ss a"));

        res.status(200).send(response.data);
      })
      .catch(err => {
        console.log("in .catch in qbCompController");
        console.log(err.response);
        res.status(401).send({ error: err.response });
      });
  }
};
