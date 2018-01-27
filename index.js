'use strict';

process.env.TZ = 'UTC';

require('./config/env')();
var env = process.env.NODE_ENV || 'development';
process.env.NODE_ENV = env;


var application = require('./config/application'),
    express = require('express'),
    bunyan = require('bunyan'),
    mysql = require('mysql'),
    passport = require('passport'),
    ejwt = require('express-jwt'),
    jwt = require('jsonwebtoken'),
    cron = require('node-cron'),
    middleware = require('./app/utils/middleware'),
    config = require('./config/environment/' + env),
    Database = require('./app/utils/database').Database,
    db = new Database(mysql, config),
    nodemailer = require('nodemailer'),
    log = bunyan.createLogger({
        name: 'VMS'
    }),
    http = require('http'),
    app = express(),
    server = http.createServer(app);

var router = express.Router({
    strict: true,
    caseSensitive: true
});

// NODEMAILER
// Generate SMTP service account from ethereal.email
nodemailer.createTestAccount((err, account) => {
    if (err) {
        console.error('Failed to create a testing account. ' + err.message);
        return process.exit(1);
    }

    console.log('Credentials obtained, sending message...');

    // Create a SMTP transporter object
    let transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
            user: 'r3rmxx5wypgcpj24@ethereal.email',
            pass: 'gD2hb1KwmtDtGN7EwE'
        }
    });

    // Message object
    let message = {
        from: 'Sender Name <sender@example.com>',
        to: 'Recipient <grawling08@gmail.com>',
        subject: 'Nodemailer is unicode friendly ✔',
        text: 'Hello to myself!',
        html: '<p><b>Hello</b> to myself!</p>'
    };

    cron.schedule('* * * * *', function(){
        console.log('running a task every minute');
        transporter.sendMail(message, (err, info) => {
            if (err) {
                console.log('Error occurred. ' + err.message);
                return process.exit(1);
            }

            console.log('Message sent: %s', info.messageId);
            // Preview only available when sending through an Ethereal account
            console.log('Preview URL: %s', nodemailer.getTestMessageUrl(info));
        });
    });
});
 
// cron.schedule('* * * * *', function(){
//   console.log('running a task every minute');
// });

require(application.utils + 'helper')(db, server, config, log);
require(application.config + 'express')(app, config, passport, ejwt);
require(application.config + 'passport')(passport, jwt, config);
require(application.config + 'authentication')(app, config, ejwt);
// Routes
require(application.routes + 'documents')(app, middleware);
require(application.routes + '/')(app, config, middleware, passport);

module.exports = app;
