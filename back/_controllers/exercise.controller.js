/**
 * Created by maximedesogus on 24/06/2017.
 */
'use strict';

const ExerciseService = require('../_services/exercise.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const winston = require('winston');

class ExerciseController {
  constructor() {

  }

  static findAllByGymOfAuthenticatedCoach(req, res) {
    ExerciseService.findAllByGymId(req.user.gym._id)
      .then(exercises => {
        return res.send(exercises);
      }, error => {
        throw error;
      })
      .catch(error => {
        winston.log('error', error.stack);
        let httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }
}

module.exports = ExerciseController;