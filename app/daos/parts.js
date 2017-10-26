'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllParts = (next) => {
	var strSQL = mysql.format('SELECT a.*, MD5(a.id) as _id, MD5(a.repair_id) as _idr FROM partsused AS a');
	db.query(strSQL, next);
};

exports.createPart = (parts, next) => {
    var strSQL = mysql.format('INSERT INTO partsused(repair_id, date, partNumber, description, quantity, vendor, vendorLocation, cost, total) \
        VALUES(?,?,?,?,?,?,?,?,?)', [parts.repair_id, parts.date, parts.partNumber, parts.description, 
        parts.quantity, parts.vendor, parts.vendorLocation, parts.cost, parts.total]);
    //console.log(strSQL);
	db.insertWithId(strSQL, next);
};

exports.getPartsById = (id, next) => {
	var strSQL = mysql.format('SELECT a.*, MD5(a.id) as _id, MD5(a.repair_id) as _idr FROM partsused AS a WHERE MD5(a.id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.getPartsByRepair = (r_id, next) => {
	var strSQL = mysql.format('SELECT a.*, MD5(a.id) as _id, MD5(a.repair_id) as _idr FROM partsused AS a WHERE MD5(a.repair_id)=?', [r_id]);
	db.query(strSQL, next);	
};

exports.deletePart = (id, next) => {
	var strSQL = mysql.format('DELETE FROM partsused WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updatePart = (id, parts, next) => {
    var strSQL = mysql.format('UPDATE Parts SET repair_id=?, date=?, partNumber=?, description=?, quantity=?, vendor=?, vendorLocation=?, cost=?, total=?  \
        WHERE MD5(id)=? ', [parts.repair_id, parts.date, parts.partNumber, parts.description, 
        parts.quantity, parts.vendor, parts.vendorLocation, parts.cost, parts.total, id]);
    //console.log(strSQL);
	db.actionQuery(strSQL, next);	
}
