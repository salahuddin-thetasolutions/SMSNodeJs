'use strict';
var express = require('express');
var router = express.Router();
//Import the mongoose module
var mongoose = require('mongoose');
var mongoDB = 'mongodb://127.0.0.1/sms';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//Get the default connection
var db = mongoose.connection;
/* GET home page. */
router.get('/', function (req, res) {
    db.on('error', console.error.bind(console, 'MongoDB connection error:'));

    res.render('index', { title: 'Express' });
});

module.exports = router;
