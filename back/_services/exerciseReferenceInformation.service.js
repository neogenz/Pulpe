'use strict';

const BodybuildingExerciseReferenceInformation = require('../_model/exercisesReferencesInformations/BodybuildingExerciseReferenceInformation').model;
const CardioExerciseReferenceInformation = require('../_model/exercisesReferencesInformations/CardioExerciseReferenceInformation');
const OrganizedExerciseReferenceInformation = require('../_model/exercisesReferencesInformations/OrganizedExerciseReferenceInformation');
const StretchingExerciseReferenceInformation = require('../_model/exercisesReferencesInformations/StretchingExerciseReferenceInformation');
const ExerciseReferenceInformation = require('../_model/exercisesReferencesInformations/ExerciseReferenceInformation');
const ObjectiveEnum = require('../_enums/ObjectiveEnum');
const DifficultyEnum = require('../_enums/DifficultyEnum');
const NotFoundError = require('../_model/Errors').NotFoundError;
const ExerciseReferenceInformationEnum = require('../_enums/ExerciseReferenceInformationEnum');

class ExerciseReferenceInformationService {
  constructor() {

  }

  static findAll() {
    return ExerciseReferenceInformation.find();
  }

  static initExercisesReferencesInformations() {
    return ExerciseReferenceInformationService.initMassGainerExercisesReferencesInformations()
      .then(() => {
        return ExerciseReferenceInformationService.initWeightLossExercisesReferencesInformations();
      }).then(() => {
        return ExerciseReferenceInformationService.initGeneralFormExercisesReferencesInformations();
      }).catch(error => {
        throw error;
      });
  }

  static initMassGainerExercisesReferencesInformations() {
    let bodybuildingPhaseOne = new BodybuildingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.MassGainer,
      repetitions: 10,
      series: 5,
      recoveryTimesBetweenEachSeries: 1,
      finalRecoveryTimes: 2,
      approximateTimeBySeries: 1.40
    });

    let bodybuildingPhaseTwo = new BodybuildingExerciseReferenceInformation({
      phase: 2,
      objective: ObjectiveEnum.MassGainer,
      repetitions: 8,
      series: 4,
      recoveryTimesBetweenEachSeries: 1.30,
      finalRecoveryTimes: 2,
      approximateTimeBySeries: 1.25
    });

    let cardioPhaseOne = new CardioExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.MassGainer,
      times: [10],
      speed: 7,
      recovery: 2,
    });

    let cardioPhaseTwo = new CardioExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.MassGainer,
      times: [10],
      speed: 7,
      recovery: 2,
    });

    let organizedPhaseOne = new OrganizedExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.MassGainer,
      difficulty: DifficultyEnum.EASY,
      approximateTime: 15
    });

    let organizedPhaseTwo = new OrganizedExerciseReferenceInformation({
      phase: 2,
      objective: ObjectiveEnum.MassGainer,
      difficulty: DifficultyEnum.MEDIUM,
      approximateTime: 10
    });

    let stretchingPhaseOne = new StretchingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.MassGainer,
      time: 5
    });

    let stretchingPhaseTwo = new StretchingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.MassGainer,
      time: 5
    });

    return bodybuildingPhaseOne.save()
      .then(saved => {
        return bodybuildingPhaseTwo.save();
      })
      .then(saved => {
        return cardioPhaseOne.save();
      })
      .then(saved => {
        return cardioPhaseTwo.save();
      })
      .then(saved => {
        return stretchingPhaseOne.save();
      })
      .then(saved => {
        return stretchingPhaseTwo.save();
      })
      .then(saved => {
        return organizedPhaseOne.save();
      })
      .then(saved => {
        return organizedPhaseTwo.save();
      })
      .catch(error => {
        throw error;
      })
  }

  static initWeightLossExercisesReferencesInformations() {
    let bodybuildingPhaseOne = new BodybuildingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.WeightLoss,
      repetitions: 20,
      series: 5,
      recoveryTimesBetweenEachSeries: 1,
      finalRecoveryTimes: 2,
      approximateTimeBySeries: 1.30
    });

    let bodybuildingPhaseTwo = new BodybuildingExerciseReferenceInformation({
      phase: 2,
      objective: ObjectiveEnum.WeightLoss,
      repetitions: 20,
      series: 5,
      recoveryTimesBetweenEachSeries: 1,
      finalRecoveryTimes: 2,
      approximateTimeBySeries: 1.30
    });

    let cardioPhaseOne = new CardioExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.WeightLoss,
      time: [20, 20],
      speed: 10,
      recovery: 2,
    });

    let cardioPhaseTwo = new CardioExerciseReferenceInformation({
      phase: 2,
      objective: ObjectiveEnum.WeightLoss,
      time: [20, 20],
      speed: 10,
      recovery: 2,
    });

    let organizedPhaseOne = new OrganizedExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.WeightLoss,
      difficulty: DifficultyEnum.EASY,
      approximateTime: 15
    });

    let organizedPhaseTwo = new OrganizedExerciseReferenceInformation({
      phase: 2,
      objective: ObjectiveEnum.WeightLoss,
      difficulty: DifficultyEnum.MEDIUM,
      approximateTime: 10
    });

    let stretchingPhaseOne = new StretchingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.WeightLoss,
      time: 5
    });

    let stretchingPhaseTwo = new StretchingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.WeightLoss,
      time: 5
    });

    return bodybuildingPhaseOne.save()
      .then(saved => {
        return bodybuildingPhaseTwo.save();
      })
      .then(saved => {
        return cardioPhaseOne.save();
      })
      .then(saved => {
        return cardioPhaseTwo.save();
      })
      .then(saved => {
        return stretchingPhaseOne.save();
      })
      .then(saved => {
        return stretchingPhaseTwo.save();
      })
      .then(saved => {
        return organizedPhaseOne.save();
      })
      .then(saved => {
        return organizedPhaseTwo.save();
      })
      .catch(error => {
        throw error;
      })
  }

  static initGeneralFormExercisesReferencesInformations() {
    let bodybuildingPhaseOne = new BodybuildingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.GeneralForm,
      repetitions: 20,
      series: 5,
      recoveryTimesBetweenEachSeries: 1,
      finalRecoveryTimes: 2,
      approximateTimeBySeries: 1.30
    });

    let bodybuildingPhaseTwo = new BodybuildingExerciseReferenceInformation({
      phase: 2,
      objective: ObjectiveEnum.GeneralForm,
      repetitions: 20,
      series: 5,
      recoveryTimesBetweenEachSeries: 1,
      finalRecoveryTimes: 2,
      approximateTimeBySeries: 1.30
    });

    let cardioPhaseOne = new CardioExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.GeneralForm,
      time: [20, 20],
      speed: 10,
      recovery: 2,
    });

    let cardioPhaseTwo = new CardioExerciseReferenceInformation({
      phase: 2,
      objective: ObjectiveEnum.GeneralForm,
      time: [20, 20],
      speed: 10,
      recovery: 2,
    });

    let organizedPhaseOne = new OrganizedExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.GeneralForm,
      difficulty: DifficultyEnum.EASY,
      approximateTime: 15
    });

    let organizedPhaseTwo = new OrganizedExerciseReferenceInformation({
      phase: 2,
      objective: ObjectiveEnum.GeneralForm,
      difficulty: DifficultyEnum.MEDIUM,
      approximateTime: 10
    });

    let stretchingPhaseOne = new StretchingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.GeneralForm,
      time: 5
    });

    let stretchingPhaseTwo = new StretchingExerciseReferenceInformation({
      phase: 1,
      objective: ObjectiveEnum.GeneralForm,
      time: 5
    });

    return bodybuildingPhaseOne.save()
      .then(saved => {
        return bodybuildingPhaseTwo.save();
      })
      .then(saved => {
        return cardioPhaseOne.save();
      })
      .then(saved => {
        return cardioPhaseTwo.save();
      })
      .then(saved => {
        return stretchingPhaseOne.save();
      })
      .then(saved => {
        return stretchingPhaseTwo.save();
      })
      .then(saved => {
        return organizedPhaseOne.save();
      })
      .then(saved => {
        return organizedPhaseTwo.save();
      })
      .catch(error => {
        throw error;
      })
  }

  /**
   *
   * @param {number} [phase=1]
   * @returns {Promise|Promise.<ExerciseReferenceInformation>}
   */
  static findCardioToMassGainerObjectiveInPhase(phase = 1) {
    return ExerciseReferenceInformation.find({
      __t: 'CardioExerciseReferenceInformation',
      objective: ObjectiveEnum.MassGainer,
      phase: phase
    }).then(founded => {
      return founded;
    }).catch(error => {
      throw error;
    })
  }

  /**
   * Find an exercise reference information by some criterias
   * @param {Object} criterias
   * @param {string} [criterias.exerciseType]
   * @param {ObjectiveEnum} [criterias.objective]
   * @param {number} [criterias.phase]
   * @returns {Promise|Promise.<ExerciseReferenceInformation>}
   */
  static findBy(criterias) {
    return ExerciseReferenceInformation.find(criterias).sort('phase').then(founded => {
      return founded;
    }).catch(error => {
      throw error;
    })
  }

  /**
   *
   * @param phase
   * @returns {Promise|Promise.<BodybuildingExerciseReferenceInformation>}
   */
  static findBodybuildingToMassGainerObjectiveInPhase(phase = 1) {
    return ExerciseReferenceInformation.find({
      __t: ExerciseReferenceInformationEnum.Bodybuilding.name,
      objective: ObjectiveEnum.MassGainer,
      phase: phase
    }).then(founded => {
      return founded;
    }).catch(error => {
      throw error;
    })
  }

  static findByOjective(objective) {
    return ExerciseReferenceInformation.find({
      objective: ObjectiveEnum.MassGainer
    }).then(founded => {
      if (!founded) {
        throw new NotFoundError(`No exercises references information to this objective ${objective.toString()}`);
      }
      return founded;
    }, error => {
      throw new Error(error.message);
    })
      .catch(error => {
        throw error;
      })
  }
}

module.exports = ExerciseReferenceInformationService;