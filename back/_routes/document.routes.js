'use strict';
const AuthenticationController = require('../_controllers/authentication.controller');
const DocumentController = require('../_controllers/document.controller');

class DocumentRouter {
	constructor(provider) {
		provider.put('/documents', AuthenticationController.ensureAuthorized, DocumentController.save);
		provider.get('/documents/coachs/profile', AuthenticationController.ensureAuthorized, DocumentController.findPictureCoachProfile);
		provider.get('/documents/members/profile', AuthenticationController.ensureAuthorized, DocumentController.findPictureMemberProfile);
	}
}

module.exports = (provider) => {
	return new DocumentRouter(provider);
};