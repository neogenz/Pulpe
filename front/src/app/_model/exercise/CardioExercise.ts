import {AbstractExercise, ServerAbstractExercise} from "./AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {promise} from "selenium-webdriver";
import {DifficultyEnum} from "../../_enums/DifficultyEnum";
import {DifficultyConverter} from "../../shared/DifficultyConverter";

export class CardioExercise extends AbstractExercise {
  times: number[];
  km: number;
  calories: number;
  speed: number;
  recovery: number;
  difficulty: DifficultyEnum;

  constructor(id: number, name: string, machines: any[]) {
    super(id, name, machines, ExerciseGroupTypeEnum.CardioExercise);
    this.times = [];
    this.km = 0;
    this.calories = 0;
    this.speed = 0;
    this.recovery = 0;
    this.difficulty = DifficultyEnum.easy;
  }


  initFromRawObject(rawObject: any): CardioExercise {
    this.times = rawObject.times ? rawObject.times : this.times;
    this.km = rawObject.km ? rawObject.km : this.km;
    this.calories = rawObject.calories ? rawObject.calories : this.calories;
    this.speed = rawObject.speed ? rawObject.speed : this.speed;
    this.recovery = rawObject.recovery ? rawObject.recovery : this.recovery;
    this.difficulty = rawObject.difficulty ? new DifficultyConverter().getEnumFromName(rawObject.difficulty) : this.difficulty;

    return this;
  }


  calculApproximateTime(): number {
    let approximateTime: number = 0;

    this.times.forEach((value) => {
      approximateTime += value;
      approximateTime += this.recovery;
    });

    return approximateTime;
  }

  serialize(): promise.IThenable<ServerCardioExercise> | ServerCardioExercise {
    let serverExercise: ServerCardioExercise = new ServerCardioExercise();
    serverExercise.times = this.times;
    serverExercise.km = this.km;
    serverExercise.calories = this.calories;
    serverExercise.speed = this.speed;
    serverExercise.recovery = this.recovery;
    serverExercise.difficulty = this.difficulty;
    serverExercise.id = this.id;
    serverExercise.name = this.name;
    serverExercise.machines = this.machines.map(m => m.serialize());
    serverExercise.approximateTime = this.approximateTime;
    serverExercise.workedMuscles = this.workedMuscles.map(m => m.serialize());
    serverExercise.type = ExerciseGroupTypeEnum[this.type];
    return serverExercise;
  }
}

export class ServerCardioExercise extends ServerAbstractExercise {
  times: number[];
  km: number;
  calories: number;
  speed: number;
  musclesWorked: any[];
  recovery: number;
  difficulty: number;
}