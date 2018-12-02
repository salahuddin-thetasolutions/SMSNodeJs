'use strict';
var express = require('express');
var router = express.Router();
var multer = require('multer');
var path = require('path');
const mime = require('mime');
var mailer = require('express-mailer');
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
//for request authentication
var loggedin = function (req, res, next) {
    if (req.isAuthenticated()) {
        next()
    } else {
        res.redirect('/login')
    }
}
/* GET home page. */
router.get('/', function (req, res) {
    
    res.mailer.send('email', {
        to: 'salahudinhafiz@gmail.com', // REQUIRED. This can be a comma delimited string just like a normal email to field. 
        subject: 'My First Email', // REQUIRED.
        myVar: 'My email content........', // All additional properties are also passed to the template as local variables.
        myVar2: 'My email content2........' // All additional properties are also passed to the template as local variables.
    }, function (err) {
        if (err) {
            // handle error
            console.log(err);
            
            return;
        }
        res.render('index', { title: 'Express' });
    });
    
});

router.get('/AddStudent',loggedin, function (req, res) {
    var _uid = req.session.passport.user.id;
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

router.get('/login', function (req, res, next) {
    res.render('login');
});


router.get('/signup', function (req, res, next) {
    res.render('signup');
});



router.get('/logout', function (req, res) {
    req.logout();
    res.redirect('/')
})



module.exports = router;
