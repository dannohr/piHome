var express = require("express");
var router = express.Router();

var meterReaderCtrl = require("../controller/meterReaderCtrl");

router.get("/today", meterReaderCtrl.get_today);

module.exports = router;
