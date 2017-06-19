'use strict';

class SessionTypeEnum {

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  toString() {
    return `${this.name}`;
  }

  static getName(code) {
    return SessionTypeEnum[code].name;
  }

  static fromName(name) {
    return SessionTypeEnum[name];
  }
}

SessionTypeEnum.Bodybuilding = new SessionTypeEnum('Bodybuilding', 'BB');
SessionTypeEnum.Cardio = new SessionTypeEnum('Cardio', 'CD');

module.exports = SessionTypeEnum;