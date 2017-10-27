'use strict';

var mysql = require('mysql');
var async = require('async');
var _ = require('lodash-node');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllRepairs = (next) => {
	var strSQL = mysql.format('SELECT a.*, b.vehicle, MD5(a.id) as _id, MD5(a.vehicle_id) as _idv FROM repairs AS a, vehicles AS b WHERE a.vehicle_id = b.id;');
	db.query(strSQL, next);
};

exports.createRepair = (repairs, next) => {
    var strSQL = mysql.format('INSERT INTO repairs(vehicle_id, repairType, description, repairsby, shop, date, comments) \
        VALUES(?,?,?,?,?,?,?)', [repairs.v_id, repairs.repairType, repairs.description, 
        repairs.repairby, repairs.shop, repairs.date, repairs.comments]);
    //console.log(strSQL);
	db.insertWithId(strSQL, next);
};

exports.getRepairsById = (id, next) => {
	var strSQL = mysql.format('SELECT a.*, b.vehicle, MD5(a.id) as _id, MD5(a.vehicle_id) as _idv FROM repairs AS a, vehicles AS b WHERE a.vehicle_id = b.id AND MD5(a.id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.getRepairsByVehicle = (v_id, next) => {
	var strSQL = mysql.format('SELECT a.*, b.vehicle, MD5(a.id) as _id, MD5(a.vehicle_id) as _idv FROM repairs AS a, vehicles AS b WHERE a.vehicle_id = b.id AND MD5(a.vehicle_id)=?', [v_id]);
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

exports.getRepairParts = (next) => {
	async.waterfall([
		(callback) => {
            var strSQL = mysql.format("SELECT a.id, a.repair_id, a.date, a.partNumber, a.description, a.vendor, a.vendorLocation, a.quantity, a.cost, a.total FROM partsused AS a INNER JOIN repairs AS b ON a.repair_id = b.id");
            db.query(strSQL, (err, repairparts) => {
                if (err) {
                    next(err, null);
                }
                callback(null, repairparts);
            });
        },
        (repairparts, callback) => {
            var strSQL = mysql.format("SELECT id AS repair_id, vehicle_id, repairType, description, repairby, shop, date, comments FROM repairs");
            db.query(strSQL, (err, repairs) => {
                if (err) {
                    next(err, null);
                }
                callback(null, repairparts, repairs);
            });
        },
        (repairpart, rprs, callback) => {
            _.each(rprs, (row) => {
                row.repairpart = _.filter(repairpart, { 'repair_id': row.repair_id }) || [];
            });
            callback(null, rprs);
        }
    ], next);
}