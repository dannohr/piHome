var express = require("express");
var router = express.Router();
var thermCtrl = require("../controller/thermoCtrl");

router.get("/status", thermCtrl.current_status);

module.exports = router;
