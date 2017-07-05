'use strict';

const DemoController = require('../_controllers/demo.controller');
const AuthenticationController = require('../_controllers/authentication.controller');

class DemoRouter {
    constructor(provider) {
        provider.post('/context/coach/demo', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, DemoController.generateDemoDataOnAuthenticatedCoachGym);
    }
}

module.exports = (provider) => {
    return new DemoRouter(provider);
}