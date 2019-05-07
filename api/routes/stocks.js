var express = require("express");
var router = express.Router();

var stocksCtrl = require("../controller/stocksCtrl");

router.get("/all", stocksCtrl.get_all_stocks);

module.exports = router;
