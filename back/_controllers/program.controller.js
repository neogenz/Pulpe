const ProgramService = require('../_services/program.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const MemberService = require('../_services/member.service');
const winston = require('winston');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');
const ProgramGenerationContext = require('../_contextExecutionClass/ProgramGenerationContext');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const SessionService = require('../_services/session.service');
const ExerciseService = require('../_services/exercise.service');
const TechnicalError = require('../_model/Errors').TechnicalError;
const SessionError = require('../_model/Errors').SessionError;
const NotFoundError = require('../_model/Errors').NotFoundError;


class ProgramController {
  constructor() {
  }

  static findActiveByAuthenticatedMember(req, res) {
    const memberId = req.user._id;

    ProgramService.findByMemberId(memberId)
      .then((program) => {
        res.send({program: program});
      })
      .catch((error) => {
        console.error(error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  static findActiveByMemberId(req, res) {
    const memberId = req.params.id;
    ProgramService.findByMemberId(memberId)
      .then((program) => {
        res.send({program: program});
      })
      .catch((error) => {
        console.error(error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  static async createProgram(req, res) {
    try {
      const memberId = req.body.memberId;
      const mustBeActive = req.body.isActive;
      const member = await MemberService.findById(memberId);
      if (mustBeActive) {
        await ProgramService.disableAllBy(member);
      }
      const programGenerationContext = new ProgramGenerationContext({member: member, isActive: mustBeActive});
      const program = await ProgramService.generateProgramBy(programGenerationContext);
      const programSaved = await ProgramService.saveProgram(program);
      return res.send(programSaved);
    } catch (error) {
      winston.log('error', error.stack);
      const httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    }
  }

  /**
   * Find all sessions populated on program
   * @param req
   * @param res
   */
  static findAllSessionsOfActiveProgramIdByAuthenticatedMember(req, res) {
    const memberId = req.user._id;
    return ProgramService.findAllSessionsOfActiveProgramByMemberId(memberId)
      .then(sessions => {
        return res.send(sessions);
      }, error => {
        console.error(error.stack);
        throw error;
      })
      .catch(error => {
        console.error(error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      })
  }

  static async doneCurrentSession(req, res) {
    try {
      const memberId = req.user._id;
      const program = await ProgramService.findByMemberId(memberId);
      const sessionToMarkDone = await ProgramService.findSessionTodoBy(memberId);
      await SessionService.doneThisSessionBy(sessionToMarkDone, program);
      const newSessionTodo = await ProgramService.findSessionTodoBy(memberId);
      return res.send({newSessionTodo: newSessionTodo});
    } catch (error) {
      console.error(error.stack);
      const httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    }
  }

  static async changeSessionTodo(req, res) {
    try {
      if (!req.body.id)
        throw new Error('Id of session to pass in todo is mandatory.');
      const memberId = req.user._id;
      const newSessionIdTodo = req.body.id;
      const program = await ProgramService.findByMemberId(memberId);
      const newSessionTodo = program.sessions.find(session => {
        return session._id.equals(newSessionIdTodo);
      });
      if (!newSessionTodo)
        throw new Error('Session to pass todo is not finded on program.');
      program._sessionTodo = newSessionIdTodo;
      await program.save();
      return res.send({newSessionTodo: newSessionTodo});
    } catch (error) {
      console.error(error.stack);
      const httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    }
  }

  static async findSessionTodo(req, res) {
    try {
      const memberId = req.user._id;
      const member = await MemberService.findById(memberId);
      const currentSession = await ProgramService.findSessionTodoBy(member);
      return res.send(currentSession);
    } catch (error) {
      console.error(error.stack);
      if (error instanceof NotFoundError) {
        error.message = 'Aucune session à venir n\'a été trouvée.';
      }
      const httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    }
  }

  static async addExercise(req, res) {
    try {
      const sessionId = req.params.id;
      const program = ProgramService.findBySessionId(sessionId);
      const exerciseCreated = await ExerciseService.createExerciseBy(req.body.exercise.name, req.body.exercise.machines, {
        type: ExerciseGroupTypeEnum.fromName(req.body.exercise.type),
        workedMuscles: req.body.exercise.workedMuscles,
        weight: req.body.exercise.weight,
        km: req.body.exercise.km,
        order: req.body.exercise.order,
        session: sessionId,
        program: program._id,
        gym: req.user.gym,
        reference: false
      });
      const exerciseCreatedPopulatedByMachines = await ExerciseService.findOneById(exerciseCreated._id);
      const exerciseAdded = await ProgramService.addExercise(sessionId, exerciseCreatedPopulatedByMachines);
      return res.send(exerciseAdded);
    } catch (error) {
      console.error(error.stack);
      const httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    }
  }

  static async update(req, res) {
    try {
      const sessionId = req.params.id;
      const exercise = await ProgramService.updateExercise(sessionId, req.body.exercise);
      return res.send(exercise);
    } catch (error) {
      winston.log('error', error.stack);
      let httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    }
  }
}

module.exports = ProgramController;