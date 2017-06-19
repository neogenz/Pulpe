'use strict';

const GymController = require('../_controllers/gym.controller');

class GymRouter {
    constructor(provider) {
        provider.get('/gyms', GymController.findAll);
    }
}

module.exports = (provider) => {
    return new GymRouter(provider);
};