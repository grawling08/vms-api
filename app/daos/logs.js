'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllLogs= (next) => {
	var strSQL = mysql.format('SELECT U.*, MD5(U.id) as _id FROM logs U;');
	db.query(strSQL, next);
};

exports.createLogs = (logs, next) => {
    var strSQL = mysql.format('INSERT INTO logs(vehicle_id, updatedBy, date, remarks) \
        VALUES(?,?,?,?)', [logs.vehicle_id, logs.updatedBy, logs.date, logs.remarks]);
    //console.log(strSQL);
	db.insertWithId(strSQL, next);
};

exports.getLogById = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id  FROM logs WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};