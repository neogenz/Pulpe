'use strict';

const MeasurementController = require('../_controllers/measurement.controller');

class MeasurementRouter {
	constructor(provider) {
		provider.get('/measurements/:name/evolution/members/:id', MeasurementController.findEvolutionOfMeasurement);
	}
}

module.exports = (provider) => {
	return new MeasurementRouter(provider);
};