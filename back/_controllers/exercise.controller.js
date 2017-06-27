/**
 * Created by maximedesogus on 24/06/2017.
 */
'use strict';

const ExerciseService = require('../_services/exercise.service');
const HttpErrorHelper = require('../_helpers/HttpErrorHelper');
const winston = require('winston');
const ExerciseGroupTypeEnum = require('../_enums/ExerciseGroupTypeEnum');

class ExerciseController {
  constructor() {

  }

  static findAllByGymOfAuthenticatedCoach(req, res) {
    ExerciseService.findAllOfReferenceBy(req.user.gym._id)
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

  static createExercise(req, res) {
    ExerciseService.createExerciseBy(req.body.exercise.name, req.body.exercise.machines, {
      type: ExerciseGroupTypeEnum.fromName(req.body.exercise.type),
      workedMuscles: req.body.exercise.workedMuscles,
      weight: req.body.exercise.weight,
      km: req.body.exercise.km,
      gym: req.user.gym,
      reference: true
    })
      .then(exercise => {
        return ExerciseService.findOneById(exercise._id);
      }, error => {
        throw error;
      })
      .then(exercise => {
        return res.send(exercise);
      }, error => {
        throw error;
      })
      .catch(error => {
        winston.log('error', error.stack);
        let httpError = HttpErrorHelper.buildHttpErrorByError(error);
        return res.status(httpError.code).send(httpError);
      });
  }


  static update(req, res) {
    // exercise.type = ExerciseGroupTypeEnum.fromName(exercise.type);
    // exercise = ExerciseService.generateExerciseFrom(exercise);
    return ExerciseService.findAndUpdateThis(req.body.exercise)
      .then(exercise => {
        return res.send(exercise);
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