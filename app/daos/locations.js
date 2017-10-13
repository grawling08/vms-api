'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllLocations = (next) => {
	var strSQL = mysql.format('SELECT U.*, MD5(U.id) as _id FROM locations U;');
	db.query(strSQL, next);
};

exports.createLocations = (location, next) => {
    var strSQL = mysql.format('INSERT INTO locations(name, abbrev) VALUES(?,?)', [location.name, location.abbrev]);
    //console.log(strSQL);
	db.insertWithId(strSQL, next);
};

exports.checkLocationDuplicate = (name, next) => {
	var strSQL = mysql.format('SELECT * FROM locations WHERE name = ?', [name]);
	db.query(strSQL, next);
};

exports.checkLocationDuplicate2 = (_id, name, next) => {
	var strSQL = mysql.format('SELECT * FROM locations WHERE name = ? AND MD5(id) <> ?', [name, _id]);
	db.query(strSQL, next);
}

exports.getLocationById = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id FROM locations WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.deleteLocation = (id, next) => {
	var strSQL = mysql.format('DELETE FROM locations WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updateLocation = (id, location, next) => {
    var strSQL = mysql.format('UPDATE locations SET name=?, abbrev=? WHERE MD5(id)=? ', [location.name, location.abbrev, id]);
    //console.log(strSQL);
	db.actionQuery(strSQL, next);	
}
