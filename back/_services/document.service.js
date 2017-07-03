const Document = require('../_model/Document');
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
	 * Find a picture by id of coach.
	 * @param id
	 * @returns {Promise|Promise.<Document>}
	 */
	static findByCoach(id) {
		return Document.findOne({'coach': id})
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
	 * Find a picture by id of member.
	 * @param id
	 * @returns {Promise|Promise.<Document>}
	 */
	static findByMember(id) {
		return Document.findOne({'member': id})
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
