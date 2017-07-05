'use strict';

const AuthenticationController = require('../_controllers/authentication.controller');
const CoachController = require('../_controllers/coach.controller');

class CoachRouter {
	constructor(provider) {
		provider.get('/coachs', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, CoachController.findByAuthenticatedId);
		provider.post('/coachs/profile/complete', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, CoachController.completeProfile);
		provider.put('/coachs', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, CoachController.update);
	}
}

module.exports = (provider) => {
	return new CoachRouter(provider);
};