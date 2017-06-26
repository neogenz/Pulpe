/**
 * Created by maximedesogus on 24/06/2017.
 */
'use strict';

const AuthenticationController = require('../_controllers/authentication.controller');
const ExerciseController = require('../_controllers/exercise.controller');

class ExerciseRouter {
  constructor(provider) {
    provider.get('/exercises', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, ExerciseController.findAllByGymOfAuthenticatedCoach);
    provider.post('/exercises', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, ExerciseController.createExercise);
  }
}

module.exports = (provider) => {
  return new ExerciseRouter(provider);
};