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

class ProgramService {
  constructor() {
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
    return Program.findOne({'member': memberId}).populate(populationGraph)
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

  /**
   * Find all sessions populated of active program by member id.
   * @param {number} memberId
   * @returns {Promise|Promise.<Session>}
   */
  static findAllSessionsOfActiveProgramByMemberId(memberId) {
    const populationGraph = {
      path: 'sessions.exercises',
      model: 'Exercise'
    };
    //todo use member service to verify integrity of member
    return Program.findOne({
      'member': memberId
    }).populate(populationGraph).then((finded) => {
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

module.exports = ProgramService;