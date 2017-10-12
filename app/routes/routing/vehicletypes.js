'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var vTypeCtrl = require('../../controllers/vehicletypes').VehicleTypes;
var vtype = new vTypeCtrl();

exports.createVehicleTypes = (req, res) => {
    vtype.createVehicleTypes(req.body, cb.setupResponseCallback(res));
};

exports.getAllVehicleTypes = (req, res) => {
    vtype.getAllVehicleTypes(cb.setupResponseCallback(res));
};

exports.getVehicleTypesById = (req, res) => {
    vtype.getVehicleTypesById(req.params.id, cb.setupResponseCallback(res));
};

exports.deleteVehicleType = (req, res) => {
    vtype.deleteVehicleType(req.params.id, cb.setupResponseCallback(res));
};

exports.updateVehicleTypes = (req, res) => {
    vtype.updateVehicleType(req.params.id, req.body, cb.setupResponseCallback(res));
};