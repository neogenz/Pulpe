const MemberService = require('../_services/member.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const GenderEnum = require('../_enums/GenderEnum');
const ProgramService = require('../_services/program.service');
const ProgramGenerationContext = require('../_contextExecutionClass/ProgramGenerationContext');
const winston = require('winston');
const MeasurementEnum = require('../_enums/MeasurementEnum');

class MemberController {
  constructor() {
  }


  /**
   * Find authenticated member
   * @param {*} req
   * @param {*} res
   */
  static findAuthenticated(req, res) {
    const id = req.user._id;

    MemberService.findById(id)
      .then(member => {
        res.send({member: member});
      })
      .catch((error) => {
        winston.log('error', error);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
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
  static addMeasurement(req, res) {
    const memberId = req.user._id;
    const measurementToAdd = req.body.measurement;
    MemberService.addMeasurement(memberId, measurementToAdd)
      .then(member => {
        res.send({member: member});
      })
      .catch((error) => {
        winston.log('error', error.stack);
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
    const memberId = req.user._id,
      measurements = req.body.measurements,
      gymId = req.body.gymId,
      sessionFrequency = req.body.sessionFrequency,
      birthDate = new Date(req.body.birthDate);
    let objective = req.body.objective;
    let gender = req.body.gender;
    console.log(objective);
    objective = ObjectiveEnum.fromName(objective);
    gender = GenderEnum.fromName(gender);

    let memberCompleted;
    MemberService.completeProfile(gymId, memberId, measurements, sessionFrequency, birthDate, objective, gender)
      .then(member => {
        memberCompleted = member;
        const programGenerationContext = new ProgramGenerationContext({member: member, isActive: true});
        return ProgramService.generateProgramBy(programGenerationContext);
      })
      .then(programGenerated => {
        return ProgramService.saveProgram(programGenerated);
      })
      .then(programSaved => {
        res.send({member: memberCompleted});
      }, error => {
        throw error;
      })
      .catch((error) => {
        winston.log('error', error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  /**
   * Update a member.
   * @param req
   * @param res
   */
  static async update(req, res) {
    try {
      const member = req.body.member;
      const updated = await MemberService.update(member);
      if (updated.objective !== req.body.member.obective) {
        await ProgramService.disableAllBy(member);
        const programGenerationContext = new ProgramGenerationContext({member: updated, isActive: true});
        const program = await ProgramService.generateProgramBy(programGenerationContext);
        const programSaved = await ProgramService.saveProgram(program);
      }
      return res.send({member: updated});
    } catch (error) {
      winston.log('error', error.stack);
      const httpError = HttpErrorHelper.buildHttpErrorByError(error);
      return res.status(httpError.code).send(httpError);
    }
  }

  /**
   * Create a new member and send his password with his email.
   * @param req
   * @param res
   */
  static create(req, res) {
    const member = req.body.member;

    MemberService.createAndSendPassword(member)
      .then(member => {
        res.send({member: member});
      })
      .catch((error) => {
        winston.log('error', error.stack);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }


  /**
   * Find all members of a coach linked by their gym.
   * @param req
   * @param res
   */
  static findAllByAuthenticatedCoach(req, res) {
    const id = req.user._id;

    MemberService.findAllByCoach(id)
      .then(members => {
        res.send({members: members});
      })
      .catch((error) => {
        console.log(error);
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }

  /**
   * Find efficient previsions for a member.
   * @param req
   * @param res
   */
  static findEfficientPrevisions(req, res) {
    const id = req.user._id;

    MemberService.findById(id)
      .then((memberFinded) => {
        return MemberService.findEfficientPrevisions(memberFinded)
      }, (error) => {
        winston.log('error', error.stack);
        throw new error;
      })
      .then(efficientPrevisions => {
        res.send({efficientsPrevisions: efficientPrevisions});
      }, (error) => {
        winston.log('error', error.stack);
        throw new error;
      })
      .catch((error) => {
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }
}

module.exports = MemberController;