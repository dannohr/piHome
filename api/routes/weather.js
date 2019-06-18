var express = require("express");
var router = express.Router();

var weatherCtrl = require("../controller/weatherCtrl");

router.get("/old_current", weatherCtrl.current_weather);
router.get("/forecast/daily", weatherCtrl.weather_forecast_daily);
router.get("/forecast/hourly", weatherCtrl.weather_forecast_hourly);
router.get("/current", weatherCtrl.weather_now);

module.exports = router;
