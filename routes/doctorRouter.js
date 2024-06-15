var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/doctorController');
router.post('/',Controller.loginandGetToken);
var varifyToken= require('../TokenVerify');
router.use(varifyToken);
/* GET users listing. */

router.post('/viewReadings',Controller.ViewAllReadings);
router.post('/viewAllPatients',Controller.FetchAllPatients);

module.exports = router;