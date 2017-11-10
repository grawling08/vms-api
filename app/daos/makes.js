'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllMakes = (next) => {
	var strSQL = mysql.format('SELECT U.*, MD5(U.id) as _id FROM makes U;');
	db.query(strSQL, next);
};

exports.createMakes = (make, next) => {
    var strSQL = mysql.format('INSERT INTO makes(name) VALUES(?)', [make.name]);
    //console.log(strSQL);
	db.insertWithId(strSQL, next);
};

exports.checkMakeDuplicate = (name, next) => {
	var strSQL = mysql.format('SELECT * FROM makes WHERE name = ?', [name]);
	db.query(strSQL, next);
};

exports.checkMakeDuplicate2 = (_id, name, next) => {
	var strSQL = mysql.format('SELECT * FROM makes WHERE name = ? AND MD5(id) <> ?', [name, _id]);
	db.query(strSQL, next);
}

exports.getMakeById = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id FROM makes WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.deleteMake = (id, next) => {
	var strSQL = mysql.format('DELETE FROM makes WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updateMake = (id, make, next) => {
    var strSQL = mysql.format('UPDATE makes SET name=? WHERE MD5(id)=? ', [make.name, id]);
    //console.log(strSQL);
	db.actionQuery(strSQL, next);	
}
