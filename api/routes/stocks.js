var express = require("express");
var router = express.Router();

var stocksCtrl = require("../controller/stocksCtrl");

router.get("/current", stocksCtrl.current_price);

module.exports = router;
