'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var travelCtrl = require('../../controllers/travels').Travels;
var travel = new travelCtrl();

exports.createTravels = (req, res) => {
    travel.createTravels(req.body, cb.setupResponseCallback(res));
};

exports.getAllTravels = (req, res) => {
    travel.getAllTravels(cb.setupResponseCallback(res));
};

exports.getTravelById = (req, res) => {
    travel.getTravelById(req.params.id, cb.setupResponseCallback(res));
};

exports.getTravelsByVehicle = (req, res) => {
    travel.getTravelsByVehicle(req.params.id, req.params.v_id, cb.setupResponseCallback(res));
};

exports.deleteTravel = (req, res) => {
    travel.deleteTravel(req.params.id, cb.setupResponseCallback(res));
};

exports.updateTravel = (req, res) => {
    travel.updateTravel(req.params.id, req.body, cb.setupResponseCallback(res));
};