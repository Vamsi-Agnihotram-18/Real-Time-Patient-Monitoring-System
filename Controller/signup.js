const express = require('express');
const mongoose = require('mongoose');
const User = require('../models/user');
const Readings = require('../models/readings');

exports.CreatenewUser = function (req, res) {

    var user = new User({
        firstName : req.body.firstname,
        lastName : req.body.lastname,
        email : req.body.email,
        //password : user.generateHash(req.body.password),
        //password:req.body.password,
        type : req.body.type,
    });
    user.password = user.generateHash(req.body.password)
    user.save(function (err) {
        if (err)
            return res.json(err);
        else    
            res.send({
                message: "user created Successfully",
            });
        console.log("Data entered");
    });          
}



