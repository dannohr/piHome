var express = require("express");
var router = express.Router();

var meterReaderCtrl = require("../controller/meterReaderCtrl");

router.get("/today", meterReaderCtrl.get_today);
// router.get("/currentPeriod", meterReaderCtrl.get_this_period_daily_totals);
router.get("/perioddata/:date", meterReaderCtrl.get_period_data_for_date);
router.get("/allDaily", meterReaderCtrl.get_all);
router.post("/meterdata", meterReaderCtrl.add_daily);
router.put("/meterdata/:id", meterReaderCtrl.edit_daily);
router.delete("/meterdata/:id", meterReaderCtrl.delete_daily);
// router.get("/lastPeriod", meterReaderCtrl.get_last_period_daily_totals);

module.exports = router;
