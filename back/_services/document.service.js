const Document = require('../_model/Document');
const CategoryDocument = require('../_enums/CategoryDocument');
const AlreadyExistError = require('../_model/Errors').AlreadyExistError;
const TechnicalError = require('../_model/Errors').TechnicalError;

class DocumentService {
	constructor() {
	}

	/**
	 * Find a document by an id.
	 * @param id
	 * @returns {Promise.<Document>|Promise}
	 */
	static findById(id) {
		return Document.findOne({'_id': id})
			.then((document) => {
				return document;
			}, (error) => {
				throw error;
			})
			.catch(err => {
				throw err;
			});
	}

	/**
	 * Find a document by id of member and type category of document.
	 * @param id
	 * @param category
	 * @returns {Promise|Promise.<Document>}
	 */
	static findByCoachAndCategory(id, category) {
		return Document.findOne({'coach': id, 'category': category})
			.then((document) => {
				return document;
			}, (error) => {
				throw error;
			})
			.catch(err => {
				throw err;
			});
	}

	/**
	 * Find a document by id of member and type category of document.
	 * @param memberId
	 * @param category
	 * @returns {Promise|Promise.<Document>}
	 */
	static findByMemberAndCategory(memberId, category) {
		return Document.findOne({'member': memberId, 'category': category})
			.then((document) => {
				return document;
			}, (error) => {
				throw error;
			})
			.catch(err => {
				throw err;
			});
	}

	/**
	 * Save a document.
	 * @param documentToSave
	 * @returns {Promise|Promise.<Document>}
	 */
	static save(documentToSave) {
		if (documentToSave._id) {
			return this.findById(documentToSave._id)
				.then(documentFinded => {
					documentFinded.data = documentToSave.data;
					return documentFinded.save()
						.then(document => {
							return document;
						}, (error) => {
							throw new TechnicalError(error.message);
						})
						.catch((error) => {
							throw error;
						});
				});
		} else {
			const document = new Document();
			document.data = documentToSave.data;
			document.format = documentToSave.format;
			document.coach = documentToSave.coachId;
			document.member = documentToSave.memberId;
			document.category = CategoryDocument.getName(documentToSave.category);
			return document.save()
				.then(document => {
					return document;
				}, (error) => {
					throw new TechnicalError(error.message);
				})
				.catch((error) => {
					throw error;
				});
		}

	}
}

module.exports = DocumentService;
