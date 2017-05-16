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
}

ExerciseGroupTypeEnum.OG = new ExerciseGroupTypeEnum('Organized exercise', 'OG');
ExerciseGroupTypeEnum.BB = new ExerciseGroupTypeEnum('Bodybuilding exercise', 'BB');
ExerciseGroupTypeEnum.ST = new ExerciseGroupTypeEnum('Stretching exercise', 'ST');
ExerciseGroupTypeEnum.CD = new ExerciseGroupTypeEnum('Cardio exercise', 'CD');

module.exports = ExerciseGroupTypeEnum;