'use strict';

const AuthenticationController = require('../_controllers/authentication.controller');
const GymController = require('../_controllers/gym.controller');

class GymRouter {
	constructor(provider) {
		provider.get('/gyms', GymController.findAll);
		provider.get('/gyms/stats', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, GymController.findStatistiques);
	}
}

module.exports = (provider) => {
	return new GymRouter(provider);
};