'use strict';

var accidentsDao = require('../daos/accidents');

var async = require('async');

function Accidents() {
    this.accidentsDao = accidentsDao;
}

Accidents.prototype.getAllAccidents = (next) => {
    accidentsDao.getAllAccidents((err, response) => {
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

Accidents.prototype.createAccidents = (data, next) => {
    async.waterfall([
        (callback) => {
            accidentsDao.createAccidents(data, function(err, response){
                next(null, {
                    success: true,
                    msg: 'Record successfully saved',
                    result: response
                });
            });
        }
    ], next);
};

Accidents.prototype.getAccidentById = (id, next) => {
    accidentsDao.getAccidentById(id, function(err, response){
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

Accidents.prototype.deleteAccident = (id, next) => {
    accidentsDao.deleteAccident(id,function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            msg: 'Accident succesfully deleted',
            result: response
        });
    });
};

Accidents.prototype.updateAccident = (id, data, next) => {
    async.waterfall([
        (callback) => {
            accidentsDao.updateAccident(id, data, function(err, response){
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

exports.Accidents = Accidents;
