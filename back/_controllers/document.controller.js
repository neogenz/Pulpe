const DocumentService = require('../_services/document.service');
const MemberService = require('../_services/member.service');
const CoachService = require('../_services/coach.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const winston = require('winston');

class DocumentController {
	constructor() {
	}


	/**
	 * Find picture of profile for a member.
	 * @param req
	 * @param res
	 * @returns {Promise.<Document>}
	 */
	static async findPictureMemberProfile(req, res) {
		try {
			const user = req.user;
			const documentFinded = await DocumentService.findByMember(user._id);
			return res.send({document: documentFinded});
		} catch (error) {
			winston.log('error', error.stack);
			const httpError = HttpErrorHelper.buildHttpErrorByError(error);
			return res.status(httpError.code).send(httpError);
		}
	}

	/**
	 * Find picture of profile for a coach.
	 * @param req
	 * @param res
	 * @returns {Promise.<Document>}
	 */
	static async findPictureCoachProfile(req, res) {
		try {
			const user = req.user;
			const documentFinded = await DocumentService.findByCoach(user._id);
			return res.send({document: documentFinded});
		} catch (error) {
			winston.log('error', error.stack);
			const httpError = HttpErrorHelper.buildHttpErrorByError(error);
			return res.status(httpError.code).send(httpError);
		}
	}

	/**
	 * Save a document, or update him.
	 * @param req
	 * @param res
	 * @returns {Promise.<void>}
	 */
	static async save(req, res) {
		try {
			let document = req.body.document;
			const documentUpdated = await DocumentService.save(document);
			return res.send({document: documentUpdated});
		} catch (error) {
			winston.log('error', error.stack);
			const httpError = HttpErrorHelper.buildHttpErrorByError(error);
			return res.status(httpError.code).send(httpError);
		}
	}
}

module.exports = DocumentController;