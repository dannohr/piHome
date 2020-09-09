var express = require("express");
var router = express.Router();

var electricMeterDataCtrl = require("../controller/electricMeterDataCtrl");

router.get(
  "/perioddatarange/:date",
  electricMeterDataCtrl.get_period_date_rage
);

router.put("/perioddailydata", electricMeterDataCtrl.get_period_daily_data);

module.exports = router;
