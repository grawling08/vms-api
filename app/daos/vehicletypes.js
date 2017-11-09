'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllVehicleTypes = (next) => {
	var strSQL = mysql.format('SELECT U.*, MD5(U.id) as _id FROM vehicletype U;');
	db.query(strSQL, next);
};

exports.createVehicleTypes = (vtype, next) => {
    var strSQL = mysql.format('INSERT INTO vehicletype(name) VALUES(?)', [vtype.name]);
    //console.log(strSQL);
	db.insertWithId(strSQL, next);
};

exports.checkVehicleTypeDuplicate = (name, next) => {
	var strSQL = mysql.format('SELECT * FROM vehicletype WHERE name = ?', [name]);
	db.query(strSQL, next);
};

exports.checkVehicleTypeDuplicate2 = (_id, name, next) => {
	var strSQL = mysql.format('SELECT * FROM vehicletype WHERE name = ? AND MD5(id) <> ?', [name, _id]);
	db.query(strSQL, next);
}

exports.getVehicleTypesById = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id FROM vehicletype WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.deleteRepairVehicleType = (id, next) => {
	var strSQL = mysql.format('DELETE FROM vehicletype WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updateVehicleType = (id, vtype, next) => {
    var strSQL = mysql.format('UPDATE vehicletype SET name=? WHERE MD5(id)=? ', [vtype.name, id]);
    //console.log(strSQL);
	db.actionQuery(strSQL, next);	
}
