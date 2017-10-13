'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllRepairs = (next) => {
	var strSQL = mysql.format('SELECT U.*, MD5(U.id) as _id, MD5(v_id) as _idv FROM repairs U;');
	db.query(strSQL, next);
};

exports.createRepair = (repairs, next) => {
    var strSQL = mysql.format('INSERT INTO repairs(v_id, repairType, description, repairsby, shop, date, comments) \
        VALUES(?,?,?,?,?,?,?)', [repairs.v_id, repairs.repairType, repairs.description, 
        repairs.repairby, repairs.shop, repairs.date, repairs.comments]);
    //console.log(strSQL);
	db.insertWithId(strSQL, next);
};

exports.getRepairsById = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id, MD5(v_id) as _idv FROM repairs WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.getRepairsByVehicle = (v_id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id, MD5(v_id) as _idv  FROM repairs WHERE MD5(v_id)=?', [v_id]);
	db.query(strSQL, next);	
};

exports.deleteRepair = (id, next) => {
	var strSQL = mysql.format('DELETE FROM repairs WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updateRepair = (id, repairs, next) => {
    var strSQL = mysql.format('UPDATE repairs SET repairType=?, description=?, repairby=?, shop=?, date=?, comments=?  \
        WHERE MD5(id)=? ', [repairs.repairType, repairs.description, 
        repairs.repairby, repairs.shop, repairs.date, repairs.comments, id]);
    //console.log(strSQL);
	db.actionQuery(strSQL, next);	
}
