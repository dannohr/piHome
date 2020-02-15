var express = require("express");
var router = express.Router();

var meterReaderCtrl = require("../controller/meterReaderCtrl");

router.get("/today", meterReaderCtrl.get_today);
router.get("/currentPeriod", meterReaderCtrl.get_this_period_daily_totals);
router.get("/allDaily", meterReaderCtrl.get_all);
router.post("/addDaily", meterReaderCtrl.add_daily);
// router.get("/lastPeriod", meterReaderCtrl.get_last_period_daily_totals);

module.exports = router;
