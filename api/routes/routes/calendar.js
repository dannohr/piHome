var express = require("express");
var router = express.Router();

var calendarCtrl = require("../controller/googCalendarCtrl");
// var calendarCtrl = require("../modules/googleCal");

router.get("/", calendarCtrl.index);

module.exports = router;
