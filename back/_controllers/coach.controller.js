const CoachService = require('../_services/coach.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const GenderEnum = require('../_enums/GenderEnum');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const winston = require('winston');

class CoachController {
	constructor() {
	}

	/**
	 * Find a coach by an id.
	 * @param req
	 * @param res
	 */
	static findByAuthenticatedId(req, res) {
		const id = req.user._id;

		CoachService.findById(id)
			.then(coach => {
				res.send({coach: coach});
			})
			.catch((error) => {
				console.log(error);
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
				return res.status(httpError.code).send(httpError);
			});
	}

	/**
	 * Add measurement to a member and complete his profile.
	 * @param req
	 * @param res
	 */
	static completeProfile(req, res) {
		const coachId = req.user._id,
			birthDate = new Date(req.body.birthDate),
			gym = req.body.gym;
		let rawGender = req.body.gender;
		const gender = GenderEnum.fromName(rawGender);

		CoachService.completeProfile(coachId, gym, birthDate, gender)
			.then(coach => {
				res.send({coach: coach});
			})
			.catch((error) => {
				winston.log('error', error.stack);
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
				return res.status(httpError.code).send(httpError);
			});
	}

	/**
	 * Update a coach.
	 * @param req
	 * @param res
	 */
	static update(req, res) {
		if(req.body.coach._id.toString() !== req.user._id.toString()){
			const httpError = HttpErrorHelper.buildHttpErrorBy(HTTP_CODE.FORBIDDEN, null, 'L\'ahdérent à modifier doit être celui connecté.');
			return res.status(httpError.code).send(httpError);
		}
		const coach = req.body.coach;

		CoachService.update(coach)
			.then(coach => {
				res.send({coach: coach});
			})
			.catch((error) => {
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
				return res.status(httpError.code).send(httpError);
			});
	}

	/**
	 * Update picture of coach.
	 * @param req
	 * @param res
	 */
	static async updatePicture(req, res) {
		try {
			const coachId = req.user._id;
			let picture = req.body.picture;
			picture = await CoachService.updatePicture(coachId, picture);
			return res.send({picture: picture});
		} catch (error) {
			winston.log('error', error.stack);
			const httpError = HttpErrorHelper.buildHttpErrorByError(error);
			return res.status(httpError.code).send(httpError);
		}
	}
}

module.exports = CoachController;