const MongoError = require('../_helpers/MONGO_ERROR.json');
const Member = require('../_model/Member');
const Measurement = require('../_model/Measurement');
const AlreadyExistError = require('../_model/Errors').AlreadyExistError;
const NotFoundError = require('../_model/Errors').NotFoundError;
const TechnicalError = require('../_model/Errors').TechnicalError;
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const GenderEnum = require('../_enums/GenderEnum');
const MeasurementService = require('../_services/measurement.service');
const CoachService = require('../_services/coach.service');

class AlreadyExistMemberError extends AlreadyExistError {
}

class MemberService {
	constructor() {
	}

	/**
	 * Find a member by an id.
	 * @param id
	 * @returns {Promise|Promise.<Member>}
	 */
	static findById(id) {
		const populationGraph = {
			path: 'gym',
			model: 'Gym'
		};
		return Member.findOne({'_id': id})
			.populate(populationGraph)
			.then((member) => {
				if (!member) {
					throw new NotFoundError('Adhérent introuvable.');
				}
				return member;
			})
			.catch(err => {
				throw new TechnicalError(err.message);
			});
	}

	/**
	 * Find a member by his mail and his password.
	 * Password is checked by validation method.
	 * @param email
	 * @param password
	 * @returns {Promise.<Member>|Promise}
	 */
	static findBy(email, password) {
		const populationGraph = {
			path: 'gym',
			model: 'Gym'
		};
		return Member.findOne({'email': email}).populate(populationGraph)
			.then((member) => {
				if (!member) {
					throw new NotFoundError('Utilisateur introuvable.');
				}
				if (!member.validPassword(password)) {
					throw new NotFoundError('Email ou mot de passe invalide.');
				}
				return member;
			}).catch(err => {
				throw err;
			});
	}

	/**
	 * Hash the password of a member and save them.
	 * @param member
	 * @returns {Promise.<Member>|Promise}
	 */
	static createMember(member) {
		member.password = member.generateHash(member.password);
		return member.save().then(
			(member) => {
				return member;
			},
			(error) => {
				if (error.code && error.code === MongoError.DUPPLICATE_KEY.code) {
					throw new AlreadyExistMemberError('Cet email existe déja.');
				}
			}
		).catch((error) => {
			throw error;
		})
	}

	/**
	 * Add measurements for a member.
	 * @param memberId
	 * @param measurements
	 * @returns {Promise.<Member>|Promise}
	 */
	static addMeasurements(memberId, measurements) {
		let member;
		return this.findById(memberId)
			.then(memberFinded => {
				member = memberFinded;
				const measurementsToArchive = member.measurements;
				return MeasurementService.createArchivedMeasurements(memberId, measurementsToArchive);
			})
			.then(() => {
				member.measurements = [];
				measurements.forEach(mes => {
					member.measurements.push(mes);
				});
				return member.save();
			})
			.then(member => {
					return member;
				}, (error) => {
					throw new TechnicalError(error.message);
				}
			).catch((error) => {
				throw error;
			});
	}

	/**
	 * Add measurements for a member and complete his profile.
	 * @param gymId
	 * @param memberId
	 * @param measurements
	 * @param sessionFrequency
	 * @param birthDate
	 * @param {ObjectiveEnum} objectiveEnum
	 * @returns {Promise.<Member>|Promise}
	 */
	static completeProfile(gymId, memberId, measurements, sessionFrequency, birthDate, objectiveEnum, gender) {
		return this.findById(memberId)
			.then(member => {
				measurements.forEach(mes => {
					member.measurements.push(mes);
				});
				member.profileCompleted = true;
				member.sessionFrequency = sessionFrequency;
				member.birthDate = new Date(birthDate);
				member.objective = ObjectiveEnum.MassGainer;
				member.gym = gymId;
				member.gender = gender;
				return member.save();
			})
			.then(memberSaved => {
					return this.findById(memberSaved._id)
				}, (error) => {
					throw new TechnicalError(error.message);
				}
			)
			.then((memberFinded) => {
				return memberFinded;
			}, (error) => {
				throw new TechnicalError(error.message);
			})
			.catch((error) => {
				throw error;
			});
	}

	/**
	 * Update a member.
	 * @param member
	 * @returns {Promise.<Member>|Promise}
	 */
	static updateMember(member) {
		return this.findById(member._id)
			.then(memberFinded => {
				memberFinded.sessionFrequency = member.sessionFrequency;
				memberFinded.birthDate = new Date(member.birthDate);
				memberFinded.objective = ObjectiveEnum.fromCode(member.objective);
				memberFinded.email = member.email;
				memberFinded.firstName = member.firstName;
				memberFinded.lastName = member.lastName;
				memberFinded.gender = GenderEnum.fromName(member.gender);
				memberFinded.gym = member.gym;
				return memberFinded.save();
			})
			.then(member => {
					return this.findById(member._id)
				}, (error) => {
					throw new TechnicalError(error.message);
				}
			).then(member => {
				return member;
			}, (error) => {
				throw new TechnicalError(error.message);
			})
			.catch((error) => {
				throw error;
			});
	}

	/**
	 * Find all members of a coach linked by their gym.
	 * @param id of coach
	 * @returns {Promise.<Member[]>|Promise}
	 */
	static findAllByCoach(id) {
		return CoachService.findById(id)
			.then(coachFinded => {
				return this.findAllByGym(coachFinded.gym._id);
			}, (error) => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
			.then(members => {
				return members;
			}, (error) => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
			.catch((error) => {
				throw error;
			});
	}

	/**
	 * Find all members of a gym.
	 * @param id
	 * @returns {Promise.<Member[]>|Promise}
	 */
	static findAllByGym(id) {
		const populationGraph = {
			path: 'gym',
			model: 'Gym'
		};
		return Member.find({'gym': id})
			.populate(populationGraph)
			.then(members => {
				return members;
			}, (error) => {
				console.error(error.stack);
				throw new TechnicalError(error.message);
			})
			.catch((error) => {
				throw error;
			});
	}
}

module.exports = MemberService;
