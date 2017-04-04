import {AbstractExercise} from "./AbstractExercise";

export class StretchingExercise extends AbstractExercise {
  time:number;

  constructor(id:number, name:string) {
    super(id, name);
  }

  initFromRawObject(rawObject:any):StretchingExercise {
    this.time = rawObject.time;

    return this;
  }
}
