/*jshint camelcase: false */

'use strict';

// ======================== VALIDATION ============================ //
var validatorUser = require('../validation/users');


// ======================== ROUTING ============================ //
var users = require('./routing/users');
var vehicles = require('./routing/vehicles');
var repairs = require('./routing/repairs');
var parts = require('./routing/parts');
var logs = require('./routing/logs');
var vtype = require('./routing/vehicletypes');
var locations = require('./routing/locations');
var makes = require('./routing/makes');
var models = require('./routing/models');
var travels = require('./routing/travels');
var accidents = require('./routing/accidents');


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

    app.route(config.api_version + '/repairparts')
        .get(repairs.getRepairParts);

    app.route(config.api_version + '/repairs/vehicle/:v_id')
        .get(repairs.getRepairsByVehicle);
    


    //=============== PARTS USED IN REPAIRS =====================//

    app.route(config.api_version + '/parts')
        .get(parts.getAllParts)
        .post(parts.createPart);

    app.route(config.api_version + '/parts/:id')
        .get(parts.getPartsById)
        .delete(parts.deletePart)
        .put(parts.updatePart);
    
    app.route(config.api_version + '/parts/repair/:r_id')
        .get(parts.getPartsByRepair)

    //=============== LOGS =====================//

    app.route(config.api_version + '/logs')
        .get(logs.getAllLogs)
        .post(logs.createLogs);
    
    app.route(config.api_version + '/logs/:id')
        .get(logs.getLogById);

    //=============== VEHICLE TYPES  =====================//

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

    //=============== MAKES =====================//

    app.route(config.api_version + '/makes')
        .get(makes.getAllMakes)
        .post(makes.createMakes);

    app.route(config.api_version + '/makes/:id')
        .get(makes.getMakeById)
        .delete(makes.deleteMake)
        .put(makes.updateMake);

    //=============== MODELS =====================//

    app.route(config.api_version + '/models')
        .get(models.getAllModels)
        .post(models.createModels);

    app.route(config.api_version + '/models/:id')
        .get(models.getModelById)
        .delete(models.deleteModel)
        .put(models.updateModel);

    app.route(config.api_version + '/models/make/:id')
        .get(models.getModelByMake);
    
    //=============== TRAVELS =====================//

    app.route(config.api_version + '/travels')
        .get(travels.getAllTravels)
        .post(travels.createTravels);

    app.route(config.api_version + '/travels/:id')
        .get(travels.getTravelById)
        .delete(travels.deleteTravel)
        .put(travels.updateTravel);
    
    app.route(config.api_version + '/travels/vehicle/:v_id')
        .get(travels.getTravelsByVehicle);

    //=============== ACCIDENTS =====================//

    app.route(config.api_version + '/accidents')
        .get(accidents.getAllAccidents)
        .post(accidents.createAccidents);

    app.route(config.api_version + '/accidents/:id')
        .get(accidents.getAccidentById)
        .delete(accidents.deleteAccident)
        .put(accidents.updateAccident);
};
