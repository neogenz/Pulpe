'use strict';

const CoachController = require('../_controllers/coach.controller');

class CoachRouter {
    constructor(provider) {
        provider.get('/coachs/:id', CoachController.findById);
        provider.post('/coachs/:id/profile/completed', CoachController.completeProfile);
    }
}

module.exports = (provider) => {
    return new CoachRouter(provider);
};