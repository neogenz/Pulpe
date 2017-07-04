'use strict';

const ProgramController = require('../_controllers/program.controller');
const AuthenticationController = require('../_controllers/authentication.controller');

class ProgramRouter {
  constructor(provider) {
    provider.get('/programs/active', AuthenticationController.ensureAuthorized, ProgramController.findActiveByAuthenticatedMember);
    provider.get('/programs/active/sessions/todo', AuthenticationController.ensureAuthorized, ProgramController.findSessionTodo);
    provider.put('/programs/active/sessions/todo', AuthenticationController.ensureAuthorized, ProgramController.doneCurrentSession);
    provider.get('/programs/active/sessions', AuthenticationController.ensureAuthorized, ProgramController.findAllSessionsOfActiveProgramIdByAuthenticatedMember);
    provider.post('/programs', ProgramController.createProgram);
  }
}

module.exports = (provider) => {
  return new ProgramRouter(provider);
};