'use strict';

var modelsDao = require('../daos/models');

var async = require('async');

function Models() {
    this.modelsDao = modelsDao;
}

Models.prototype.getAllModels = (next) => {
    modelsDao.getAllModels((err, response) => {
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            message: '',
            result: response
        });
    });
};

Models.prototype.createModels = (data, next) => {
    async.waterfall([
        (callback) => {
            modelsDao.checkModelDuplicate(data.name, (err, response) => {
                if (err) {
                    next({
                        success: false,
                        msg: err,
                        result: err
                    },null);
                }
                if (response && response.length > 0){
                    next(null,{
                        success: false,
                        msg: 'Model already existed',
                        result: null
                    });
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            modelsDao.createModels(data, function(err, response){
                next(null, {
                    success: true,
                    msg: 'Record successfully saved',
                    result: response
                });
            });
        }
    ], next);
};

Models.prototype.getModelById = (id, next) => {
    modelsDao.getModelById(id, function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        if (response && response.length > 0){
            response = response[0];
        }
        next(null,{
            success: true,
            message: '',
            result: response
        });			
    });
};

Models.prototype.getModelByMake = (id, next) => {
    modelsDao.getModelByMake(id, (err, response) => {
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            message: '',
            result: response
        });
    });
};

Models.prototype.deleteModel = (id, next) => {
    modelsDao.deleteModel(id,function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            msg: 'Model succesfully deleted',
            result: response
        });
    });
};

Models.prototype.updateModel = (id, data, next) => {
    async.waterfall([
        (callback) => {
            modelsDao.checkModelDuplicate2(id, data.name, (err, response) => {
                if (err) {
                    next({
                        success: false,
                        msg: err,
                        result: err
                    }, null);
                }
                if (response && response.length > 0){
                    next({
                        success: false,
                        msg: 'Model already existed',
                        result: null
                    }, null);
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            modelsDao.updateModel(id, data, function(err, response){
                if (err) {
                    next({
                        success: false,
                        msg: err,
                        result: err
                    }, null);
                }
                next(null,{
                    success: true,
                    msg: 'Record successfully updated',
                    result: response
                });
            });
        }
    ], next);
};

exports.Models = Models;
