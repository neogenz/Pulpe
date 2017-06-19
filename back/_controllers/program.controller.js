const ProgramService = require('../_services/program.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const MemberService = require('../_services/member.service');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const TechnicalError = require('../_model/Errors').TechnicalError;

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

  static createProgram(req, res) {
    const memberId = req.body.memberId,
      nbSessions = req.body.nbSessions,
      isActive = req.body.isActive,
      objective = ObjectiveEnum.fromName(req.body.objective);
    return MemberService.findById(memberId)
      .then(member => {
        return ProgramService.generateProgramBy(nbSessions, objective, member, isActive);
      })
      .then(program => {
        return ProgramService.saveProgram(program);
      })
      .then(programSaved => {
        res.send(programSaved);
      }, error => {
        throw error;
      })
      .catch(error => {
        console.error(error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      })
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
}

module.exports = ProgramController;