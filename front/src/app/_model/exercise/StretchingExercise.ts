import {AbstractExercise} from "./AbstractExercise";

export class StretchingExercise extends AbstractExercise {
  time:number;

  constructor(id:number, name:string, machines:any[]) {
    super(id, name, machines);
  }

  initFromRawObject(rawObject:any):StretchingExercise {
    this.time = rawObject.time;

    return this;
  }


  calculApproximateTime():number {
    return this.time;
  }
}
