'use strict';

class ExerciseReferenceInformationEnum {

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

ExerciseReferenceInformationEnum.Bodybuilding = new ExerciseReferenceInformationEnum('BodybuildingExerciseReferenceInformation', 'bodybuilding');
ExerciseReferenceInformationEnum.Cardio = new ExerciseReferenceInformationEnum('CardioExerciseReferenceInformation', 'Cardio');
ExerciseReferenceInformationEnum.Organized = new ExerciseReferenceInformationEnum('OrganizedExerciseReferenceInformation', 'Organized');


module.exports = ExerciseReferenceInformationEnum;