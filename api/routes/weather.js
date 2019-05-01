var express = require("express");
var router = express.Router();

var weatherCtrl = require("../controller/weatherCtrl");

router.get("/current", weatherCtrl.current_weather);
router.get("/forecast", weatherCtrl.weather_forecast);

module.exports = router;
