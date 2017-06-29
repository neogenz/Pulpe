'use strict';

const AuthenticationController = require('../_controllers/authentication.controller');
const MeasurementController = require('../_controllers/measurement.controller');

class MeasurementRouter {
	constructor(provider) {
		provider.get('/measurements/:name/evolution', AuthenticationController.ensureAuthorized, MeasurementController.findEvolutionOfMeasurement);
	}
}

module.exports = (provider) => {
	return new MeasurementRouter(provider);
};