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
			vehicle, year, make, model, plateno, type, color, \
			meter, cmileage, bmileage, basedate, photo, \
			department, location, driver, namereg, assto, \
			weight, length, height, wheelbase, axles, fronttire, reartire, \
			oilfilter, airfilter, chassis, enginesize, enginenum, cylinders, \
			transmission, fuel, headlamp, sparkplug, battery, dealer, \
			datepurchased, mileage, price, comments  \
		) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', [
		vehicles.year + " " + vehicles.make + " " + vehicles.model + " " + vehicles.plateno,
		vehicles.year, vehicles.make, vehicles.model, vehicles.plateno, 
		vehicles.type, vehicles.color, vehicles.meter, vehicles.cmileage,
		vehicles.bmileage, vehicles.basedate, vehicles.photo, vehicles.department,
		vehicles.location, vehicles.driver, vehicles.namereg, vehicles.assto,
		vehicles.weight, vehicles.length, vehicles.height, vehicles.wheelbase, vehicles.axles, vehicles.fronttire, vehicles.reartire,
		vehicles.oilfilter, vehicles.airfilter, vehicles.chassis, vehicles.enginesize, vehicles.enginenum, vehicles.cylinders,
		vehicles.transmission, vehicles.fuel, vehicles.headlamp, vehicles.sparkplug, vehicles.battery, vehicles.dealer,
		vehicles.datepurchased, vehicles.mileage, vehicles.price, vehicles.comments
	]);
	db.insertWithId(strSQL, next);
};

exports.checkVehicleDuplicate = (year, make, model, plateno, next) => {
	var strSQL = mysql.format('SELECT * FROM vehicles WHERE year = ? AND make = ? AND model = ? AND plateno = ?', [
		year, make, model, plateno]);
	db.query(strSQL, next);
};

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
	var strSQL = mysql.format('UPDATE vehicles SET \
		vehicle=?, year=?, make=?, model=?, plateno=?, type=?, color=?, \
		meter=?, cmileage=?, bmileage=?, basedate=?, photo=?, \
		department=?, location=?, driver=?, namereg=?, assto=?, \
		weight=?, length=?, height=?, wheelbase=?, axles=?, fronttire=?, reartire=?, \
		oilfilter=?, airfilter=?, chassis=?, enginesize=?, enginenum=?, cylinders=?, \
		transmission=?, fuel=?, headlamp=?, sparkplug=?, battery=?, dealer=?, \
		datepurchased=?, mileage=?, price=?, comments=?  \
		WHERE MD5(id)=? ', [
		vehicles.year + " " + vehicles.make + " " + vehicles.model + " " + vehicles.plateno,
		vehicles.year, vehicles.make, vehicles.model, vehicles.plateno, 
		vehicles.type, vehicles.color, vehicles.meter, vehicles.cmileage,
		vehicles.bmileage, vehicles.basedate, vehicles.photo, vehicles.department,
		vehicles.location, vehicles.driver, vehicles.namereg, vehicles.assto,
		vehicles.weight, vehicles.length, vehicles.height, vehicles.wheelbase, vehicles.axles, vehicles.fronttire, vehicles.reartire,
		vehicles.oilfilter, vehicles.airfilter, vehicles.chassis, vehicles.enginesize, vehicles.enginenum, vehicles.cylinders,
		vehicles.transmission, vehicles.fuel, vehicles.headlamp, vehicles.sparkplug, vehicles.battery, vehicles.dealer,
		vehicles.datepurchased, vehicles.mileage, vehicles.price, vehicles.comments, id
	]);
	db.actionQuery(strSQL, next);	
}
