'use strict';

const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const Session = require('../_model/Session');
const Machine = require('../_model/Machine');
const ExerciseService = require('../_services/exercise.service');

class SessionService {
  constructor() {

  }

  static generateOneSessionByMuscularGroup(muscularGroup, gym) {
    let session = new Session();
    if (muscularGroup.training) {

    }

    muscularGroup.muscles.forEach(muscle => {

    });
  }

  static generateTrainingTo(objectiveEnum) {
    switch (objectiveEnum) {
      case ObjectiveEnum.MassGainer:
        let session = new Session();
        return ExerciseService.createSpecificNumberOfTrainingExercises(1).then(
          trainingExercises => {

            session.exercises = trainingExercises;
            return session;

          });
        break;
    }
  }
}

module.exports = SessionService;