'use strict';

const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const HTTP_CODE = require('../_helpers/HTTP_CODE.json');

class GymController {
  constructor() {
  }

  /**
   * Add measurement to a member and complete his profile.
   * @param req
   * @param res
   */
  static completeProfile(req, res) {
    const memberId = req.params.id,
      measurements = req.body.measurements,
      sessionFrequency = req.body.sessionFrequency,
      birthDate = new Date(req.body.birthDate);
    let objective = req.body.objective;
    objective = ObjectiveEnum[objective];

    MemberService.completeProfile(memberId, measurements, sessionFrequency, birthDate, objective)
      .then(member => {
        res.send({member: member});
      })
      .catch((error) => {
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }
}

module.exports = GymController;