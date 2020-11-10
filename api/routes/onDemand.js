var express = require("express");
var router = express.Router();

var onDemandCtrl = require("../controller/onDemandCtrl");

router.get("/ondemand", onDemandCtrl.get_all);
router.post("/ondemand", onDemandCtrl.add_onDemand);
router.put("/ondemand/:id", onDemandCtrl.edit_onDemand);
router.delete("/ondemand/:id", onDemandCtrl.delete_onDemand);
router.get("/ondemand/:readDate", onDemandCtrl.get_by_date);
router.get("/ondemandnewread", onDemandCtrl.get_on_demand_read);

module.exports = router;
