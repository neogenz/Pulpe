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
    provider.put('/exercises/reference', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, ExerciseController.updateReference);
    provider.put('/members/programs/exercises', AuthenticationController.ensureAuthorized, ExerciseController.updateExerciseOfMember);
    provider.delete('/exercises/:id', AuthenticationController.ensureAuthorized, AuthenticationController.mustBeCoach, ExerciseController.delete);
  }
}

module.exports = (provider) => {
  return new ExerciseRouter(provider);
};