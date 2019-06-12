var express = require("express");
var router = express.Router();

var calendarCtrl = require("../controller/calendarCtrl");

router.get("/", calendarCtrl.get_events);

module.exports = router;
