'use strict';
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const mime = require('mime');

//var upload = multer({ dest:"./uploads/" });
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/')
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)) //Appending extension
    }
});
var upload = multer({ storage: storage });

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
router.post('/AddStudent', upload.single('image'), function (req, res) {
    req.body.image = req.file.filename;
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
router.get('/download', function (req, res) {
    var file = __dirname+"/uploads/" + req.query.filename;
    res.download(file); // Set disposition and send it.
});





module.exports = router;
