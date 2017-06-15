const ProgramService = require('../_services/program.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const MemberService = require('../_services/member.service');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const TechnicalError = require('../_model/Errors').TechnicalError;

class ProgramController {
  constructor() {
  }

  static findByMemberId(req, res) {
    const memberId = req.params.memberId;

    ProgramService.findByMemberId(memberId)
      .then((program) => {
        res.send({program: program});
      })
      .catch((err) => {
        const httpError = HttpErrorHelper.buildHttpErrorByError(err);
        return res.status(httpError.code).send(httpError);
      });
  }

  static createProgram(req, res) {
    const memberId = req.body.memberId,
      nbSessions = req.body.nbSessions,
      objective = ObjectiveEnum.fromName(req.body.objective);
    return MemberService.findById(memberId)
      .then(member => {
        return ProgramService.generateProgramBy(nbSessions, objective, member);
      })
      .then(program => {
        return ProgramService.saveProgram(program);
      })
      .then(programSaved => {
        res.send(programSaved);
      }, error => {
        console.error(error.message);
        throw new TechnicalError(error.message);
      })
      .catch(error => {
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      })
  }
}

module.exports = ProgramController;