'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var repairsCtrl = require('../../controllers/repairs').Repairs;
var repairs = new repairsCtrl();

exports.createRepair = (req, res) => {
    repairs.createRepair(req.body, cb.setupResponseCallback(res));
};

exports.getAllRepairs = (req, res) => {
    repairs.getAllRepairs(cb.setupResponseCallback(res));
};

exports.getRepairsByVehicle = (req, res) => {
    repairs.getRepairsByVehicle(req.params.id, cb.setupResponseCallback(res));
};

exports.deleteRepair = (req, res) => {
    repairs.deleteRepair(req.params.id, cb.setupResponseCallback(res));
};

exports.updateRepair = (req, res) => {
    repairs.updateRepair(req.params.id, req.body, cb.setupResponseCallback(res));
};