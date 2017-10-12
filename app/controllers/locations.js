'use strict';

var locationsDao = require('../daos/locations');

var async = require('async');

function Locations() {
    this.locationsDao = locationsDao;
}

Locations.prototype.getAllLocations = (next) => {
    locationsDao.getAllLocations((err, response) => {
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

Locations.prototype.createLocations = (data, next) => {
    async.waterfall([
        (callback) => {
            locationsDao.checkLocationDuplicate(data.name, (err, response) => {
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
                        msg: 'Location already existed',
                        result: null
                    });
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            locationsDao.createLocations(data, function(err, response){
                next(null, {
                    success: true,
                    msg: 'Record successfully saved',
                    result: response
                });
            });
        }
    ], next);
};

Locations.prototype.getLocationById = (id, next) => {
    locationsDao.getLocationById(id, function(err, response){
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

Locations.prototype.deleteLocation = (id, next) => {
    locationsDao.deleteLocation(id,function(err, response){
        if (err) {
            next({
                success: false,
                msg: err,
                result: err
            }, null);
        }
        next(null,{
            success: true,
            msg: 'Location succesfully deleted',
            result: response
        });
    });
};

Locations.prototype.updateLocation = (id, data, next) => {
    async.waterfall([
        (callback) => {
            locationsDao.checkLocationDuplicate2(id, data.name, (err, response) => {
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
                        msg: 'Location already existed',
                        result: null
                    }, null);
                    return;
                } else {
                    callback();
                }
            });
        }, (callback) => {
            locationsDao.updateLocation(id, data, function(err, response){
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

exports.Locations = Locations;
