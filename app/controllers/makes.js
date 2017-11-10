'use strict';

var makesDao = require('../daos/makes');

var async = require('async');

function Makes() {
    this.makesDao = makesDao;
}

Makes.prototype.getAllMakes = (next) => {
    makesDao.getAllMakes((err, response) => {
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

Makes.prototype.createMakes = (data, next) => {
    async.waterfall([
        (callback) => {
            makesDao.checkMakeDuplicate(data.name, (err, response) => {
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
                        msg: 'Make already existed',
                        result: null
                    });
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            makesDao.createMakes(data, function(err, response){
                next(null, {
                    success: true,
                    msg: 'Record successfully saved',
                    result: response
                });
            });
        }
    ], next);
};

Makes.prototype.getMakeById = (id, next) => {
    makesDao.getMakeById(id, function(err, response){
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

Makes.prototype.deleteMake = (id, next) => {
    makesDao.deleteMake(id,function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            msg: 'Make succesfully deleted',
            result: response
        });
    });
};

Makes.prototype.updateMake = (id, data, next) => {
    async.waterfall([
        (callback) => {
            makesDao.checkMakeDuplicate2(id, data.name, (err, response) => {
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
                        msg: 'Make already existed',
                        result: null
                    }, null);
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            makesDao.updateMake(id, data, function(err, response){
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

exports.Makes = Makes;
