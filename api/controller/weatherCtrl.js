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
    let lat = 32.78;
    let lon = -96.81;
    // console.log("the api key is ", api_key);

    let url =
      "http://api.openweathermap.org/data/2.5/weather?" +
      // "q=" +
      // city +
      // "," +
      // country +
      "lat=" +
      lat +
      "&lon=" +
      lon +
      "&appid=" +
      api_key +
      "&units=imperial";

    axios
      .get(url)
      .then(response => {
        // console.log(response.data);

        let testTime = response.data.dt;
        // console.log(moment(testTime).format("dddd, MMMM Do YYYY, h:mm:ss a"));

        res.status(200).send(response.data);
      })
      .catch(err => {
        console.log("in .catch in qbCompController");
        console.log(err.response);
        res.status(401).send({ error: err.response });
      });
  },

  weather_forecast_daily(req, res, next) {
    console.log("getting weather forcast info");
    // let city = req.body.city;
    // let country = req.body.country;
    let city = "Dallas";
    let country = "USA";
    let lat = 32.823333;
    let long = -96.835;
    let api_key = process.env.WEATHER_API_KEY;
    // console.log("the api key is ", api_key);

    let url =
      "http://api.openweathermap.org/data/2.5/forecast?" +
      "q=" +
      city +
      "," +
      country +
      "&appid=" +
      api_key +
      "&units=imperial";

    axios
      .get(url)
      .then(response => {
        // console.log(response);
        let testTime = response.data.list[0].data;
        // console.log(moment(testTime).format("dddd, MMMM Do YYYY, h:mm:ss a"));

        res.status(200).send(response.data);
      })
      .catch(err => {
        console.log("in .catch in qbCompController");
        console.log(err.response);
        res.status(401).send({ error: err.response });
      });
  },
  weather_forecast_hourly(req, res, next) {
    // console.log("getting weather forcast info");
    // let city = req.body.city;
    // let country = req.body.country;
    let city = "Dallas";
    let country = "USA";
    let api_key = process.env.WEATHER_API_KEY;
    // console.log("the api key is ", api_key);

    let utl =
      "api.openweathermap.org/data/2.5/forecast/hourly?q=" +
      city +
      "," +
      country +
      "&appid=" +
      api_key +
      "&units=imperial";

    axios
      .get(url)
      .then(response => {
        // console.log(response);
        // let testTime = response.data.list[0].data;
        // console.log(moment(testTime).format("dddd, MMMM Do YYYY, h:mm:ss a"));

        res.status(200).send(response.data);
      })
      .catch(err => {
        console.log("in .catch in qbCompController");
        console.log(err.response);
        res.status(401).send({ error: err.response });
      });
  },
  weather_now(req, res, next) {
    console.log("getting weather info");
    let api_key = process.env.ACCUWEATHER_KEY;
    let location = process.env.ACCUWEATHER_LOCATION_ID;

    let url =
      "http://dataservice.accuweather.com/currentconditions/v1/" +
      location +
      "?apikey=" +
      api_key +
      "&language=en-us&details=true";

    axios
      .get(url)
      .then(response => {
        res.status(200).send(response.data);
      })
      .catch(err => {
        console.log("in .catch in qbCompController");
        console.log(err.response);
        res.status(401).send({ error: err });
      });
  }
};
