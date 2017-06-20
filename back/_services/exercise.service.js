'use strict';

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
const SessionError = require('../_model/Errors').TechnicalError;
const ExerciseReferenceInformationEnum = require('../_enums/ExerciseReferenceInformationEnum');
const _ = require('underscore');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const MuscleEnum = require('../_enums/MuscleEnum');

class ExerciseService {
  constructor() {
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
   * @param {number} [exerciseProperties.reference]
   * @param {number} [exerciseProperties.reference]
   * @returns {Promise|Promise.<Exercise>}
   */
  static createExerciseBy(name, machines, exerciseProperties) {
    //todo Do not create with hardcoded objective, but to all know objectives
    return ExerciseService.generateExerciseFromReferencesInformationsBy(name, machines, exerciseProperties, ObjectiveEnum.MassGainer)
      .then(exercise => {
        return exercise.save();
      }, error => {
        throw new TechnicalError(error.message);
      })
      .catch(error => {
        throw error;
      })
  }


  /**
   * Find exercises list corresponding to criterias
   * @param {Array<MuscleEnum>} muscleGroup
   * @param {DifficultyEnum} difficulty
   * @returns {Promise<Array<Exercise>>}
   */
  static findWorkedExercisesByWorkedMuscleGroupAndIntensity(muscleGroup, difficulty) {
    return Exercise.find({'reference': true}).populate('machines').and([
      {
        'workedMuscles.name': {
          $in: muscleGroup.map(muscle => {
            return muscle.toString()
          })
        }
      },
      {'workedMuscles.intensity': difficulty.toString()}
    ]).then(
      exercises => {
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
   * Find exercises list corresponding to criterias
   * @param {Array<[]>} criterias
   * @param {number} limit
   * @returns {Promise<Array<Exercise>>}
   */
  static findReferenceExcercisesLimitedBy(criterias, limit) {
    return Exercise.find({'reference': true}).populate('machines').and(criterias).limit(limit).then(
      exercises => {
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
   * Find exercise wich can be used to training
   * @param {DifficultyEnum} difficulty
   * @returns {Promise<Array<Exercise>>}
   */
  static findOneTrainingReferenceExercise(difficulty) {
    return Exercise.findOne({
      reference: true,
      __t: ExerciseGroupTypeEnum.TrainingExercise.name
    }).populate('machines')
      .then(
        exercises => {
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
   * Generate a pool of exercises, no persisted
   * @param {Session} session
   * @param {DifficultyEnum} difficulty
   * @param objective
   * @returns {Promise.<Array<Exercise>>|Promise}
   */
  static generateExercisesBy(session, difficulty, objective) {
    let exercisesGeneratedPromises = [];
    return this._findReferenceExercisesBy(session, difficulty)
      .then(exercises => {
          exercises.forEach(exercise => {
            if (exercise !== null && exercise !== undefined) {
              exercisesGeneratedPromises.push(
                ExerciseService.generateExerciseFromReferencesInformationsBy(exercise.name, exercise.machines, {
                  type: ExerciseGroupTypeEnum.fromName(exercise.__t),
                  workedMuscles: exercise.workedMuscles,
                  weight: exercise.weight
                }, objective)
              );
            }
          });
          return Promise.all(exercisesGeneratedPromises);
        },
        error => {
          throw TechnicalError(error.message);
        })
      .then(exercisesCreated => {
          return exercisesCreated;
        },
        error => {
          throw new TechnicalError(error.message);
        })
      .catch(error => {
        console.error(error.stack);
        throw error;
      });
  }


  /**
   * Find reference exercises
   * @param session
   * @param difficulty
   * @returns {Promise.<Exercise>|Promise}
   * @private
   */
  static _findReferenceExercisesBy(session, difficulty) {
    let exercisesPromises = [];
    if (session.training) {
      console.info(`The session need training exercise.`);
      exercisesPromises.push(ExerciseService.findOneTrainingReferenceExercise(difficulty));
    }
    switch (session.sessionType) {
      case SessionTypeEnum.Cardio.name:
        //todo add some organized exercise
        console.info(`The session is of cardio type.`);
        //todo add CARDIO to muscle worked on this session, and get just 2 exercises of type cardio
        //exercisesPromises.push(ExerciseService.findReferenceCardioExercisesByLimit(2));
        exercisesPromises.push(ExerciseService.findReferencesExercisesToCardioSessionBy(session.mainMusclesGroup));
        //exercisesPromises.push(ExerciseService.findWorkedExercisesByWorkedMuscleGroupAndIntensity(session.mainMusclesGroup, DifficultyEnum.MEDIUM));
        break;
      case SessionTypeEnum.Bodybuilding.name:
        console.info(`The session is of bodybuilding type.`);
        exercisesPromises.push(ExerciseService.findReferencesExercisesToBodybuildingSessionBy(session.mainMusclesGroup));
        break;
      default:
        console.error(`This sessionType is unknown ${session.sessionType}`);
        throw new SessionError(`This sessionType is unknown ${session.sessionType}`);
        break;
    }
    return Promise.all(exercisesPromises).then(exercisesFinded => {
      let exercises = _.flatten(exercisesFinded);
      return exercises.filter(exercise => exercise !== null);
    });
  }

  static findReferenceCardioExercisesByLimit(nbToFind) {
    return Exercise.findOne({
      reference: true,
      __t: ExerciseGroupTypeEnum.CardioExercise.name
    }).populate('machines')
      .limit(nbToFind)
      .then(
        exercises => {
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
   *
   * @param {Array<MuscleEnum>} musclesGroup
   */
  //todo refactor
  static findReferencesExercisesToCardioSessionBy(musclesGroup) {
    let muscleAlreadyWorked = [];
    let exercisesPromises = [];
    let criterias = [];
    musclesGroup.forEach(muscle => {
      if (muscle === MuscleEnum.CARDIO.toString()) {
        criterias = [
          {'workedMuscles.name': muscle.toString()},
          {'workedMuscles.intensity': DifficultyEnum.HARD.toString()},
          {
            'workedMuscles.name': {
              $nin: muscleAlreadyWorked.map(muscle => {
                return muscle.toString()
              })
            }
          }
        ];
        exercisesPromises.push(ExerciseService.findReferenceExcercisesLimitedBy(criterias, 2));
      } else {
        criterias = [
          {'workedMuscles.name': muscle.toString()},
          {'workedMuscles.intensity': DifficultyEnum.MEDIUM.toString()},
          {
            'workedMuscles.name': {
              $nin: muscleAlreadyWorked.map(muscle => {
                return muscle.toString()
              })
            }
          }
        ];
        exercisesPromises.push(ExerciseService.findReferenceExcercisesLimitedBy(criterias, 1));
      }
      muscleAlreadyWorked = muscleAlreadyWorked.concat([muscle]);
    });
    return Promise.all(exercisesPromises);
  }

  /**
   *
   * @param {Array<MuscleEnum>} musclesGroup
   */
  //todo refactor
  static findReferencesExercisesToBodybuildingSessionBy(musclesGroup) {
    let muscleAlreadyWorked = [];
    let exercisesPromises = [];
    let criterias = [];
    musclesGroup.forEach(muscle => {
      criterias = [
        {'workedMuscles.name': muscle.toString()},
        {'workedMuscles.intensity': DifficultyEnum.HARD.toString()},
        {
          'workedMuscles.name': {
            $nin: muscleAlreadyWorked.map(muscle => {
              return muscle.toString()
            })
          }
        }
      ];
      exercisesPromises.push(ExerciseService.findReferenceExcercisesLimitedBy(criterias, 1));
      muscleAlreadyWorked = muscleAlreadyWorked.concat([muscle]);
    });
    return Promise.all(exercisesPromises);
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
    }
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
   * @returns {Promise|Promise.<CardioExercise>}
   */
  static generateCardioExercise(name, machines, exerciseProperties) {
    return ExerciseInformationReferenceService.findBy({
      __t: ExerciseReferenceInformationEnum.Cardio.name
    })
      .then(exerciseReferenceInformation => {
        let exercise = new CardioExercise({
          workedMuscles: exerciseProperties.workedMuscles,
          reference: exerciseProperties.reference ? exerciseProperties.reference : false,
          name: name,
          machines: machines,
          km: exerciseReferenceInformation[0].km,
          calories: exerciseReferenceInformation[0].calories,
          speed: exerciseReferenceInformation[0].speed,
          recovery: exerciseReferenceInformation[0].recovery,
          times: exerciseReferenceInformation[0].times
        });
        return exercise;
      })
      .catch(error => {
        console.error(error.stack);
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
          workedMuscles: exerciseProperties.workedMuscles,
          reference: exerciseProperties.reference ? exerciseProperties.reference : false,
          name: name,
          machines: machines,
          km: exerciseReferenceInformation[0].km,
          calories: exerciseReferenceInformation[0].calories,
          speed: exerciseReferenceInformation[0].speed,
          recovery: exerciseReferenceInformation[0].recovery,
          times: exerciseReferenceInformation[0].times[0]
        });
        return exercise;
      })
      .catch(error => {
        console.error(error.stack);
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
      // let massGainerExercisesRefInfo = exerciseReferenceInformation.find(currentRefInfo => {
      //   return currentRefInfo.objective === ObjectiveEnum.MassGainer.toString()
      // });
      // if (!massGainerExercisesRefInfo) {
      //   throw new NotFoundError(`No ExerciseInformationReferenceService to ${ObjectiveEnum.MassGainer.toString()} objective found with this criterias :
      //     { __t: '${ExerciseReferenceInformationEnum.Bodybuilding.name}', phase: 1 }`
      //   );
      // }

      let exercise = new BodybuildingExercise({
        workedMuscles: exerciseProperties.workedMuscles,
        name: name,
        machines: machines,
        reference: exerciseProperties.reference ? exerciseProperties.reference : false,
        series: exerciseReferenceInformation[0].series,
        repetitions: exerciseReferenceInformation[0].repetitions,
        recoveryTimesBetweenEachSeries: exerciseReferenceInformation[0].recoveryTimesBetweenEachSeries,
        finalRecoveryTimes: exerciseReferenceInformation[0].finalRecoveryTimes,
        approximateTimeBySeries: exerciseReferenceInformation[0].approximateTimeBySeries,
        weight: exerciseProperties.weight
      });

      return exercise;
    }).catch(error => {
      console.error(error.stack);
      throw error;
    })
  }


  static saveExercises(exercises) {
    let promises = [];
    exercises.forEach(exercise => promises.push(exercise.save()));
    return Promise.all(promises)
      .catch(error => {
        console.error(error.stack);
        throw new TechnicalError(error.message);
      });
  }
}

module.exports = ExerciseService;