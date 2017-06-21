const MongoError = require('../_helpers/MONGO_ERROR.json');
const Coach = require('../_model/Coach');
const Measurement = require('../_model/Measurement');
const AlreadyExistError = require('../_model/Errors').AlreadyExistError;
const NotFoundError = require('../_model/Errors').NotFoundError;
const TechnicalError = require('../_model/Errors').TechnicalError;
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const GymService = require('../_services/gym.service');

class AlreadyExistCoachError extends AlreadyExistError {
}

class CoachService {
    constructor() {
    }

    /**
     * Find a Coach by an id.
     * @param id
     * @returns {Promise|Promise.<Coach>}
     */
    static findById(id) {
        const populationGraph = {
            path: 'gym',
            model: 'Gym'
        };
        return Coach.findOne({'_id': id})
            .populate(populationGraph)
            .then((Coach) => {
                if (!Coach) {
                    throw new NotFoundError('Coach introuvable.');
                }
                return Coach;
            })
            .catch(err => {
                throw err;
            });
    }

    /**
     * Find a Coach by his mail and his password.
     * Password is checked by validation method.
     * @param email
     * @param password
     * @param isCoach
     * @returns {Promise.<Coach>|Promise}
     */
    static findBy(email, password) {
        return Coach.findOne({'email': email})
            .then((coach) => {
                if (!coach) {
                    throw new NotFoundError('Utilisateur introuvable.');
                }
                if (!coach.validPassword(password)) {
                    throw new NotFoundError('Email ou mot de passe invalide.');
                }
                return coach;
            }).catch(err => {
                throw err;
            });
    }

    /**
     * Hash the password of a Coach and save them.
     * @param coach
     * @returns {Promise.<Coach>|Promise}
     */
    static createCoach(coach) {
        coach.password = coach.generateHash(coach.password);
        return coach.save().then(
            (coach) => {
                return coach;
            },
            (error) => {
                if (error.code && error.code === MongoError.DUPPLICATE_KEY.code) {
                    throw new AlreadyExistCoachError('Cet email existe déja.');
                }
            }
        ).catch((error) => {
            throw error;
        })
    }

    /**
     * Add measurements for a Coach and complete his profile.
     * @param coachId
     * @param gym
     * @param birthDate
     * @param gender
     * @returns {Promise.<Coach>|Promise}
     */
    static completeProfile(coachId, gym, birthDate, gender) {
        return GymService.getOrCreateGym(gym.id, gym.name, gym.address, gym.city)
            .then(gymToAttach => {
                gym = gymToAttach;
                return this.findById(coachId);
            })
            .then(coach => {
                coach.gym = gym.id;
                coach.profileCompleted = true;
                coach.birthDate = new Date(birthDate);
                coach.gender = gender;
                return coach.save();
            })
            .then(coach => {
                    return coach;
                },
                (error) => {
                    throw new TechnicalError(error.message);
                }
            ).catch((error) => {
                throw error;
            });
    }
}

module.exports = CoachService;
