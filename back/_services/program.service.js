const Program = require('../_model/Program');
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
const SessionError = require('../_model/Errors').SessionError;

class ProgramService {
  constructor() {
  }


  /**
   *
   * @param {Member|number} memberId Member or memberId
   * @returns {Promise.<Session>}
   */
  static async findSessionTodoBy(memberId) {
    try {
      const populationGraph = {
        path: 'sessions.exercises',
        model: 'Exercise',
        populate: {
          path: 'machines',
          model: 'Machine'
        }
      };
      let saveProgram = false;
      let programs = await Program.find().ofThisMember(memberId).isActive().populate(populationGraph);
      const programActive = programs[0];
      const dayOfWeekOnToday = moment().day(moment().day()).isoWeekday();
      for (let i = 0; i < programActive.sessions.length; i++) {
        if (programActive.sessions[i]._id.equals(programActive._sessionTodo)) {
          if (moment().day(programActive.sessions[i].dayInWeek).isoWeekday() >= dayOfWeekOnToday) {
            return programActive.sessions[i];
          }
          else {
            if (_haveNextSession(programActive.sessions, i)) {
              programActive._sessionTodo = programActive.sessions[i+1]._id;
              saveProgram = true;
            }
          }
        }
      }
      programActive._sessionTodo = programActive.sessions[0];
      await programActive.save();
      return programActive.session[0];
    }
    catch (error) {
      if (!(error instanceof NotFoundError)) {
        throw new TechnicalError(error.message);
      }
    }
  }

  /**
   * find a program for a member.
   * @param memberId
   * @returns {Promise|Promise.<Program>}
   */
  static findByMemberId(memberId) {
    const populationGraph = {
      path: 'sessions.exercises',
      model: 'Exercise',
      populate: {
        path: 'machines',
        model: 'Machine'
      }
    };
    return Program.find().ofThisMember(memberId).isActive().populate(populationGraph)
      .then((programs) => {
        if (!programs || programs.length <= 0) {
          throw new NotFoundError(`Program can\'t be found to member : ${memberId}`);
        }
        return programs[0];
      })
      .catch(function (err) {
        throw err;
      });
  }

  /**
   * Generate a program for a member
   * @param {ProgramGenerationContext} programGenerationContext
   * @returns {Promise.<Program>}
   */
  static generateProgramBy(programGenerationContext) {
    return SessionService.generateSessionsBy(programGenerationContext.member.sessionFrequency,
      programGenerationContext.objective,
      programGenerationContext.member.gym)
      .then((sessions) => {
        let program = Program.of()
          .member(programGenerationContext.member)
          .sessions(sessions)
          .objective(programGenerationContext.objective.name)
          .isActive(programGenerationContext.isActive)
          .sessionTodo(sessions[0])
          .build();
        return program;
      })
      .catch(error => {
        throw error;
      });
  }


  /**
   * Save program and each of these exercises
   * @param program
   * @returns {Promise|Promise.<*>}
   */
  static saveProgram(program) {
    let promises = [];
    program.sessions.forEach(session => {
      promises.push(ExerciseService.saveExercises(session.exercises))
    });
    promises.push(program.save());
    return Promise.all(promises)
      .catch(error => {
        console.error(error.stack);
        throw new TechnicalError(error.message);
      })
  }


  static async disableAllBy(member) {
    await Program.update({member: member}, {isActive: false}, {multi: true});
  }

  /**
   * Find all sessions populated of active program by member id.
   * @param {number} memberId
   * @returns {Promise|Promise.<Session>}
   */
  static findAllSessionsOfActiveProgramByMemberId(memberId) {
    return ProgramService.findByMemberId(memberId)
      .then((finded) => {
        if (finded) {
          return finded.sessions;
        }
        throw new NotFoundError(`Programme introuvable pour l'adhérent ${memberId}`);
      }, error => {
        console.error(error.stack);
        throw new TechnicalError(error.message);
      }).catch(error => {
        throw error;
      });
  }
}

function _haveNextSession(sessions, currentIndex) {
  return (sessions.length - 1) >= (currentIndex + 1);
}

module.exports = ProgramService;