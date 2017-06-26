'use strict';

const MemberController = require('../_controllers/member.controller');

class MemberRouter {
	constructor(provider) {
		provider.get('/members/:id', MemberController.findById);
		provider.get('/members/coachs/:id', MemberController.findAllByCoach);
		provider.put('/members/:id/measurements', MemberController.addMeasurements);
		provider.post('/members/:id/profile/completed', MemberController.completeProfile);
		provider.put('/members', MemberController.update);
		provider.post('/members', MemberController.create);

	}
}

module.exports = (provider) => {
	return new MemberRouter(provider);
};