class ObjectiveEnum {

  constructor(name, code) {
    this.name = name;
    this.code = code;
  }

  toString() {
    return `${this.name}`;
  }

  static fromName(name) {
    return ObjectiveEnum[name];
  }

  static fromCode(code) {
    let objectives = Object.keys(ObjectiveEnum);
    let key = '';
    for (let i = 0; i < objectives.length; i++) {
      key = objectives[i];
      if (ObjectiveEnum[key].code === code)
        return ObjectiveEnum[key];
    }
    return null;
  }
}

ObjectiveEnum.MassGainer = new ObjectiveEnum('MassGainer', 'MG');
ObjectiveEnum.WeightLoss = new ObjectiveEnum('WeightLoss', 'WL');
ObjectiveEnum.GeneralForm = new ObjectiveEnum('GeneralForm', 'GF');

module.exports = ObjectiveEnum;