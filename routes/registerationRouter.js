var express = require('express');
var router = express.Router();
var app=express();
var Controller= require('../Controller/signup');
var PatientController = require('../Controller/patientController');
router.post('/',Controller.CreatenewUser);

router.post('/sendReading',PatientController.submitReading);


module.exports = router;