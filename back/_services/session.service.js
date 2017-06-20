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
const NotFoundError = require('../_model/Errors').NotFoundError;
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const SessionTypeEnum = require('../_enums/SessionTypeEnum');

class SessionService {
  constructor() {

  }

  /**
   * Generate more sessions
   * @param {number} nbSessions
   * @param {ObjectiveEnum} objective
   * @returns {Array<Session>}
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
        sessionType: musclesGroups[index].sessionType,
        mainMusclesGroup: musclesGroups[index].muscles,
        training: musclesGroups[index].training
      }));
    });
    return sessions;
  }


  /**
   *
   * @param nbSeance
   * @param objectiveEnum
   * @returns {Array<{
   *    sessionType:ExerciseGroupTypeEnum,
   *    training:boolean,
   *    muscles:Array<MuscleEnum>
   * }>}
   */
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
   * @returns {Array<{
   *    sessionType:ExerciseGroupTypeEnum,
   *    training:boolean,
   *    muscles:Array<MuscleEnum>
   * }>}
   */
  static getMuscularGroupSessionRepartitionToMassGainerBy(nbSessions) {
    let muscularsGroupsSession = [];
    switch (nbSessions) {
      case 1:
        break;
      case 2:
        break;
      case 3:
        //todo we return 3 sessions, because of sessions nb, but its a good idea ?
        muscularsGroupsSession = [
          {
            sessionType: SessionTypeEnum.Bodybuilding.name,
            muscles: [MuscleEnum.LATISSIMUS_DORSI, MuscleEnum.POSTERIOR_DELTOID, MuscleEnum.DELTOID, MuscleEnum.LATS, MuscleEnum.RECTUS_ABDOMINIS],
            training: true
          },
          {
            sessionType: SessionTypeEnum.Bodybuilding.name,
            muscles: [MuscleEnum.BICEPS, MuscleEnum.TRICEPS, MuscleEnum.PECS, MuscleEnum.TRAPS, MuscleEnum.RECTUS_ABDOMINIS],
            training: true
          },
          {
            sessionType: SessionTypeEnum.Bodybuilding.name,
            muscles: [MuscleEnum.THIGH_BICEPS, MuscleEnum.THIGH_QUADRICEPS, MuscleEnum.GLUTEUS_MAXIMUS, MuscleEnum.GLUTEUS_MEDIUS, MuscleEnum.RECTUS_ABDOMINIS],
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
}

module.exports = SessionService;