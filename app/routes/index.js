/*jshint camelcase: false */

'use strict';

// ======================== VALIDATION ============================ //
var validatorUser = require('../validation/users');


// ======================== ROUTING ============================ //
var users = require('./routing/users');
var vehicles = require('./routing/vehicles');
var repairs = require('./routing/repairs');
var logs = require('./routing/logs');
var vtype = require('./routing/vehicletypes');
var locations = require('./routing/locations');
var travels = require('./routing/travels');


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

    //=============== REPAIRS =====================//

    app.route(config.api_version + '/repairs')
        .get(repairs.getAllRepairs)
        .post(repairs.createRepair);

    app.route(config.api_version + '/repairs/:id')
        .get(repairs.getRepairsById)
        .delete(repairs.deleteRepair)
        .put(repairs.updateRepair);
    
    app.route(config.api_version + '/repairs/vehicle/:v_id')
        .get(repairs.getRepairsByVehicle)

    //=============== LOGS =====================//

    app.route(config.api_version + '/logs')
        .get(logs.getAllLogs)
        .post(logs.createLogs);
    
    app.route(config.api_version + '/logs/:id')
        .get(logs.getLogById);

    //=============== REPAIRS =====================//

    app.route(config.api_version + '/vehicletypes')
        .get(vtype.getAllVehicleTypes)
        .post(vtype.createVehicleTypes);

    app.route(config.api_version + '/vehicletypes/:id')
        .get(vtype.getVehicleTypesById)
        .delete(vtype.deleteVehicleType)
        .put(vtype.updateVehicleTypes);

    //=============== LOCATIONS =====================//

    app.route(config.api_version + '/locations')
        .get(locations.getAllLocations)
        .post(locations.createLocations);

    app.route(config.api_version + '/locations/:id')
        .get(locations.getLocationById)
        .delete(locations.deleteLocation)
        .put(locations.updateLocation);
    
    //=============== TRAVELS =====================//

    app.route(config.api_version + '/travels')
        .get(travels.getAllTravels)
        .post(travels.createTravels);

    app.route(config.api_version + '/travels/:id')
        .get(travels.getTravelById)
        .delete(travels.deleteTravel)
        .put(travels.updateTravel);
    
    app.route(config.api_version + '/travels/:id/vehicle/:v_id')
        .get(travels.getTravelsByVehicle);
};
