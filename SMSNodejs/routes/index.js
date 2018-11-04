'use strict';
var express = require('express');
var router = express.Router();

var oStudent = require('../models/student');

/* GET home page. */
router.get('/', function (req, res) {
    //db.on('error', console.error.bind(console, 'MongoDB connection error:'));   
    res.render('index', { title: 'Express' });
});

router.get('/AddStudent', function (req, res) {
    //db.on('error', console.error.bind(console, 'MongoDB connection error:'));   
    res.render('AddStudent', { title: 'Express' });
});
router.post('/AddStudent', function (req, res) {
    oStudent.create(req.body).then(function (student) {
        res.send(student);
    });
    //res.render('index', { title: 'Express' });
});

module.exports = router;
