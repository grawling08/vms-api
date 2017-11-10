'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var makeCtrl = require('../../controllers/makes').Makes;
var make = new makeCtrl();

exports.createMakes = (req, res) => {
    make.createMakes(req.body, cb.setupResponseCallback(res));
};

exports.getAllMakes = (req, res) => {
    make.getAllMakes(cb.setupResponseCallback(res));
};

exports.getMakeById = (req, res) => {
    make.getMakeById(req.params.id, cb.setupResponseCallback(res));
};

exports.deleteMake = (req, res) => {
    make.deleteMake(req.params.id, cb.setupResponseCallback(res));
};

exports.updateMake = (req, res) => {
    make.updateMake(req.params.id, req.body, cb.setupResponseCallback(res));
};