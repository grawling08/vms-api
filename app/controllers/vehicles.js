'use strict';

var vehiclesDao = require('../daos/vehicles');

var async = require('async');

function Vehicles() {
    this.vehiclesDao = vehiclesDao;
}

Vehicles.prototype.getAllVehicles = (next) => {
    vehiclesDao.getAllVehicles((err, response) => {
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

Vehicles.prototype.createVehicle = (data, next) => {
    async.waterfall([
        (callback) => {
            vehiclesDao.checkVehicleDuplicate(data.year, data.make, data.model, data.plateno, (err, response) => {
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
                        msg: 'Vehicle already existed',
                        result: null
                    });
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            vehiclesDao.createVehicle(data, function(err, response){
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

Vehicles.prototype.getVehicle = (id, next) => {
    vehiclesDao.getVehicle(id, function(err, response){
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

Vehicles.prototype.deleteVehicle = (id, next) => {
    vehiclesDao.deleteVehicle(id,function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            msg: 'Vehicle succesfully deleted',
            result: response
        });
    });
};

Vehicles.prototype.updateVehicle = (id, data, next) => {
    async.waterfall([
        (callback) => {
            vehiclesDao.updateVehicle(id, data, function(err, response){
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

exports.Vehicles = Vehicles;
