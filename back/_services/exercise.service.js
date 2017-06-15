'use strict';

const Exercise = require('../_model/Exercise');
const BodybuildingExercise = require('../_model/BodybuildingExercise');
const CardioExercise = require('../_model/CardioExercise');
const MachineService = require('../_services/machine.service');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const BodybuildingExerciseReferenceInformation = require('../_model/exercisesReferencesInformations/BodybuildingExerciseReferenceInformation');
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const ExerciseInformationReferenceService = require('../_services/exerciseReferenceInformation.service');
const NotFoundError = require('../_model/Errors').NotFoundError;
const TechnicalError = require('../_model/Errors').TechnicalError;
const ExerciseReferenceInformationEnum = require('../_enums/ExerciseReferenceInformationEnum');

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
    return ExerciseService.generateExerciseBy(name, machines, exerciseProperties)
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
   * @param {Array<{
   *          training: boolean,
   *          muscles: Array<MuscleEnum>
   *        }>} muscleGroup
   * @param {DifficultyEnum} difficulty
   * @returns {Promise<Array<Exercise>>}
   */
  static findExercisesByWorkedMuscleGroupAndIntensity(muscleGroup, difficulty) {
    return Exercise.find({'reference': true}).populate('machines').and([
      {
        'workedMuscles.name': {
          $in: muscleGroup.muscles.map(muscle => {
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
   * Generate more exercises, no persisted
   * @param muscleGroup
   * @param difficulty
   * @param objective
   * @returns {Promise.<Array<Exercise>>|Promise}
   */
  static generateExercisesBy(muscleGroup, difficulty, objective) {
    return ExerciseService.findExercisesByWorkedMuscleGroupAndIntensity(muscleGroup, difficulty)
      .then(exercises => {
          let exercisesCreatedPromises = [];
          exercises.forEach(exercise => {
            switch (objective) {
              case ObjectiveEnum.MassGainer:
                exercisesCreatedPromises.push(
                  ExerciseService.generateExerciseBy(exercise.name, exercise.machines, {
                    type: ExerciseGroupTypeEnum.fromName(exercise.__t),
                    workedMuscles: exercise.workedMuscles,
                    weight: exercise.weight
                  })
                );
                break;
            }
          });
          return Promise.all(exercisesCreatedPromises);
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
        throw error;
      });
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
   * @param {number} [exerciseProperties.reference]
   * @returns {Promise|Promise.<Exercise>}
   */
  static generateExerciseBy(name, machines, exerciseProperties) {
    switch (exerciseProperties.type) {
      case ExerciseGroupTypeEnum.CardioExercise:
        return ExerciseService.generateCardioExercise(name, machines, exerciseProperties);
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
      phase: 1
    }).then(exerciseReferenceInformation => {
      if (!exerciseReferenceInformation.length) {
        throw new NotFoundError(`No ExerciseInformationReferenceService found with this criterias : 
          { __t: '${ExerciseReferenceInformationEnum.Bodybuilding.name}', phase: 1 }`
        );
      }
      let massGainerExercisesRefInfo = exerciseReferenceInformation.find(currentRefInfo => {
        return currentRefInfo.objective === ObjectiveEnum.MassGainer.toString()
      });
      if (!massGainerExercisesRefInfo) {
        throw new NotFoundError(`No ExerciseInformationReferenceService to ${ObjectiveEnum.MassGainer.toString()} objective found with this criterias : 
          { __t: '${ExerciseReferenceInformationEnum.Bodybuilding.name}', phase: 1 }`
        );
      }

      let exercise = new BodybuildingExercise({
        workedMuscles: exerciseProperties.workedMuscles,
        name: name,
        machines: machines,
        reference: exerciseProperties.reference ? exerciseProperties.reference : false,
        series: massGainerExercisesRefInfo.series,
        repetitions: massGainerExercisesRefInfo.repetitions,
        recoveryTimesBetweenEachSeries: massGainerExercisesRefInfo.recoveryTimesBetweenEachSeries,
        finalRecoveryTimes: massGainerExercisesRefInfo.finalRecoveryTimes,
        approximateTimeBySeries: massGainerExercisesRefInfo.approximateTimeBySeries,
        weight: exerciseProperties.weight
      });

      return exercise;
    }).catch(error => {
      throw error;
    })
  }


  static saveExercises(exercises) {
    let promises = [];
    exercises.forEach(exercise => promises.push(exercise.save()));
    return Promise.all(promises).catch(error => {
      console.error(error.message);
      throw new TechnicalError(error.message);
    });
  }
}

module.exports = ExerciseService;