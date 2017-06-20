'use strict';

const MemberController = require('../_controllers/member.controller');

class MemberRouter {
    constructor(provider) {
        provider.get('/members/:id', MemberController.findById);
        provider.put('/members/:id/measurements', MemberController.addMeasurements);
        provider.put('/members', MemberController.updateMember);
        provider.post('/members/:id/profile/completed', MemberController.completeProfile);
    }
}

module.exports = (provider) => {
    return new MemberRouter(provider);
};