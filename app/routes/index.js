/*jshint camelcase: false */

'use strict';

// ======================== VALIDATION ============================ //
var validatorUser = require('../validation/users');


// ======================== ROUTING ============================ //
var users = require('./routing/users');
var vehicles = require('./routing/vehicles');



module.exports = function(app,config, middleware, passport) {
	console.log('ROUTES');
	
    app.route('/')
        .get(function onRequest(req, res) {
            res.render('index');
        });

    // ============== AUTHENTICATIION ========================== //

    app.route(config.api_version + '/login')
        .post(validatorUser.validateBasicAuth, passport.authenticate('user', {session: false}), users.login)
        .get(users.currentUser)
        .delete(users.logout);

    // ============== USERS =======================//

    app.route(config.api_version + '/users')
        .get(users.getAllUser)
        .post(validatorUser.validateUser,users.createUser);

    app.route(config.api_version + '/users/:user_id')
     	.get(users.getUser)
     	.delete(users.deleteUser)
        .put(validatorUser.validateUser,users.updateUser);
         
    // ============== VEHICLES ====================//
    
    app.route(config.api_version + '/vehicles')
        .get(vehicles.getAllVehicles)
        .post(vehicles.createVehicle);
    
    app.route(config.api_version + '/vehicles/:id')
        .get(vehicles.getVehicle)
        .delete(vehicles.deleteVehicle)
        .put(vehicles.updateVehicle);
};
