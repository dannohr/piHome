var express = require("express");
var router = express.Router();

var dartCtrl = require("../controller/dartCtrl");

router.get("/calendar", dartCtrl.get_calendar);
router.get("/stops", dartCtrl.get_stops);
router.get("/stoptimes", dartCtrl.get_stop_times);
router.get("/trips", dartCtrl.get_trips);

module.exports = router;
