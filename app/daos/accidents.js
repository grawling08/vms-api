'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllAccidents = (next) => {
	var strSQL = mysql.format('SELECT U.*, MD5(U.id) as _id, V.vehicle FROM accidents U INNER JOIN vehicles V ON U.vehicle_id = V.id');
	db.query(strSQL, next);
};

exports.createAccidents = (accident, next) => {
    var strSQL = mysql.format('INSERT INTO accidents(vehicle_id, driver, description, accidentdate, recorddate, remarks) \
    	VALUES(?,?,?,?,?,?)', [accident.vehicle_id, accident.driver, accident.description, accident.accidentdate, accident.recorddate, accident.remarks]);
	db.insertWithId(strSQL, next);
};

exports.getAccidentById = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id FROM accidents WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.getAccidentByVehicle = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id FROM accidents WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.deleteAccident = (id, next) => {
	var strSQL = mysql.format('DELETE FROM accidents WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updateAccident = (id, accident, next) => {
    var strSQL = mysql.format('UPDATE accidents SET vehicle_id=?, driver=?, description=?, accidentdate=?, recorddate=?, remarks=? \
    	WHERE MD5(id)=? ', [accident.vehicle_id, accident.driver, accident.description, accident.accidentdate, accident.recorddate, accident.remarks, id]);
	db.actionQuery(strSQL, next);	
}
