'use strict';

class IntensityLevelEnum {

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  toString() {
    return `${this.name}`;
  }

  static getName(code) {
    return IntensityLevelEnum[code].name;
  }
}

IntensityLevelEnum.HIGH = new IntensityLevelEnum('high', 'HIG');
IntensityLevelEnum.MEDIUM = new IntensityLevelEnum('medium', 'MED');
IntensityLevelEnum.LOW = new IntensityLevelEnum('low', 'LOW');


module.exports = IntensityLevelEnum;