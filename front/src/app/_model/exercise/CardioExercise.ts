import {AbstractExercise, ServerAbstractExercise} from "./AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {promise} from "selenium-webdriver";
import {DifficultyEnum} from "../../_enums/DifficultyEnum";
import {DifficultyConverter} from "../../shared/DifficultyConverter";
import {Machine} from "../Machine";

export class CardioExercise extends AbstractExercise {
  times: number[];
  km: number;
  calories: number;
  speed: number;
  recovery: number;
  difficulty: DifficultyEnum;

  constructor(id: number, name: string, machines: Machine[],order:number=0) {
    super(id, name, machines, ExerciseGroupTypeEnum.CardioExercise,order);
    this.times = [];
    this.km = 0;
    this.calories = 0;
    this.speed = 0;
    this.recovery = 0;
    this.difficulty = DifficultyEnum.easy;
  }


  initFromRawObject(rawObject: any): CardioExercise {
    super.initFromRawObject(rawObject);
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
    serverExercise._id = this.id;
    serverExercise.order = this.order;
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