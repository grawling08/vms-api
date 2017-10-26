'use strict';

var PartsDao = require('../daos/Parts');

var async = require('async');

function Parts() {
    this.PartsDao = PartsDao;
}

Parts.prototype.getAllParts = (next) => {
    PartsDao.getAllParts((err, response) => {
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

Parts.prototype.createPart = (data, next) => {
    async.waterfall([
        (callback) => {
            PartsDao.createPart(data, function(err, response){
                console.log(data);
                next(null, {
                    success: true,
                    msg: 'Record successfully saved',
                    result: response
                });
            });
        }
    ], next);
};

Parts.prototype.getPartsById = (id, next) => {
    PartsDao.getPartsById(id, function(err, response){
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

Parts.prototype.getPartsByRepair = (r_id, next) => {
    PartsDao.getPartsByRepair(r_id, function(err, response){
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

Parts.prototype.deletePart = (id, next) => {
    PartsDao.deletePart(id,function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            msg: 'Repair succesfully deleted',
            result: response
        });
    });
};

Parts.prototype.updatePart = (id, data, next) => {
    async.waterfall([
        (callback) => {
            PartsDao.updatePart(id, data, function(err, response){
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

exports.Parts = Parts;
