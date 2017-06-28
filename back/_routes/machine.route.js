'use strict';

const MachineController = require('../_controllers/machine.controller');
const AuthenticationController = require('../_controllers/authentication.controller');

class MachineRouter {
  constructor(provider) {
    provider.get('/machines',
      AuthenticationController.ensureAuthorized,
      AuthenticationController.mustBeCoach, MachineController.findAllByCoach);
    provider.post('/machines',
      AuthenticationController.ensureAuthorized,
      AuthenticationController.mustBeCoach, MachineController.create);
    provider.put('/machines',
      AuthenticationController.ensureAuthorized,
      AuthenticationController.mustBeCoach, MachineController.update);
    provider.delete('/machines/:id',
      AuthenticationController.ensureAuthorized,
      AuthenticationController.mustBeCoach,
      MachineController.delete);
  }
}

module.exports = (provider) => {
  return new MachineRouter(provider);
};