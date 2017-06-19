'use strict';

const ProgramController = require('../_controllers/program.controller');
const AuthenticationController = require('../_controllers/authentication.controller');

class ProgramRouter {
  constructor(provider) {
    provider.get('/programs/active', AuthenticationController.ensureAuthorized, ProgramController.findActiveByAuthenticatedMember);
    provider.get('/programs/:programId/sessions', AuthenticationController.ensureAuthorized, ProgramController.findAllSessionsOfActiveProgramIdByAuthenticatedMember);
    provider.post('/programs', ProgramController.createProgram);
  }
}

module.exports = (provider) => {
  return new ProgramRouter(provider);
};