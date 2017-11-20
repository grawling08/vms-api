'use strict';

var jwt = require('jsonwebtoken');
var ejwt = require('express-jwt');
var cb = require('./../../utils/callback');

var env = process.env.NODE_ENV || 'development';
var config = require('../../../config/environment/' + env);

var modelCtrl = require('../../controllers/models').Models;
var model = new modelCtrl();

exports.createModels = (req, res) => {
    model.createModels(req.body, cb.setupResponseCallback(res));
};

exports.getAllModels = (req, res) => {
    model.getAllModels(cb.setupResponseCallback(res));
};

exports.getModelById = (req, res) => {
    model.getModelById(req.params.id, cb.setupResponseCallback(res));
};

exports.getModelByMake = (req, res) => {
    model.getModelByMake(req.params.id, cb.setupResponseCallback(res));
};

exports.deleteModel = (req, res) => {
    model.deleteModel(req.params.id, cb.setupResponseCallback(res));
};

exports.updateModel = (req, res) => {
    model.updateModel(req.params.id, req.body, cb.setupResponseCallback(res));
};