'use strict';

const winston = require('winston');
const Exercise = require('../_model/Exercise');
const BodybuildingExercise = require('../_model/BodybuildingExercise');
const CardioExercise = require('../_model/CardioExercise');
const TrainingExercise = require('../_model/TrainingExercise');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const BodybuildingExerciseReferenceInformation = require('../_model/exercisesReferencesInformations/BodybuildingExerciseReferenceInformation');
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const SessionTypeEnum = require('../_enums/SessionTypeEnum');
const ExerciseInformationReferenceService = require('../_services/exerciseReferenceInformation.service');
const NotFoundError = require('../_model/Errors').NotFoundError;
const TechnicalError = require('../_model/Errors').TechnicalError;
const ExerciseReferenceInformationEnum = require('../_enums/ExerciseReferenceInformationEnum');
const _ = require('underscore');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const MuscleEnum = require('../_enums/MuscleEnum');
const OrganizedExercise = require('../_model/OrganizedExercise');
const mongoose = require('mongoose');

class ExerciseService {
	constructor() {
	}


  static findOneById(id) {
    return Exercise.findOne({ _id: id }).populate('machines')
      .then(exercise => {
        if (!exercise) {
          throw new NotFoundError(`No exercise found with _id ${id}`);
        }
        return exercise;
      }).catch(error => {
        throw new TechnicalError(error.message);
      });
  }

  static async findOneOfReferenceById(id) {
    const findeds = await Exercise.findOne({ _id: id }).isReference().populate('machines');
    if (!findeds) {
      throw new NotFoundError(`No exercise found with _id ${id}`);
    }
    return findeds[0];
  }

	/**
	 *
	 * @param {Exercise|object} exercise
	 * @returns {Promise|Promise.<Exercise>} updated
	 */
	static async findAndUpdateThis(exercise) {
		try {
			const finded = await ExerciseService.findOneById(exercise._id);
			await finded.update(exercise).populate('machines');
			const updated = await ExerciseService.findOneById(exercise._id);
			return updated;
		} catch (error) {
			throw new TechnicalError(error.message);
		}
	}


  /**
   *
   * @param {Exercise|object} exercise
   * @returns {Promise|Promise.<Exercise>} updated
   */
  static async findOneOfReferenceAndUpdateThis(exercise) {
    try {
      const finded = await ExerciseService.findOneOfReferenceById(exercise._id);
      finded.__t = exercise.type;
      await finded.update(exercise).populate('machines');
      const updated = await ExerciseService.findOneOfReferenceById(exercise._id);
      return updated;
    } catch (error) {
      throw new TechnicalError(error.message);
    }
  }

	/**
	 *
	 * @param gymId
	 * @returns {Promise|Promise.<Exercise>}
	 */
	static findAllOfReferenceBy(gymId) {
		return Exercise.find().isReference().inThisGymId(gymId).populate('machines')
			.then(exercises => {
				return exercises;
			}).catch(error => {
				throw new TechnicalError(error.message);
			})
	}

  /**
   *
   * @param id Id of exercise to delete
   * @returns {Promise.<*>}
   */
  static async deleteBy(id) {
    try {
      const toDelete = await ExerciseService.findOneById(id);
      await Exercise.remove({ _id: id });
      return toDelete;
    } catch (error) {
      throw new TechnicalError(error.message);
    }
  }

  /**
   * Count number of exercises in a gym.
   * @param gym
   * @returns {Promise.<Number>|Promise}
   */
  static countBy(gym) {
    const populationGraph = {
      path: '_gym',
      model: 'Gym'
    };
    return Exercise.find({ '_gym': gym._id })
      .populate(populationGraph).count()
      .then((nbExercises) => {
        return nbExercises;
      })
      .catch(err => {
        throw new TechnicalError(err.message);
      });
  }

  /**
   * Generate a pool of exercises, no persisted
   * @param {SessionGenerationContext} sessionGenerationContext
   * @param objective
   * @returns {Promise.<Array<Exercise>>|Promise}
   */
  static generateExercisesBy(sessionGenerationContext, objective) {
    let exercisesGeneratedPromises = [];
    return this._findReferenceExercisesBy(sessionGenerationContext)
      .then(exercises => {
        exercises.forEach((exercise, index) => {
          exercisesGeneratedPromises.push(ExerciseService.generateExerciseFromReferencesInformationsBy(
            exercise.name,
            exercise.machines,
            {
              session:sessionGenerationContext.session._id,
              type: ExerciseGroupTypeEnum.fromName(exercise.__t),
              workedMuscles: exercise.workedMuscles,
              weight: exercise.weight,
              order: index
            },
            objective)
          );
        });
        return Promise.all(exercisesGeneratedPromises);
      },
      error => {
        throw new TechnicalError(error.message);
      })
      .catch(error => {
        throw error;
      });
  }


	/**
	 * Find reference exercises
	 * @param {SessionGenerationContext} sessionGenerationContext
	 * @returns {Promise.<Exercise>|Promise}
	 * @private
	 */
	static _findReferenceExercisesBy(sessionGenerationContext) {
		let exercisesPromises = [];
		let alreadyWorkedMusclesRepartition = [];
		/*START - Debug context*/
		let nbTotalOfExercisesToThisSession = 0;
		sessionGenerationContext.musclesRepartitions.forEach(muscleRepartition => {
			nbTotalOfExercisesToThisSession += muscleRepartition.nbOfExercises;
		});
		if (sessionGenerationContext.session.training) {
			nbTotalOfExercisesToThisSession++;
		}
		/*END - Debug context*/
		if (sessionGenerationContext.session.training) {
			winston.log('debug', `The session need training exercise.`);
			exercisesPromises.push(ExerciseService.findOneTrainingReferenceExerciseBy(sessionGenerationContext.gym));
		}
		sessionGenerationContext.musclesRepartitions.forEach(muscleRepartition => {
			exercisesPromises.push(ExerciseService.findReferenceExercisesByMuscleRepartionWichAreNotAlreadyWorkedHard(
				muscleRepartition,
				alreadyWorkedMusclesRepartition,
				sessionGenerationContext.gym
			));
			alreadyWorkedMusclesRepartition = alreadyWorkedMusclesRepartition.concat([muscleRepartition]);
		});
		return Promise.all(exercisesPromises)
			.then(exercisesFinded => {
				let exercises = _.flatten(exercisesFinded);
				let validReferenceExercises = exercises.filter(exercise => exercise !== null && exercise !== undefined);
				winston.log('debug', `This session need ${nbTotalOfExercisesToThisSession} exercises, ${validReferenceExercises.length} references exercises finded.`)
				return validReferenceExercises;
			}).catch(error => {
				throw error;
			});
	}

	/**
	 * Create (new + save) an exercise
	 * @param {string} name
	 * @param {Array} machines
	 * @param {Object} exerciseProperties
	 * @param {ExerciseGroupTypeEnum} exerciseProperties.type
	 * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
	 * @param {number} [exerciseProperties.weight]
	 * @param {number} [exerciseProperties.phase]
	 * @param {boolean} [exerciseProperties.reference]
	 * @param {boolean} [exerciseProperties.priorityInProgramAutoGeneration]
	 * @param {Gym} [exerciseProperties.gym]
	 * @returns {Promise|Promise.<Exercise>}
	 */
	static createExerciseBy(name, machines, exerciseProperties) {
		//todo Do not create with hardcoded objective, but to all know objectives
		return ExerciseService.generateExerciseFromReferencesInformationsBy(name, machines, exerciseProperties, ObjectiveEnum.MassGainer)
			.then(exercise => {
				return exercise.save();
			}, error => {
				throw error;
			})
			.catch(error => {
				throw error;
			})
	}

  /**
   * Find exercise wich can be used to training
   * @param {Gym} gym
   * @returns {Promise<Array<Exercise>>}
   */
  static findOneTrainingReferenceExerciseBy(gym) {
    return Exercise.findOne({
      __t: ExerciseGroupTypeEnum.TrainingExercise.name
    })
      .isReference()
      .inThisGymId(gym._id).populate('machines')
      .then(exercise => {
        return exercise;
      },
      error => {
        throw TechnicalError(error.message);
      })
      .catch(error => {
        throw error;
      });
  }

	/**
	 * Find exercises which have this machine.
	 * @param machine
	 * @returns {Promise.<Exercise[]>|Promise}
	 */
	static findExercisesBy(machine) {
		return Exercise.find({})
			.hasThisMachineId(machine._id).populate('machines')
			.then(exercises => {
					return exercises;
				},
				error => {
					throw TechnicalError(error.message);
				})
			.catch(error => {
				throw error;
			});
	}

  /**
   * To one session
   * @param {{muscle: MuscleEnum, intensity:DifficultyEnum, nbOfExercises:number}} muscleRepartition
   * @param {Array<{muscle: MuscleEnum, intensity:DifficultyEnum, nbOfExercises:number}>} alreadyWorkedMuscles
   * @param {Gym} gym
   * @returns {Promise|Promise.<Array<Exercise>>}
   */
  static findReferenceExercisesByMuscleRepartionWichAreNotAlreadyWorkedHard(muscleRepartition, alreadyWorkedMuscles, gym) {
    let criterias = `Find ${muscleRepartition.nbOfExercises} references exercises : ${muscleRepartition.muscle.toString()} => ${muscleRepartition.intensity.toString()}`;
    let filteredExercises = [];
    return Exercise.find()
      .muscleWorkedBy(muscleRepartition.muscle.toString(), muscleRepartition.intensity.toString())
      .inThisGymId(gym._id)
      .isReference()
      .excludeThisWorkedMuscles(muscleRepartition.excludesThisWorkedMuscles)
      .populate('machines')
      .limit(muscleRepartition.nbOfExercises)
      .sort({ priorityInProgramAutoGeneration: -1 })
      .then(
      exercises => {
        winston.log('debug', `To ${criterias}, ${exercises.length} exercices finded.`);
        if (_.isEmpty(exercises)) {
          return [];
        }
        filteredExercises = exercises.filter(exercise => {
          if (exercise.__t !== ExerciseGroupTypeEnum.CardioExercise.name) {
            return ExerciseService._filterExerciseAlreadyWorkedHard(exercise, alreadyWorkedMuscles)
          }
          return true;
        });
        return filteredExercises;
      },
      error => {
        throw new TechnicalError(error.message);
      })
      .catch(error => {
        throw error;
      });
  }


	/**
	 *
	 * @param {Exercise} exercise
	 * @param {Array<{muscle: MuscleEnum, intensity:DifficultyEnum, nbOfExercises:number}>} alreadyWorkedMuscles
	 * @returns {boolean}
	 * @private
	 */
	static _filterExerciseAlreadyWorkedHard(exercise, alreadyWorkedMuscles) {
		let alreadyWorked = false;
		exercise.workedMuscles.forEach(workedMuscle => {
			if (ExerciseService._thisMuscleIsAlreadyWorkedWithHardIntensity(workedMuscle, alreadyWorkedMuscles))
				alreadyWorked = true;
		});
		alreadyWorked = false;
		return !alreadyWorked;
	}


  /**
   *
   * @param {string} muscleName
   * @param musclesRepartitionAlreadyWorked
   * @returns {boolean}
   * @private
   */
  static _thisMuscleIsAlreadyWorkedWithHardIntensity(muscleName, musclesRepartitionAlreadyWorked) {
    let musclesRepartitionAlreadyWorkedHard = musclesRepartitionAlreadyWorked.map(muscleRepartitionAlreadyWorked => {
      return muscleRepartitionAlreadyWorked.intensity === DifficultyEnum.HARD;
    });
    return musclesRepartitionAlreadyWorkedHard.includes({ name: muscleName });
  }


	/**
	 * Generate an exercise from raw object.
	 * @param {object} rawObject
	 * @returns {Exercise|null}
	 */
	static generateExerciseFrom(rawObject) {
		let exercise = null;
		switch (rawObject.type) {
			case ExerciseGroupTypeEnum.CardioExercise:
				exercise = new CardioExercise(rawObject);
				break;
			case ExerciseGroupTypeEnum.TrainingExercise:
				exercise = new TrainingExercise(rawObject);
				break;
			case ExerciseGroupTypeEnum.BodybuildingExercise:
				exercise = new BodybuildingExercise(rawObject);
				break;
			case ExerciseGroupTypeEnum.OrganizedExercise:
				exercise = new OrganizedExercise(rawObject);
				break;
		}
		// if (rawObject._id) {
		//   exercise._id = mongoose.Types.ObjectId(rawObject._id);
		//   exercise.isNew = false;
		// }
		return exercise;
	}


	/**
	 * Get an raw object with properties updatable by members.
	 * @param {Exercise|object} rawObject Represent an exercise
	 * @param {string} rawObject.type
	 * @returns {object|null}
	 */
	static getPropertiesUpdatableByMemberOn(rawObject) {
		let exercise = null;
		const type = rawObject.type || rawObject.__t;
		switch (type) {
			case ExerciseGroupTypeEnum.CardioExercise:
			case ExerciseGroupTypeEnum.CardioExercise.name:
				exercise = {
					km: rawObject.km,
					calories: rawObject.calories,
					speed: rawObject.speed,
					recovery: rawObject.recovery,
					times: rawObject.times,
				};
				break;
			case ExerciseGroupTypeEnum.TrainingExercise:
			case ExerciseGroupTypeEnum.TrainingExercise.name:
				exercise = {
					km: rawObject.km,
					calories: rawObject.calories,
					speed: rawObject.speed,
					recovery: rawObject.recovery,
					times: rawObject.times
				};
				break;
			case ExerciseGroupTypeEnum.BodybuildingExercise:
			case ExerciseGroupTypeEnum.BodybuildingExercise.name:
				exercise = {
					repetitions: rawObject.repetitions,
					series: rawObject.series,
					weight: rawObject.weight,
					recoveryTimesBetweenEachSeries: rawObject.recoveryTimesBetweenEachSeries
				};
				break;
			case ExerciseGroupTypeEnum.OrganizedExercise:
			case ExerciseGroupTypeEnum.OrganizedExercise.name:
				exercise = {
					difficulty: rawObject.difficulty,
					approximateTime: rawObject.approximateTime
				};
				break;
		}
		return exercise;
	}


	/**
	 Generate an exercise, no persisted
	 * @param {string} name
	 * @param {Array} machines
	 * @param {Object} exerciseProperties
	 * @param {ExerciseGroupTypeEnum} exerciseProperties.type
	 * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
	 * @param {number} [exerciseProperties.weight]
	 * @param {number} [exerciseProperties.phase]
	 * @param {number} [exerciseProperties.reference]
	 * @param {Gym} [exerciseProperties.gym]
	 * @param {ObjectiveEnum} objective
	 * @returns {Promise|Promise.<Exercise>}
	 */
	static generateExerciseFromReferencesInformationsBy(name, machines, exerciseProperties, objective) {
		//todo use global.exercisesReferencesInformations = exercisesReferencesInformations; ?
		switch (exerciseProperties.type) {
			case ExerciseGroupTypeEnum.CardioExercise:
				return ExerciseService.generateCardioExercise(name, machines, exerciseProperties);
			case ExerciseGroupTypeEnum.TrainingExercise:
				return ExerciseService.generateTrainingExercise(name, machines, exerciseProperties, objective);
			case ExerciseGroupTypeEnum.BodybuildingExercise:
				return ExerciseService.generateBodybuildingExercise(name, machines, exerciseProperties);
			case ExerciseGroupTypeEnum.OrganizedExercise:
				return ExerciseService.generateOrganizedExercise(name, machines, exerciseProperties);
		}
		return Promise.reject(new TechnicalError('Type of exercise not found'));
	}


  /**
   * Generate an exercise, no persisted
   * @param name
   * @param machines
   * @param {Object} exerciseProperties
   * @param {ExerciseGroupTypeEnum} exerciseProperties.type
   * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
   * @param {number} [exerciseProperties.km]
   * @param {number} [exerciseProperties.phase]
   * @param {number} [exerciseProperties.reference]
   * @param {Gym} [exerciseProperties.gym]
   * @returns {Promise|Promise.<CardioExercise>}
   */
  static generateCardioExercise(name, machines, exerciseProperties) {
    return ExerciseInformationReferenceService.findBy({
      __t: ExerciseReferenceInformationEnum.Cardio.name
    })
      .then(exerciseReferenceInformation => {
        let exercise = new CardioExercise({
          session: exerciseProperties.session,
          program: exerciseProperties.program,
          workedMuscles: exerciseProperties.workedMuscles,
          reference: exerciseProperties.reference ? exerciseProperties.reference : false,
          name: name,
          machines: machines,
          km: exerciseProperties.km ? exerciseProperties.km : exerciseReferenceInformation[0].km,
          calories: exerciseReferenceInformation[0].calories,
          speed: exerciseReferenceInformation[0].speed,
          recovery: exerciseReferenceInformation[0].recovery,
          times: exerciseReferenceInformation[0].times,
          _gym: exerciseProperties.gym,
          order: exerciseProperties.order
        });
        if (exerciseProperties.priorityInProgramAutoGeneration !== undefined && exerciseProperties.priorityInProgramAutoGeneration !== null) {
          exercise.priorityInProgramAutoGeneration = exerciseProperties.priorityInProgramAutoGeneration;
        }
        return exercise;
      })
      .catch(error => {
        throw error;
      });
  }


  /**
   * Generate an exercise, no persisted
   * @param name
   * @param machines
   * @param {Object} exerciseProperties
   * @param {ExerciseGroupTypeEnum} exerciseProperties.type
   * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
   * @param {number} [exerciseProperties.weight]
   * @param {number} [exerciseProperties.phase]
   * @param {number} [exerciseProperties.reference]
   * @param {Gym} [exerciseProperties.gym]
   * @param {ObjectiveEnum} objective
   * @returns {Promise|Promise.<CardioExercise>}
   */
  static generateTrainingExercise(name, machines, exerciseProperties, objective) {
    //todo create exercises references information to training
    return ExerciseInformationReferenceService.findBy({
      __t: ExerciseReferenceInformationEnum.Cardio.name,
      objective: objective.name
    })
      .then(exerciseReferenceInformation => {
        let exercise = new TrainingExercise({
          session: exerciseProperties.session,
          program: exerciseProperties.program,
          workedMuscles: exerciseProperties.workedMuscles,
          reference: exerciseProperties.reference ? exerciseProperties.reference : false,
          name: name,
          machines: machines,
          km: exerciseReferenceInformation[0].km,
          calories: exerciseReferenceInformation[0].calories,
          speed: exerciseReferenceInformation[0].speed,
          recovery: exerciseReferenceInformation[0].recovery,
          times: exerciseReferenceInformation[0].times[0],
          _gym: exerciseProperties.gym,
          order: exerciseProperties.order
        });
        if (exerciseProperties.priorityInProgramAutoGeneration !== undefined && exerciseProperties.priorityInProgramAutoGeneration !== null) {
          exercise.priorityInProgramAutoGeneration = exerciseProperties.priorityInProgramAutoGeneration;
        }
        return exercise;
      })
      .catch(error => {
        throw error;
      });
  }


	/**
	 * Generate an exercise, no persisted
	 * @param name
	 * @param machines
	 * @param {Object} exerciseProperties
	 * @param {ExerciseGroupTypeEnum} exerciseProperties.type
	 * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
	 * @param {number} [exerciseProperties.weight]
	 * @param {number} [exerciseProperties.phase]
	 * @param {number} [exerciseProperties.reference]
	 * @param {Gym} [exerciseProperties.gym]
	 * @returns {Promise.<BodybuildingExercise>}
	 */
	static generateBodybuildingExercise(name, machines, exerciseProperties) {
		return ExerciseInformationReferenceService.findBy({
			__t: ExerciseReferenceInformationEnum.Bodybuilding.name,
			phase: 1,
			objective: ObjectiveEnum.MassGainer.toString()
		}).then(exerciseReferenceInformation => {
			if (!exerciseReferenceInformation.length) {
				throw new NotFoundError(`No ExerciseInformationReferenceService found with this criterias : 
          { __t: '${ExerciseReferenceInformationEnum.Bodybuilding.name}', phase: 1 }`
        );
      }
      let exercise = new BodybuildingExercise({
        workedMuscles: exerciseProperties.workedMuscles,
        session: exerciseProperties.session,
        program: exerciseProperties.program,
        name: name,
        machines: machines,
        reference: exerciseProperties.reference ? exerciseProperties.reference : false,
        series: exerciseReferenceInformation[0].series,
        repetitions: exerciseReferenceInformation[0].repetitions,
        recoveryTimesBetweenEachSeries: exerciseReferenceInformation[0].recoveryTimesBetweenEachSeries,
        finalRecoveryTimes: exerciseReferenceInformation[0].finalRecoveryTimes,
        approximateTimeBySeries: exerciseReferenceInformation[0].approximateTimeBySeries,
        weight: exerciseProperties.weight,
        _gym: exerciseProperties.gym,
        order: exerciseProperties.order
      });
      if (exerciseProperties.priorityInProgramAutoGeneration !== undefined && exerciseProperties.priorityInProgramAutoGeneration !== null) {
        exercise.priorityInProgramAutoGeneration = exerciseProperties.priorityInProgramAutoGeneration;
      }
      return exercise;
    }).catch(error => {
      throw error;
    })
  }


  /**
   * Generate an exercise, no persisted
   * @param name
   * @param machines
   * @param {Object} exerciseProperties
   * @param {ExerciseGroupTypeEnum} exerciseProperties.type
   * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
   * @param {number} [exerciseProperties.difficulty]
   * @param {number} [exerciseProperties.approximateTime]
   * @param {number} [exerciseProperties.reference]
   * @returns {Promise|Promise.<CardioExercise>}
   */
  static generateOrganizedExercise(name, machines, exerciseProperties) {
    return ExerciseInformationReferenceService.findBy({
      __t: ExerciseReferenceInformationEnum.Organized.name
    })
      .then(exerciseReferenceInformation => {
        let exercise = new OrganizedExercise({
          session: exerciseProperties.session,
          program: exerciseProperties.program,
          workedMuscles: exerciseProperties.workedMuscles,
          reference: exerciseProperties.reference ? exerciseProperties.reference : false,
          name: name,
          machines: machines,
          approximateTime: exerciseReferenceInformation[0].approximateTime,
          difficulty: exerciseReferenceInformation[0].difficulty,
          _gym: exerciseProperties.gym,
          order: exerciseProperties.order
        });
        if (exerciseProperties.priorityInProgramAutoGeneration !== undefined && exerciseProperties.priorityInProgramAutoGeneration !== null) {
          exercise.priorityInProgramAutoGeneration = exerciseProperties.priorityInProgramAutoGeneration;
        }
        return exercise;
      })
      .catch(error => {
        throw error;
      });
  }

	/**
	 * Save an array of exercise and resolve when all are saved.
	 * @param {Array<Exercise>} exercises
	 * @returns {Promise|Promise.<Array<Exercise>>}
	 */
	static saveExercises(exercises) {
		let promises = [];
		exercises.forEach(exercise => promises.push(exercise.save()));
		return Promise.all(promises)
			.catch(error => {
				throw new TechnicalError(error.message);
			});
	}
}

module.exports = ExerciseService;