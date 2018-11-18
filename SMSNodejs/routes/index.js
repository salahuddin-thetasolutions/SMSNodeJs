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
router.get('/GetAllStudens', function (req, res) {
    oStudent.find({}).then(function (students) {
        res.render('GetAllStudens', { students });
    });
});
//Api
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

router.post('/DeleteStudent', function (req, res) {
    oStudent.findByIdAndRemove({ _id: req.body.id }).then(function () {
        res.send({ message: "successfully removed", isremoved: true });
    });
});
router.post('/UpdateStudent', function (req, res) {
    oStudent.findByIdAndUpdate(req.body.id, req.body).then(function () {
        res.send({ message: "successfully updated", isupdated: true });
    });
});






module.exports = router;
