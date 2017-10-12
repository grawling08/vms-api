'use strict';

var vehicletypesDao = require('../daos/vehicletypes');

var async = require('async');

function VehicleTypes() {
    this.vehicletypesDao = vehicletypesDao;
}

VehicleTypes.prototype.getAllVehicleTypes = (next) => {
    vehicletypesDao.getAllVehicleTypes((err, response) => {
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

VehicleTypes.prototype.createVehicleTypes = (data, next) => {
    async.waterfall([
        (callback) => {
            vehicletypesDao.checkVehicleTypeDuplicate(data.name, (err, response) => {
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
                        msg: 'Vehicle type already existed',
                        result: null
                    });
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            vehicletypesDao.createVehicleTypes(data, function(err, response){
                next(null, {
                    success: true,
                    msg: 'Record successfully saved',
                    result: response
                });
            });
        }
    ], next);
};

VehicleTypes.prototype.getVehicleTypesById = (id, next) => {
    vehicletypesDao.getVehicleTypesById(id, function(err, response){
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

VehicleTypes.prototype.deleteVehicleType = (id, next) => {
    vehicletypesDao.deleteVehicleType(id,function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            msg: 'Vehicle type succesfully deleted',
            result: response
        });
    });
};

VehicleTypes.prototype.updateVehicleType = (id, data, next) => {
    async.waterfall([
        (callback) => {
            vehicletypesDao.checkVehicleTypeDuplicate2(id, data.name, (err, response) => {
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
                        msg: 'Vehicle type already existed',
                        result: null
                    }, null);
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            vehicletypesDao.updateVehicleType(id, data, function(err, response){
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

exports.VehicleTypes = VehicleTypes;
