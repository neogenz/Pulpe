'use strict';

const AuthenticationController = require('../_controllers/authentication.controller');
const CoachController = require('../_controllers/coach.controller');

class CoachRouter {
	constructor(provider) {
		provider.get('/coachs/:id', CoachController.findById);
		provider.post('/coachs/:id/profile/completed', CoachController.completeProfile);
		provider.put('/coachs', CoachController.update);
	}
}

module.exports = (provider) => {
	return new CoachRouter(provider);
};