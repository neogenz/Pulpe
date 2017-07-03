'use strict';
const AuthenticationController = require('../_controllers/authentication.controller');
const DocumentController = require('../_controllers/document.controller');

class DocumentRouter {
	constructor(provider) {
		provider.put('/documents', AuthenticationController.ensureAuthorized, DocumentController.save);
		provider.get('/documents/coachs/category/:category', AuthenticationController.ensureAuthorized, DocumentController.findDocumentCoachByCategory);
		provider.get('/documents/members/category/:category', AuthenticationController.ensureAuthorized, DocumentController.findDocumentMemberByCategory);
	}
}

module.exports = (provider) => {
	return new DocumentRouter(provider);
};