class ObjectiveEnum{

  constructor(name, code){
    this.name = name;
    this.code = code;
  }
  toString(){
    return `${this.name}`;
  }
  static getName(code){
    return ObjectiveEnum[code].name;
  }
}

ObjectiveEnum.MassGainer = new ObjectiveEnum('MassGainer', 'MG');
ObjectiveEnum.WeightLoss = new ObjectiveEnum('WeightLoss', 'WL');
ObjectiveEnum.GeneralForm = new ObjectiveEnum('GeneralForm', 'GF');

module.exports = ObjectiveEnum;