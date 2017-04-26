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

ObjectiveEnum.MG = new ObjectiveEnum('MassGainer');
ObjectiveEnum.WL = new ObjectiveEnum('WeightLoss');
ObjectiveEnum.GF = new ObjectiveEnum('GeneralForm');

module.exports = ObjectiveEnum;