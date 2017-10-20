'use strict';

var travelsDao = require('../daos/travels');

var async = require('async');

function Travels() {
    this.travelsDao = travelsDao;
}

Travels.prototype.getAllTravels = (next) => {
    travelsDao.getAllTravels((err, response) => {
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

Travels.prototype.createTravels = (data, next) => {
    async.waterfall([
        (callback) => {
            travelsDao.createTravels(data, function(err, response){
                next(null, {
                    success: true,
                    msg: 'Record successfully saved',
                    result: response
                });
            });
        }
    ], next);
};

Travels.prototype.getTravelById = (id, next) => {
    travelsDao.getTravelById(id, function(err, response){
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

Travels.prototype.getTravelsByVehicle = (v_id, next) => {
    travelsDao.getTravelsByVehicle(v_id, function(err, response){
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

Travels.prototype.deleteTravel = (id, next) => {
    travelsDao.deleteTravel(id,function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            msg: 'Travel succesfully deleted',
            result: response
        });
    });
};

Travels.prototype.updateTravel = (id, data, next) => {
    async.waterfall([
        (callback) => {
            travelsDao.updateTravel(id, data, function(err, response){
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

exports.Travels = Travels;
