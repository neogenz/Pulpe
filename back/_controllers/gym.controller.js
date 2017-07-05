'use strict';

const GymService = require('../_services/gym.service');
const CoachService = require('../_services/coach.service');
const MachineService = require('../_services/machine.service');
const MemberService = require('../_services/member.service');
const ExerciceService = require('../_services/exercise.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const winston = require('winston');

class GymController {
	constructor() {
	}

	/**
	 * Add measurement to a member and complete his profile.
	 * @param req
	 * @param res
	 */
	static findAll(req, res) {
		GymService.findAll()
			.then(gyms => {
				res.send({gyms: gyms});
			})
			.catch((error) => {
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
				return res.status(httpError.code).send(httpError);
			});
	}

	static findStatistics(req, res) {
		const coachId = req.user._id;
		let gym;
		let nbMembers;
		let nbMachines;
		let nbExercises;

		CoachService.findById(coachId)
			.then((coachFinded) => {
				gym = coachFinded.gym;
				return MemberService.countBy(gym);
			}, (error) => {
				throw error;
			})
			.then((mbMembersCounted) => {
				nbMembers = mbMembersCounted;
				return MachineService.countBy(gym);
			}, (error) => {
				throw error;
			})
			.then((mbMachinesCounted) => {
				nbMachines = mbMachinesCounted;
				return ExerciceService.countBy(gym);
			}, (error) => {
				throw error;
			})
			.then((nbExercisesCounted) => {
				nbExercises = nbExercisesCounted;
				res.send({
					nbMembers: nbMembers,
					nbMachines: nbMachines,
					nbExercises: nbExercises
				});
			})
			.catch((error) => {
				winston.log('error', error.stack);
				const httpError = HttpErrorHelper.buildHttpErrorByError(error);
				return res.status(httpError.code).send(httpError);
			});
	}
}

module.exports = GymController;