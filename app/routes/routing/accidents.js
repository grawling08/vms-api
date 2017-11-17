'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var accidentCtrl = require('../../controllers/accidents').Accidents;
var accident = new accidentCtrl();

exports.createAccidents = (req, res) => {
    accident.createAccidents(req.body, cb.setupResponseCallback(res));
};

exports.getAllAccidents = (req, res) => {
    accident.getAllAccidents(cb.setupResponseCallback(res));
};

exports.getAccidentById = (req, res) => {
    accident.getAccidentById(req.params.id, cb.setupResponseCallback(res));
};

exports.deleteAccident = (req, res) => {
    accident.deleteAccident(req.params.id, cb.setupResponseCallback(res));
};

exports.updateAccident = (req, res) => {
    accident.updateAccident(req.params.id, req.body, cb.setupResponseCallback(res));
};