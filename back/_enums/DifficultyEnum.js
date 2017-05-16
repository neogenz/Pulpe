class DifficultyEnum{

  constructor(name, code){
    this.name = name;
    this.code = code;
  }
  toString(){
    return `${this.name}`;
  }
  static getName(code){
    return DifficultyEnum[code].name;
  }
}

DifficultyEnum.EASY = new DifficultyEnum('easy', 'es');
DifficultyEnum.MEDIUM = new DifficultyEnum('medium', 'me');
DifficultyEnum.HARD = new DifficultyEnum('hard', 'ha');

module.exports = DifficultyEnum;