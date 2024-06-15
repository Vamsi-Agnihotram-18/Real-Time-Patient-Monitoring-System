var express= require('express'); 
var app= express();
var jwt    = require('jsonwebtoken');

///Connect to DataBasae
var mongoose = require('mongoose');
var config= require('../DBconfig');
mongoose.connect(config.database);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
//Bind connection to error event (to get notification of connection errors)
(db.on('error', console.error.bind(console, 'MongoDB connection error:')));

const UserInstance = require('../models/user');
const ReadingsInstance = require('../models/readings');
//Function To Login

exports.loginandGetToken = function(req, res)
 {
    UserInstance.findOne(  
        // query
        {email :req.body.email}, (err, Doc) => {
if (err) return res.status(200).send(err)
if(Doc==null)
{
   return res.status(200).json(message='Invalid Email')
}
else if(!Doc.validPassword(req.body.password))
{
   return res.send({msg:'password Invalid'});
}
else if(Doc.type !='doctor')
{
   return res.send({msg:'This user is not allowed to Access this Domain'});
}
else
{
   // res.send('login Successfull and token generated');
    //Generate JWT Token
    const payload = {
        name: req.body.name 
      };
          var token = jwt.sign(payload, config.secret, {expiresIn: 86400 // expires in 24 hours
        });
        
 //          return the information including token as JSON
        return res.json({
            success: true,
            message: 'logged in!!! Enjoy your token!',
            token: token,
            type: Doc.type,
            email : Doc.email
          });     
}
        });
};



exports.ViewAllReadings= function(req, res)
 {
        ReadingsInstance.find()
    
        .then(article => {
            if(article==null){ res.json({message:'No Readings Found'})}
            else
            return res.json(article);
        }).catch(err => {
            return res.status(500).send({
                message: err.message || "Some error occurred while retrieving all Readings."
            });
        });
    
 }

exports.FetchAllPatients= function(req,res){
    UserInstance.find({
        type:'patient'
    })

    .then(article => {
        if(article==null){ res.json({message:'No Patient Found'})}
        else
        return res.json(article);
    }).catch(err => {
        return res.status(500).send({
            message: err.message || "Some error occurred while retrieving all Patients."
        });
    });
};