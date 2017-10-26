'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var partsCtrl = require('../../controllers/parts').Parts;
var parts = new partsCtrl();

exports.createPart = (req, res) => {
    parts.createPart(req.body, cb.setupResponseCallback(res));
};

exports.getAllParts = (req, res) => {
    parts.getAllParts(cb.setupResponseCallback(res));
};

exports.getPartsById = (req, res) => {
    parts.getPartsById(req.params.id, cb.setupResponseCallback(res));
};

exports.getPartsByRepair = (req, res) => {
    parts.getPartsByRepair(req.params.r_id, cb.setupResponseCallback(res));
};

exports.deletePart = (req, res) => {
    parts.deletePart(req.params.id, cb.setupResponseCallback(res));
};

exports.updatePart = (req, res) => {
    parts.updatePart(req.params.id, req.body, cb.setupResponseCallback(res));
};