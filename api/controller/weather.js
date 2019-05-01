var axios = require("axios");

module.exports = {
  current_weather(req, res, next) {
    console.log("getting weather info");
    let city = req.body.city;
    let country = req.body.country;
    let api_key = process.env.WEATHER_API_KEY;

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
  }
};
