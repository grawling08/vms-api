'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllTravels= (next) => {
	var strSQL = mysql.format('SELECT T.*, MD5(T.id) as _id, MD5(T.vehicle_id) as v_id, V.vehicle FROM travels T \
						INNER JOIN vehicles V ON T.vehicle_id = V.id;');
	db.query(strSQL, next);
};

exports.createTravels = (travel, next) => {
    var strSQL = mysql.format('INSERT INTO travels(vehicle_id, driver, departure, arrival, destination, passengers, remarks) \
        VALUES(?,?,?,?,?,?,?)', [travel.vehicle_id, travel.driver, travel.departure, travel.arrival, travel.destination, travel.passengers, travel.remarks]);
    //console.log(strSQL);
	db.insertWithId(strSQL, next);
};

exports.getTravelById = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id FROM travels WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.getTravelsByVehicle = (v_id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id FROM travels WHERE MD5(vehicle_id)=?', [v_id]);
	db.query(strSQL, next);	
};

exports.deleteTravel = (id, next) => {
	var strSQL = mysql.format('DELETE FROM travels WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updateTravel = (id, travel, next) => {
    var strSQL = mysql.format('UPDATE travels SET vehicle_id=?, driver=?, departure=?, arrival=?, destination=?, passengers=?, remarks=? \
        WHERE MD5(id)=? ', [travel.vehicle_id, travel.driver, travel.departure, travel.arrival, travel.destination, travel.passengers, travel.remarks, id]);
    //console.log(strSQL);
	db.actionQuery(strSQL, next);	
}
