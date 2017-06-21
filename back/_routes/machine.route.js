'use strict';

const MachineController = require('../_controllers/machine.controller');

class MachineRouter {
    constructor(provider) {
        provider.get('/machines/coachs/:id', MachineController.findAllByCoach);
    }
}

module.exports = (provider) => {
    return new MachineRouter(provider);
};