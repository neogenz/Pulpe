'use strict';

const ProgramController = require('../_controllers/program.controller');
const AuthenticationController = require('../_controllers/authentication.controller');

class ProgramRouter {
	constructor(provider) {
		provider.get('/programs/active', AuthenticationController.ensureAuthorized, ProgramController.findActiveByAuthenticatedMember);
		provider.get('/programs/active/members/:id', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, ProgramController.findActiveByMemberId);
		provider.get('/programs/active/sessions/todo', AuthenticationController.ensureAuthorized, ProgramController.findSessionTodo);
		provider.get('/programs/active/sessions', AuthenticationController.ensureAuthorized, ProgramController.findAllSessionsOfActiveProgramIdByAuthenticatedMember);
		provider.post('/programs', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, ProgramController.createProgram);
		provider.put('/programs/active/sessions/todo/done', AuthenticationController.ensureAuthorized, ProgramController.doneCurrentSession);
		provider.put('/programs/active/sessions/todo', AuthenticationController.ensureAuthorized, ProgramController.changeSessionTodo);
		provider.post('/programs/sessions/:id/exercise', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, ProgramController.addExercise);
    provider.put('/programs/sessions/:id/exercises', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, ProgramController.update);
	}
}

module.exports = (provider) => {
	return new ProgramRouter(provider);
};