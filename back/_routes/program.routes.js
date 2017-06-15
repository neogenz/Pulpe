'use strict';

const programController = require('../_controllers/program.controller');

class ProgramRouter {
    constructor(provider) {
        provider.get('/programs/members/:memberId', programController.findByMemberId);
        provider.post('/programs', programController.generate);
    }
}

module.exports = (provider) => {
    return new ProgramRouter(provider);
};