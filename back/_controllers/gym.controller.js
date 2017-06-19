'use strict';

const GymService = require('../_services/gym.service');
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
  static findAll(req, res) {
    GymService.findAll()
      .then(gyms => {
        res.send({gyms: gyms});
      })
      .catch((error) => {
        const httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }
}

module.exports = GymController;