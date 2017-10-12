'use strict';

var logsDao = require('../daos/logs');

var async = require('async');

function Logs() {
    this.logsDao = logsDao;
}

Logs.prototype.getAllLogs = (next) => {
    logsDao.getAllLogs((err, response) => {
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

Logs.prototype.createLogs = (data, next) => {
    async.waterfall([
        (callback) => {
            logsDao.createLogs(data, function(err, response){
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

Logs.prototype.getLogById = (id, next) => {
    logsDao.getLogById(id, function(err, response){
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


exports.Logs = Logs;
