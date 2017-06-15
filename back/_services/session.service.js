'use strict';

const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const Session = require('../_model/Session');
const ExerciseService = require('../_services/exercise.service');
const Exercise = require('../_model/Exercise');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const MuscleEnum = require('../_enums/MuscleEnum');
const moment = require('moment');
const SessionError = require('../_model/Errors').SessionError;
const TechnicalError = require('../_model/Errors').TechnicalError;


class SessionService {
  constructor() {

  }

  /**
   * Generate more sessions
   * @param {number} nbSessions
   * @param {ObjectiveEnum} objective
   * @returns {Promise.<Array<Session>>}
   */
  static generateSessionsBy(nbSessions, objective) {
    console.info(`Generation of session to ${nbSessions} sessions by week with ${objective.toString()} objective.`);
    let musclesGroups = SessionService.getMusclesGroupsBySessionAndObjective(nbSessions, objective);
    let sessionsPromises = [];
    let days = SessionService.getDaysSessionRepartitionBy(nbSessions);

    if (musclesGroups.length !== days.length) {
      throw new SessionError(`The muscles groups size (${musclesGroups.length}) is different of days repartition size ${days.length}`);
    }
    /*days.forEach((day, index) => {
     sessionsPromises.push(SessionService.generateOneSessionBy(moment().day(day).toDate(), musclesGroups[index], objective));
     });
     return Promise.all(sessionsPromises);*/
    let sessions = [];
    days.forEach((day, index) => {
      sessions.push(new Session({
        day: day,
        mainMusclesGroup: musclesGroups[index].muscles,
        training: musclesGroups[index].training
      }));
    });
    return sessions;
  }


  /**
   * Generate an session with exercises founded by objective
   * @param {Date} day Only day of week in date is important
   * @param {Array<{
   *          training: boolean,
   *          muscles: Array<MuscleEnum>
   *        }>} muscleGroup
   * @param objective
   * @returns {Promise<Session>}
   */
  static generateOneSessionBy(day, muscleGroup, objective) {
    return ExerciseService.generateExercisesBy(muscleGroup, DifficultyEnum.HARD, objective)
      .then(exercises => {
        return new Session({
          day: day,
          exercises: exercises
        });
      })
      .catch(error => {
        throw error;
      });
  }


  static getMusclesGroupsBySessionAndObjective(nbSeance, objectiveEnum) {
    let sessionsRepartition = [];
    switch (objectiveEnum) {
      case ObjectiveEnum.MassGainer:
        sessionsRepartition = SessionService.getMuscularGroupSessionRepartitionToMassGainerBy(nbSeance);
        break;
    }
    return sessionsRepartition;
  }


  /**
   * todo : Store this informations in database and use them
   * @param nbSessions
   * @returns {Array}
   */
  static getMuscularGroupSessionRepartitionToMassGainerBy(nbSessions) {
    let muscularsGroupsSession = [];
    switch (nbSessions) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        muscularsGroupsSession = [
          {
            muscles: [MuscleEnum.PECS, MuscleEnum.BICEPS, MuscleEnum.TRICEPS, MuscleEnum.RECTUS_ABDOMINIS],
            training: true
          },
          {
            muscles: [MuscleEnum.LATISSIMUS_DORSI, MuscleEnum.POSTERIOR_DELTOID, MuscleEnum.DELTOID, MuscleEnum.RECTUS_ABDOMINIS],
            training: true
          },
          {
            muscles: [MuscleEnum.THIGH_BICEPS, MuscleEnum.THIGH_QUADRICEPS, MuscleEnum.GLUTEUS_MEDIUS, MuscleEnum.GLUTEUS_MAXIMUS, MuscleEnum.RECTUS_ABDOMINIS],
            training: true
          }
        ];
        break;
    }
    return muscularsGroupsSession;
  }


  /**
   * todo:Get this by planning
   * @param nbSessions
   * @returns {Array}
   */
  static getDaysSessionRepartitionBy(nbSessions) {
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
    }
    return daysSessionRepartition;
  }


  static saveSessions(sessions) {
    let sessionsSavecPromises = [];
    sessions.forEach(session => {
      sessionsSavecPromises.push(session.save());
    });
    return Promise.all(sessionsSavecPromises);
  }
}

module.exports = SessionService;