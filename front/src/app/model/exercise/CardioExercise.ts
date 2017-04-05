import {AbstractExercise} from "./AbstractExercise";

export class CardioExercise extends AbstractExercise {
  times:number[];
  km:number;
  calories:number;
  speed:number;
  musclesWorked:any[];
  recovery:CardioExercise;
  difficulty:number;


  constructor(id:number, name:string, machines:any[]) {
    super(id, name, machines);
  }

  initFromRawObject(rawObject:any):CardioExercise {
    this.times = rawObject.times;
    this.km = rawObject.km;
    this.calories = rawObject.calories;
    this.speed = rawObject.speed;
    this.musclesWorked = rawObject.musclesWorked;
    this.recovery = rawObject.recovery;
    this.difficulty = rawObject.difficulty;

    return this;
  }
}