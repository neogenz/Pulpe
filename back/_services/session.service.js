'use strict';

const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const Session = require('../_model/Session');
const Exercise = require('../_model/Exercise');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const MuscleEnum = require('../_enums/MuscleEnum');
const moment = require('moment');
const SessionTypeEnum = require('../_enums/SessionTypeEnum');
const SessionGenerationContext = require('../_contextExecutionClass/SessionGenerationContext');
const ExerciseService = require('../_services/exercise.service');

class SessionService {
  constructor() {

  }

  /**
   * Generate more sessions
   * @param {number} nbSessions
   * @param {ObjectiveEnum} objective
   * @param {Gym} gym
   * @returns {Promise<Array<SessionGenerationContext>>}
   */
  static generateSessionsBy(nbSessions, objective, gym) {
    console.info(`Generation of session to ${nbSessions} sessions by week with ${objective.toString()} objective.`);
    let sessionsGenerationConfigs = SessionService.getSessionsGenerationConfigsBySessionAndObjective(nbSessions, objective);
    let days = SessionService.getDaysSessionRepartitionBy(nbSessions);
    return SessionService._generateSessionGenerationContextBy(days, sessionsGenerationConfigs, objective, gym)
      .then((sessionsGenerationContext) => {
        return sessionsGenerationContext.map(sessionGenerationContext => sessionGenerationContext.session);
      });
  }


  /**
   *
   * @param {Array<string>} days
   * @param {Array<{
   *    sessionType:ExerciseGroupTypeEnum,
   *    training:boolean,
   *    gym:Gym,
   *    musclesRepartition:[{muscle: MuscleEnum, intensity:DifficultyEnum, nbOfExercises:number}]
   * }>} sessionsGenerationConfigs
   * @param {ObjectiveEnum} objective
   * @returns {Promise<Array<SessionGenerationContext>>}
   * @private
   */
  static _generateSessionGenerationContextBy(days, sessionsGenerationConfigs, objective, gym) {
    let sessionsGenerationContextWithoutExercises = [];
    merge(days, sessionsGenerationConfigs, (day, sessionGenerationConfig) => {
      sessionsGenerationContextWithoutExercises.push(
        new SessionGenerationContext(
          new Session({
            day: day,
            sessionType: sessionGenerationConfig.sessionType,
            mainMusclesGroup: sessionGenerationConfig.muscles.map(muscle => muscle.muscle),
            training: sessionGenerationConfig.training
          }),
          sessionGenerationConfig.muscles,
          gym)
      );
    });
    return SessionService._fillExercisesIntoSessionGenerationContextBy(sessionsGenerationContextWithoutExercises, objective)
      .then((sessionsGenerationContext) => {
        return sessionsGenerationContext;
      })
  }


  /**
   *
   * @param {Array<SessionGenerationContext>} sessionsGenerationContextWithoutExercises
   * @param {ObjectiveEnum} objective
   * @returns {Promise<Array<SessionGenerationContext>>} sessionsGenerationContext
   * @private
   */
  static _fillExercisesIntoSessionGenerationContextBy(sessionsGenerationContextWithoutExercises, objective) {
    let exercisesGeneratedPromises = [];
    sessionsGenerationContextWithoutExercises.forEach(sessionGenerationContext => {
      exercisesGeneratedPromises.push(ExerciseService.generateExercisesBy(
        sessionGenerationContext,
        objective
        ).then(exercises => {
          sessionGenerationContext.session.exercises = exercises;
        })
      );
    });
    return Promise.all(exercisesGeneratedPromises).then(() => {
      return sessionsGenerationContextWithoutExercises;
    })
  }


  /**
   *
   * @param nbSeance
   * @param objectiveEnum
   * @returns {Array<{
   *    sessionType:ExerciseGroupTypeEnum,
   *    training:boolean,
   *    musclesRepartition:[{muscle: MuscleEnum, intensity:DifficultyEnum, nbOfExercises:number}]
   * }>} sessionsGenerationConfigs
   */
  static getSessionsGenerationConfigsBySessionAndObjective(nbSeance, objectiveEnum) {
    let sessionsRepartition = [];
    switch (objectiveEnum) {
      case ObjectiveEnum.GeneralForm:
        sessionsRepartition = SessionService.getMuscularGroupSessionRepartitionToMassGainerBy(nbSeance);
        break;
      case ObjectiveEnum.WeightLoss:
        sessionsRepartition = SessionService.getMuscularGroupSessionRepartitionToMassGainerBy(nbSeance);
        break;
      case ObjectiveEnum.MassGainer:
        sessionsRepartition = SessionService.getMuscularGroupSessionRepartitionToMassGainerBy(nbSeance);
        break;
    }
    return sessionsRepartition;
  }


  /**
   * todo : Store this informations in database and use them
   * @param nbSessions
   * @returns {Array<{
   *    sessionType:ExerciseGroupTypeEnum,
   *    training:boolean,
   *    musclesRepartition:[{muscle: MuscleEnum, intensity:DifficultyEnum, nbOfExercises:number}]
   * }>}
   */
  //todo pass this to db ?
  static getMuscularGroupSessionRepartitionToMassGainerBy(nbSessions) {
    let muscularsGroupsSession = [];
    if (nbSessions >= 1 && nbSessions <= 2) {
      muscularsGroupsSession = [
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          musclesRepartition: [{
            muscle: MuscleEnum.Pecs,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.Biceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.Deltoid,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.Lumbar,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          musclesRepartition: [{
            muscle: MuscleEnum.ThighBiceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.ThighQuadriceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.GluteusMaximus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.GluteusMedius,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        }
      ];
    }
    if (nbSessions >= 3 && nbSessions <= 4) {
      muscularsGroupsSession = [
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Pecs,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.Biceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Deltoid,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.Traps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Lumbar,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.LatissimusDorsi,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.ThighQuadriceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.GluteusMedius,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        }
      ];
    }
    if (nbSessions === 5) {
      muscularsGroupsSession = [
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Pecs,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.Triceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Deltoid,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.Traps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Lumbar,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.LatissimusDorsi,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.ThighQuadriceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Biceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.GluteusMedius,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        }
      ];
    }
//todo make an session to 6 or more frequency, because it's same than 5 for the moment
    if (nbSessions > 6) {
      muscularsGroupsSession = [
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Pecs,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.Triceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Deltoid,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.Traps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Lumbar,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.LatissimusDorsi,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.ThighQuadriceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        },
        {
          sessionType: SessionTypeEnum.Bodybuilding.name,
          muscles: [{
            muscle: MuscleEnum.Biceps,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 2
          }, {
            muscle: MuscleEnum.GluteusMedius,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }, {
            muscle: MuscleEnum.RectusAbdominus,
            intensity: DifficultyEnum.HARD,
            nbOfExercises: 1
          }],
          training: true
        }
      ];
    }
    return muscularsGroupsSession;
  }

  /**
   * todo:Get this by planning
   * @param nbSessions
   * @returns {Array}
   */
  static  getDaysSessionRepartitionBy(nbSessions) {
    let daysSessionRepartition = [];
    switch (nbSessions) {
      case 1:
        daysSessionRepartition = ['Mercredi'];
        break;
      case 2:
        daysSessionRepartition = ['Mardi', 'Jeudi'];
        break;
      case 3:
        daysSessionRepartition = ['Lundi', 'Mercredi', 'Vendredi'];
        break;
      case 4:
        daysSessionRepartition = ['Lundi', 'Mardi', 'Jeudi', 'Vendredi'];
        break;
      case 5:
        daysSessionRepartition = ['Lundi', 'Mardi', 'Mercredi', 'Vendredi', 'Samedi'];
        break;
      case 6:
        daysSessionRepartition = ['Lundi', 'Mardi', 'Mercredi', 'Vendredi', 'Samedi', 'Dimanche'];
        break;
      case 6:
        daysSessionRepartition = ['Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi', 'Dimanche'];
        break;
    }
    return daysSessionRepartition;
  }
}

module.exports = SessionService;

/**
 *  @desc Make an matching between two arrays, and apply mergingCallback on each element.
 *  @example
 *  let a = ['to','mo','lo'];
 *  let b = [3,4];
 *  let result = [];
 *  merge(a, b, (aCurrent, bCurrent) => {
 *    let obj = {};
 *    obj[aCurrent] = bCurrent;
 *    result.push(obj);
 *  });
 *  // result = [{to: 3}, {mo: 4}, {lo: 3}]
 * @param {Array<L>} first
 * @param {Array<M>} second
 * @param {function(currentFirst:L, currentSecond:M)} mergingCallback
 */
function merge(first, second, mergingCallback) {
  let firstAndSecondAreInversed = false;
  let smaller = [];
  let bigger = [];
  if (first.length < second.length) {
    smaller = first;
    bigger = second;
  } else if (first.length > second.length) {
    firstAndSecondAreInversed = true;
    smaller = second;
    bigger = first;
  } else if (first.length === second.length) {
    smaller = first;
    bigger = second;
  }
  _merge(smaller, bigger, 0, 0, mergingCallback, firstAndSecondAreInversed);

  function _merge(smaller, bigger, smallerIndex, biggerIndex, mergingCallback, firstAndSecondAreInversed) {
    while (smallerIndex < smaller.length && biggerIndex < bigger.length) {
      if (firstAndSecondAreInversed) {
        mergingCallback(bigger[biggerIndex], smaller[smallerIndex]);
      } else {
        mergingCallback(smaller[smallerIndex], bigger[biggerIndex]);
      }
      smallerIndex++;
      biggerIndex++;
    }

    if (smallerIndex < bigger.length && biggerIndex < bigger.length) {
      _merge(smaller, bigger, 0, biggerIndex, mergingCallback, firstAndSecondAreInversed);
    }
  }
}

