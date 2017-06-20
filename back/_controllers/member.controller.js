const MemberService = require('../_services/member.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const ProgramService = require('../_services/program.service');
const ProgramGenerationContext = require('../_contextExecutionClass/ProgramGenerationContext');

class MemberController {
  constructor() {
  }

  /**
   * Find a member by an id.
   * @param req
   * @param res
   */
  static findById(req, res) {
    const id = req.params.id;

    MemberService.findById(id)
      .then(member => {
        res.send({member: member});
      })
      .catch((error) => {
        console.log(error);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  /**
   * Add measurements for a member.
   * @param req
   * @param res
   */
  static addMeasurements(req, res) {
    const memberId = req.params.id;
    const measurements = req.body.measurements;

    MemberService.addMeasurements(memberId, measurements)
      .then(member => {
        res.send({member: member});
      })
      .catch((error) => {
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  /**
   * Add measurement to a member and complete his profile.
   * @param req
   * @param res
   */
  static completeProfile(req, res) {
    const memberId = req.params.id,
      measurements = req.body.measurements,
      gymId = req.body.gymId,
      sessionFrequency = req.body.sessionFrequency,
      birthDate = new Date(req.body.birthDate);
    let objective = req.body.objective;
    objective = ObjectiveEnum.fromCode(objective);
    let memberCompleted;

    MemberService.completeProfile(gymId, memberId, measurements, sessionFrequency, birthDate, objective)
      .then(member => {
        memberCompleted = member;
        const programGenerationContext = new ProgramGenerationContext({member: member, isActive: true});
        return ProgramService.generateProgramBy(programGenerationContext);
      })
      .then(programGenerated => {
        return ProgramService.saveProgram(programGenerated);
      })
      .then(programSaved => {
        res.send(memberCompleted);
      }, error => {
        throw error;
      })
      .catch((error) => {
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }
}

module.exports = MemberController;