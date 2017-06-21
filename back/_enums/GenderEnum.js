class GenderEnum {

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  toString() {
    return `${this.name}`;
  }

  static fromName(name) {
    return GenderEnum[name];
  }

  static fromCode(code) {
    let genders = Object.keys(GenderEnum);
    let key = '';
    for (let i = 0; i < genders.length; i++) {
      key = genders[i];
      if (GenderEnum[key].code === code)
        return GenderEnum[key];
    }
    return null;
  }
}

GenderEnum.Male = new GenderEnum('Male', 'M');
GenderEnum.Female = new GenderEnum('Female', 'F');

module.exports = GenderEnum;