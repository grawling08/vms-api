'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllVehicles = (next) => {
	var strSQL = mysql.format('SELECT U.*, MD5(U.id) as _id FROM vehicles U;');
	db.query(strSQL, next);
};

exports.createVehicle = (vehicles, next) => {
	var strSQL = mysql.format('INSERT INTO vehicles( \
			vehicle, make, model, plateno, type, color, \
			meter, cmileage, bmileage, basedate, photo, \
			department, location, driver, namereg, \
		) VALUES(?,?,?)', [
        vehicles.manufacturer, vehicles.model, vehicles.type
	]);
	db.insertWithId(strSQL, next);
};

// exports.checkUsernameDuplicate = (username, next) => {
// 	var strSQL = mysql.format('SELECT * FROM users WHERE username = ?', [username]);
// 	db.query(strSQL, next);
// };

// exports.checkUsernameDuplicate2 = (_id, username, next) => {
// 	var strSQL = mysql.format('SELECT * FROM users WHERE username = ? AND MD5(user_id) <> ?', [username, _id]);
// 	db.query(strSQL, next);
// }

exports.getVehicle = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id  FROM vehicles WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.deleteVehicle = (id, next) => {
	var strSQL = mysql.format('DELETE FROM vehicles WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updateVehicle = (id, vehicles, next) => {
	var strSQL = mysql.format('UPDATE vehicles SET manufacturer=?, model=?, type=? WHERE MD5(id)=? LIMIT 1', [
		vehicles.manufacturer, vehicles.model, vehicles.type, id
	]);
	db.actionQuery(strSQL, next);	
}
