const Program = require('../_model/Program');
const NotFoundError = require('../_model/Errors').NotFoundError;
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const MuscleEnum = require('../_enums/MuscleEnum');
const ExerciseService = require('./exercise.service');
//todo Create exercise service to find by some criterias
const Exercise = require('../_model/Exercise');
const moment = require('moment');
const SessionService = require('../_services/session.service');
const TechnicalError = require('../_model/Errors').TechnicalError;

class ProgramService {
	constructor() {
	}


	/**
	 *
	 * @param {Member|number} memberId Member or memberId
	 * @returns {Promise.<Session>}
	 */
	static async findSessionTodoBy(memberId) {
		try {
			const populationGraph = {
				path: 'sessions.exercises',
				model: 'Exercise',
				populate: {
					path: 'machines',
					model: 'Machine'
				}
			};
			let saveProgram = false;
			let programs = await Program.find().ofThisMember(memberId).isActive().populate(populationGraph);
			const programActive = programs[0];
			const dayOfWeekOnToday = moment().day(moment().day()).isoWeekday();
			for (let i = 0; i < programActive.sessions.length; i++) {
				if (programActive.sessions[i]._id.equals(programActive._sessionTodo)) {
					return programActive.sessions[i];
					/*	if (moment().day(programActive.sessions[i].dayInWeek).isoWeekday() >= dayOfWeekOnToday) {
							return programActive.sessions[i];
						}
						else {
							if (_haveNextSession(programActive.sessions, i)) {
								programActive._sessionTodo = programActive.sessions[i + 1]._id;
								saveProgram = true;
							}
						}*/
				}
			}
			throw new NotFoundError('Aucun exercice à venir sur cette séance.');
			/*await programActive.save();
			return programActive.session[0];*/
		}
		catch (error) {
			if (!(error instanceof NotFoundError)) {
				throw new TechnicalError(error.message);
			}
		}
	}

	/**
	 * find a program for a member.
	 * @param memberId
	 * @returns {Promise|Promise.<Program>}
	 */
	static findByMemberId(memberId) {
		const populationGraph = {
			path: 'sessions.exercises',
			model: 'Exercise',
			populate: {
				path: 'machines',
				model: 'Machine'
			}
		};
		return Program.find().ofThisMember(memberId).isActive().populate(populationGraph)
			.then((programs) => {
				if (!programs || programs.length <= 0) {
					throw new NotFoundError(`Program can\'t be found to member : ${memberId}`);
				}
				return programs[0];
			})
			.catch(function (err) {
				throw err;
			});
	}

	/**
	 * find a program for a session.
	 * @param sessionId
	 * @returns {Promise|Promise.<Program>}
	 */
	static findBySessionId(sessionId) {
		const populationGraph = {
			path: 'sessions.exercises',
			model: 'Exercise',
			populate: {
				path: 'machines',
				model: 'Machine'
			}
		};
		return Program.find().ofThisSession(sessionId).isActive().populate(populationGraph)
			.then((programs) => {
				if (!programs || programs.length <= 0) {
					throw new NotFoundError(`Program can\'t be found of session : ${sessionId}`);
				}
				return programs[0];
			})
			.catch(function (err) {
				throw err;
			});
	}

	/**
	 * Generate a program for a member
	 * @param {ProgramGenerationContext} programGenerationContext
	 * @returns {Promise.<Program>}
	 */
	static generateProgramBy(programGenerationContext) {
		return SessionService.generateSessionsBy(programGenerationContext.member.sessionFrequency,
			programGenerationContext.objective,
			programGenerationContext.member.gym)
			.then((sessions) => {
				let program = Program.of()
					.member(programGenerationContext.member)
					.sessions(sessions)
					.objective(programGenerationContext.objective.name)
					.isActive(programGenerationContext.isActive)
					.sessionTodo(sessions[0])
					.build();
				return program;
			})
			.catch(error => {
				throw error;
			});
	}


	/**
	 * Save program and each of these exercises
	 * @param program
	 * @returns {Promise|Promise.<*>}
	 */
	static saveProgram(program) {
		let promises = [];
		program.sessions.forEach(session => {
			promises.push(ExerciseService.saveExercises(session.exercises))
		});
		promises.push(program.save());
		return Promise.all(promises)
			.catch(error => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
	}


	static async disableAllBy(member) {
		await Program.update({ member: member }, { isActive: false }, { multi: true });
	}

	/**
	 * Find all sessions populated of active program by member id.
	 * @param {number} memberId
	 * @returns {Promise|Promise.<Session>}
	 */
	static findAllSessionsOfActiveProgramByMemberId(memberId) {
		return ProgramService.findByMemberId(memberId)
			.then((finded) => {
				if (finded) {
					return finded.sessions;
				}
				throw new NotFoundError(`Programme introuvable pour l'adhérent ${memberId}`);
			}, error => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			}).catch(error => {
				throw error;
			});
	}


	/**
	 * Add a new exercise on program's member.
	 * @param sessionId
	 * @param exercise
	 * @returns {Promise|Promise.<Exercise>}
	 */
	static async addExercise(sessionId, exercise) {
		let programFinded = null;
		return this.findBySessionId(sessionId)
			.then((program) => {
				programFinded = program;
				const sessionToUpdate = programFinded.sessions.find(s => s._id.equals(sessionId));
				sessionToUpdate.exercises.push(exercise);
				return programFinded.save();
			}, error => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
			.then((programSaved) => {
				return exercise;
			}, error => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
			.catch(error => {
				throw error;
			});
	}
}

function _haveNextSession(sessions, currentIndex) {
	return (sessions.length - 1) >= (currentIndex + 1);
}

module.exports = ProgramService;