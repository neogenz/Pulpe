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

class ExerciseService {
  constructor() {
  }

  /**
   * @param name
   * @param exerciseType
   * @param machines
   * @param {Object} exerciseProperties
   * @param {ExerciseGroupTypeEnum} exerciseProperties.type
   * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
   * @param {number} [exerciseProperties.weight]
   * @param {number} [exerciseProperties.phase]
   * @returns {*|Promise}
   */
  static createExerciseToAllObjectiveBy(name, machines, exerciseProperties) {
    let exercisesSavedPromises = [];
    Object.keys(ObjectiveEnum).forEach(currentObjectiveEnumKey => {
      exercisesSavedPromises.push(ExerciseService.createExerciseBy(name, machines, exerciseProperties, ObjectiveEnum[currentObjectiveEnumKey]));
    });
    return Promise.all(exercisesSavedPromises);
    /*switch (objective) {
     case ObjectiveEnum.MassGainer:
     return ExerciseService.createExerciseToMassGainerObjective(name, machines, exerciseProperties);
     }*/
  }

  /**
   * @param {string} name
   * @param {Array} machines
   * @param {Object} exerciseProperties
   * @param {ExerciseGroupTypeEnum} exerciseProperties.type
   * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
   * @param {number} [exerciseProperties.weight]
   * @param {number} [exerciseProperties.phase]
   * @returns {Promise|Promise.<Exercise>}
   */
  static createExerciseBy(name, machines, exerciseProperties, objective) {
    switch (exerciseProperties.type) {
      case ExerciseGroupTypeEnum.CD:
        return ExerciseService.createCardioExercise(name, machines, exerciseProperties, objective);
      case ExerciseGroupTypeEnum.BB:
        return ExerciseService.createBodybuildingExercise(name, machines, exerciseProperties, objective);
    }
  }

  /**
   * @param name
   * @param machines
   * @param {Object} exerciseProperties
   * @param {ExerciseGroupTypeEnum} exerciseProperties.type
   * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
   * @param {number} [exerciseProperties.weight]
   * @param {number} [exerciseProperties.phase]
   * @param {ObjectiveEnum} objective
   * @returns {Promise|Promise.<CardioExercise>}
   */
  static createCardioExercise(name, machines, exerciseProperties, objective) {
    return ExerciseInformationReferenceService.findBy({
      __t: 'BodybuildingExerciseReferenceInformation',
      phase: 1
    }).then(exerciseReferenceInformation => {
      return ExerciseInformationReferenceService.findBy({
        __t: 'CardioExerciseReferenceInformation'
      }).then(exerciseReferenceInformation => {
        let exercise = new CardioExercise({
          workedMuscles: exerciseProperties.workedMuscles,
          name: name,
          machines: machines,
          km: exerciseReferenceInformation[0].km,
          calories: exerciseReferenceInformation[0].calories,
          speed: exerciseReferenceInformation[0].speed,
          recovery: exerciseReferenceInformation[0].recovery,
          times: exerciseReferenceInformation[0].times
        });
        return exercise.save();
      })
    }).catch(error => {
      throw error;
    });
  }

  /**
   *
   * @param name
   * @param machines
   * @param {Object} exerciseProperties
   * @param {ExerciseGroupTypeEnum} exerciseProperties.type
   * @param {Array<Exercise>} [exerciseProperties.workedMuscles]
   * @param {number} [exerciseProperties.weight]
   * @param {number} [exerciseProperties.phase]
   * @param {ObjectiveEnum} objective
   * @returns {Promise.<BodybuildingExercise>}
   */
  static createBodybuildingExercise(name, machines, exerciseProperties, objective) {
    return ExerciseInformationReferenceService.findBy({
      __t: 'BodybuildingExerciseReferenceInformation',
      phase: 1
    }).then(exerciseReferenceInformation => {
      if (!exerciseReferenceInformation.length) {
        throw new NotFoundError(`No ExerciseInformationReferenceService found with this criterias : 
          { __t: 'BodybuildingExerciseReferenceInformation', phase: 1 }`
        );
      }
      let massGainerExercisesRefInfo = exerciseReferenceInformation.find(currentRefInfo => {
        return currentRefInfo.objective === objective.toString();
      });
      if (!massGainerExercisesRefInfo) {
        throw new NotFoundError(`No ExerciseInformationReferenceService to ${objective.toString()} objective found with this criterias : 
          { __t: 'BodybuildingExerciseReferenceInformation', phase: 1 }`
        );
      }

      let exercise = new BodybuildingExercise({
        workedMuscles: exerciseProperties.workedMuscles,
        name: name,
        machines: machines,
        series: massGainerExercisesRefInfo.series,
        repetitions: massGainerExercisesRefInfo.repetitions,
        recoveryTimesBetweenEachSeries: massGainerExercisesRefInfo.recoveryTimesBetweenEachSeries,
        finalRecoveryTimes: massGainerExercisesRefInfo.finalRecoveryTimes,
        approximateTimeBySeries: massGainerExercisesRefInfo.approximateTimeBySeries,
        weight: exerciseProperties.weight
      });

      return exercise.save();

    }).catch(error => {
      throw error;
    })
  }

  static createSpecificNumberOfTrainingExercises(number) {
    let exercises = [];
    return MachineService.findSpecificNumberOfMachinesUsableToTraining(number)
      .then(machinesUsable => {
        machinesUsable.forEach((machine, index) => {
          let exercise = new Exercise({
            name: 'Exercise ' + index,
            machines: machine
          });
          exercises.push(exercise);
        });
        return exercises;
      })
      .catch(error => {
        throw error;
      })
  }
}

module.exports = ExerciseService;