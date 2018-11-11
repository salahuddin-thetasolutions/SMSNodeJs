'use strict';
var express = require('express');
var router = express.Router();

var oStudent = require('../models/student');

/* GET home page. */
router.get('/', function (req, res) { 
    res.render('index', { title: 'Express' });
});

router.get('/AddStudent', function (req, res) { 
    res.render('AddStudent', { title: 'Express' });
});
router.post('/AddStudent', function (req, res) {
    oStudent.create(req.body).then(function (student) {
        res.send({message:"successfully saved",isSaved:true});
    });
});






router.get('/AllStudent', function (req, res) {
    //oStudent.find({}).then(function (students) {
    //    res.send(students);
    //});
    oStudent.find({}).then(function (students) {
        res.send(students);
    });
});
module.exports = router;
