'use strict';

var repairsDao = require('../daos/repairs');

var async = require('async');

function Repairs() {
    this.repairsDao = repairsDao;
}

Repairs.prototype.getAllRepairs = (next) => {
    repairsDao.getAllRepairs((err, response) => {
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

Repairs.prototype.getRepairParts = (next) => {
    repairsDao.getRepairParts((err, response) => {
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

Repairs.prototype.createRepair = (data, next) => {
    async.waterfall([
        (callback) => {
            repairsDao.createRepair(data, function(err, response){
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

Repairs.prototype.getRepairsById = (id, next) => {
    repairsDao.getRepairsById(id, function(err, response){
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

Repairs.prototype.getRepairsByVehicle = (v_id, next) => {
    repairsDao.getRepairsByVehicle(v_id, function(err, response){
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

Repairs.prototype.deleteRepair = (id, next) => {
    repairsDao.deleteRepair(id,function(err, response){
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

Repairs.prototype.updateRepair = (id, data, next) => {
    async.waterfall([
        (callback) => {
            repairsDao.updateRepair(id, data, function(err, response){
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

exports.Repairs = Repairs;
