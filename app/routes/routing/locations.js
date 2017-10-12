'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var locationCtrl = require('../../controllers/locations').Locations;
var location = new locationCtrl();

exports.createLocations = (req, res) => {
    location.createLocations(req.body, cb.setupResponseCallback(res));
};

exports.getAllLocations = (req, res) => {
    location.getAllLocations(cb.setupResponseCallback(res));
};

exports.getLocationById = (req, res) => {
    location.getLocationById(req.params.id, cb.setupResponseCallback(res));
};

exports.deleteLocation = (req, res) => {
    location.deleteLocation(req.params.id, cb.setupResponseCallback(res));
};

exports.updateLocation = (req, res) => {
    location.updateLocation(req.params.id, req.body, cb.setupResponseCallback(res));
};