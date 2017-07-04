'use strict';
const AuthenticationController = require('../_controllers/authentication.controller');
const MemberController = require('../_controllers/member.controller');

class MemberRouter {
	constructor(provider) {
		provider.get('/members', AuthenticationController.ensureAuthorized, MemberController.findAuthenticated);
		provider.get('/members/coachs', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, MemberController.findAllByAuthenticatedCoach);
		provider.put('/members/measurements', AuthenticationController.ensureAuthorized, MemberController.addMeasurements);
		provider.post('/members/profile/complete',AuthenticationController.ensureAuthorized, MemberController.completeProfile);
		provider.get('/efficientPrevisions/members', AuthenticationController.ensureAuthorized, MemberController.findEfficientPrevisions);
		provider.put('/members', AuthenticationController.ensureAuthorized, MemberController.update);
		provider.post('/members', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, MemberController.create);
	}
}

module.exports = (provider) => {
	return new MemberRouter(provider);
};