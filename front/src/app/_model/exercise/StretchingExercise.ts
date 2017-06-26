import {AbstractExercise} from "./AbstractExercise";

export class StretchingExercise extends AbstractExercise {
  time: number;

  constructor(id: number, name: string, machines: any[], type: string) {
    super(id, name, machines, type);
  }

  initFromRawObject(rawObject: any): StretchingExercise {
    this.time = rawObject.time;

    return this;
  }


  calculApproximateTime(): number {
    return this.time;
  }
}
