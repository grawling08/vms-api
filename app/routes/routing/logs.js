'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var logsCtrl = require('../../controllers/logs').Logs;
var logs = new logsCtrl();

exports.createLogs = (req, res) => {
    repairs.createLogs(req.body, cb.setupResponseCallback(res));
};

exports.getAllLogs = (req, res) => {
    repairs.getAllLogs(cb.setupResponseCallback(res));
};

exports.getLogById = (req, res) => {
    repairs.getLogById(req.params.id, cb.setupResponseCallback(res));
};
