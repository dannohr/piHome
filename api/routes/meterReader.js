var express = require('express');
var router = express.Router();

var meterReaderCtrl = require('../controller/meterReaderCtrl');

router.get('/today', meterReaderCtrl.get_today);
router.get('/perioddata/:date', meterReaderCtrl.get_period_data_for_date);
router.get('/allDaily', meterReaderCtrl.get_all);
router.post('/meterdata', meterReaderCtrl.add_daily);
router.put('/meterdata/:id', meterReaderCtrl.edit_daily);
router.delete('/meterdata/:id', meterReaderCtrl.delete_daily);

module.exports = router;
