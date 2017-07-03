const DocumentService = require('../_services/document.service');
const CategoryDocument = require('../_enums/CategoryDocument');
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
	static async findDocumentMemberByCategory(req, res) {
		try {
			const user = req.user;
			const category = req.params.category;
			const categoryEnum = CategoryDocument.fromName(capitalizeFirstLetter(category));
			const documentFinded = await DocumentService.findByMemberAndCategory(user._id, categoryEnum);
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
	static async findDocumentCoachByCategory(req, res) {
		try {
			const user = req.user;
			const category = req.params.category;
			const categoryEnum = CategoryDocument.fromName(capitalizeFirstLetter(category));

			const documentFinded = await DocumentService.findByCoachAndCategory(user._id, categoryEnum);
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

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

module.exports = DocumentController;