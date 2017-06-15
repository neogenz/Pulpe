const MemberService = require('./member.service');
const Program = require('../_model/Program');
const jwt = require('jsonwebtoken');
const NotFoundError = require('../_model/Errors').NotFoundError;
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const MuscleEnum = require('../_enums/MuscleEnum');
const ExerciseService = require('./exercise.service');
//todo Create exercise service to find by some criterias
const Exercise = require('../_model/Exercise');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const Session = require('../_model/Session');
const moment = require('moment');
const SessionService = require('../_services/session.service');
const TechnicalError = require('../_model/Errors').TechnicalError;

class ProgramService {
  constructor() {
  }

  /**
   * find a program for a member.
   * @param memberId
   * @returns {Promise|Promise.<Program>}
   */
  static findByMemberId(memberId) {
    return Program.findOne({'member': memberId})
      .then((program) => {
        if (!program) {
          throw new NotFoundError("Programme introuvable pour l'adhérent : " + memberId);
        }
        return program;
      })
      .catch(function (err) {
        throw err;
      });
  }

  /**
   * Generate a program for a member
   * @param {number} nbSessions Its session number by week
   * @param {ObjectiveEnum} objective
   * @param {Member} member
   * @returns {Promise.<Program>}
   */
  static generateProgramBy(nbSessions, objective, member) {
    let sessions = SessionService.generateSessionsBy(nbSessions, objective);
    let program = new Program();
    program.member = member;
    program.sessions = sessions;
    let exercisesPromises = [];
    program.sessions.forEach(session => {
      exercisesPromises.push(
        ExerciseService.generateExercisesBy({
          muscles: session.mainMusclesGroup,
          training: session.training
        }, DifficultyEnum.HARD, objective)
          .then(exercises => {
            session.exercises = exercises;
          })
      );
    });
    return Promise.all(exercisesPromises)
      .then(exercises => {
        return program;
      })
      .catch(error => {
        throw error;
      });
  }

  /**
   * Find and fill exercises in one or more sessions
   * @param {Array<Session>|Session} sessions
   * @returns {Document|Query|Promise|*}
   */
  static populateSessions(sessions) {
    return Session.populate(sessions, 'exercises');
  }
}

module.exports = ProgramService;