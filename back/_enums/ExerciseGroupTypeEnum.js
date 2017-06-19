'use strict';

class ExerciseGroupTypeEnum {

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  toString() {
    return `${this.name}`;
  }

  static getName(code) {
    return ExerciseGroupTypeEnum[code].name;
  }

  static fromName(name) {
    return ExerciseGroupTypeEnum[name];
  }
}

ExerciseGroupTypeEnum.OrganizedExercise = new ExerciseGroupTypeEnum('OrganizedExercise', 'OrganizedExercise');
ExerciseGroupTypeEnum.BodybuildingExercise = new ExerciseGroupTypeEnum('BodybuildingExercise', 'BodybuildingExercise');
ExerciseGroupTypeEnum.StretchingExercise = new ExerciseGroupTypeEnum('StretchingExercise', 'StretchingExercise');
ExerciseGroupTypeEnum.CardioExercise = new ExerciseGroupTypeEnum('CardioExercise', 'CardioExercise');
ExerciseGroupTypeEnum.TrainingExercise = new ExerciseGroupTypeEnum('TrainingExercise', 'TrainingExercise');

module.exports = ExerciseGroupTypeEnum;