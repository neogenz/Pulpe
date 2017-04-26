'use strict';

const MemberController = require('../_controllers/member.controller');

class MemberRouter {
    constructor(provider) {
        provider.put('/members/:id/measurements', MemberController.addMeasurements);
    }
}

module.exports = (provider) => {
    return new MemberRouter(provider);
};