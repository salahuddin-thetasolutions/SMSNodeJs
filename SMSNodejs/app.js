﻿'use strict';
var debug = require('debug');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mailer = require('express-mailer');
var session = require('express-session');
var passport = require('passport');
require('./helpers/passport')(passport);
var routes = require('./routes/index');
var users = require('./routes/users');
var auth = require('./routes/auth')(passport);
var app = express();

//........Database Connection.......
//Import the mongoose module
var mongoose = require('mongoose');
var mongoDB = 'mongodb://localhost/sms1';
mongoose.connect(mongoDB);
// Get Mongoose to use the global promise library
mongoose.Promise = global.Promise;
//......End Database Connection..........
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
mailer.extend(app, {
    from: 'thetasolutions.co.uk',
    host: 'smtp.gmail.com', // hostname
    secureConnection: true, // use SSL
    port: 465, // port for secure SMTP
    transportMethod: 'SMTP', // default is SMTP. Accepts anything that nodemailer accepts
    auth: {
        user: 'youremail',
        pass: 'yourpassword'
    }
});
// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads')));
app.use(session({
    secret: 'thesecret',
    saveUninitialized: false,
    resave: false
}))

app.use(passport.initialize())
app.use(passport.session())
app.use('/', routes);
app.use('/users', users);
app.use('/auth', auth);
// catch 404 and forward to error handler
app.use(function (err, req, res, next) {
    res.status(422).send({ error: err.message });
    res.status(402).send({ error: err.message });
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

app.set('port', process.env.PORT || 3000);

var server = app.listen(app.get('port'), function () {
    debug('Express server listening on port ' + server.address().port);
});
