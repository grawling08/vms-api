'use strict';

var mysql = require('mysql');
var Database = require('../../app/utils/database').Database;
var db = new Database();

exports.getAllModels = (next) => {
	var strSQL = mysql.format('SELECT U.*, MD5(U.id) as _id, V.name as "vehicletype", M.name as "make" FROM models U \
								INNER JOIN vehicletype V ON U.vehicletype_id = V.id \
								INNER JOIN makes M ON U.make_id = M.id');
	db.query(strSQL, next);
};

exports.createModels = (model, next) => {
    var strSQL = mysql.format('INSERT INTO models(make_id, vehicletype_id, name) VALUES(?,?,?)', [model.make_id, model.vehicletype_id, model.name]);
	db.insertWithId(strSQL, next);
};

exports.checkModelDuplicate = (name, next) => {
	var strSQL = mysql.format('SELECT * FROM models WHERE name = ?', [name]);
	db.query(strSQL, next);
};

exports.checkModelDuplicate2 = (_id, name, next) => {
	var strSQL = mysql.format('SELECT * FROM models WHERE name = ? AND MD5(id) <> ?', [name, _id]);
	db.query(strSQL, next);
}

exports.getModelById = (id, next) => {
	var strSQL = mysql.format('SELECT *, MD5(id) as _id FROM models WHERE MD5(id)=? LIMIT 1', [id]);
	db.query(strSQL, next);	
};

exports.deleteModel = (id, next) => {
	var strSQL = mysql.format('DELETE FROM models WHERE MD5(id)=?', [id]);
	db.actionQuery(strSQL, next);	
}

exports.updateModel = (id, model, next) => {
    var strSQL = mysql.format('UPDATE models SET make_id=?, vehicletype_id=?, name=? WHERE MD5(id)=? ', [model.make_id, model.vehicletype_id, model.name, id]);
	db.actionQuery(strSQL, next);	
}
