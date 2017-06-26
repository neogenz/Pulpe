import {AbstractExercise} from "./AbstractExercise";

export class TrainingExercise extends AbstractExercise {
  times: number;
  km: number;
  calories: number;
  speed: number;
  musclesWorked: any[];
  recovery: number;
  difficulty: number;

  constructor(id: number, name: string, machines: any[], type: string) {
    super(id, name, machines, type);
  }


  initFromRawObject(rawObject: any): TrainingExercise {
    this.times = rawObject.times;
    this.km = rawObject.km;
    this.calories = rawObject.calories;
    this.speed = rawObject.speed;
    this.musclesWorked = rawObject.musclesWorked;
    this.recovery = rawObject.recovery;
    this.difficulty = rawObject.difficulty;

    return this;
  }


  calculApproximateTime(): number {
    return this.times;
  }
}