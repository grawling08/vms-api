'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var vehiclesCtrl = require('../../controllers/vehicles').Vehicles;
var vehicles = new vehiclesCtrl();

exports.createVehicle = (req, res) => {
    vehicles.createVehicle(req.body, cb.setupResponseCallback(res));
};

exports.getAllVehicles = (req, res) => {
    vehicles.getAllVehicles(cb.setupResponseCallback(res));
};

exports.getVehicle = (req, res) => {
    vehicles.getVehicle(req.params.id, cb.setupResponseCallback(res));
};

exports.deleteVehicle = (req, res) => {
    vehicles.deleteVehicle(req.params.id, cb.setupResponseCallback(res));
};

exports.updateVehicle = (req, res) => {
    vehicles.updateVehicle(req.params.id, req.body, cb.setupResponseCallback(res));
};