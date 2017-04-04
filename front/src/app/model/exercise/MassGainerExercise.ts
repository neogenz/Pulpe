import {AbstractExercise} from "./AbstractExercise";

export class MassGainerExercise extends AbstractExercise {
  repetitions:number;
  series:number;
  weight:number;
  musclesWorked:any[];
  recoveryTimesBetweenEachSeries:number;
  finalRecoveryTimes:number;


  constructor(id:number, name:string) {
    super(id, name);
  }

  initFromRawObject(rawObject:any):MassGainerExercise {
    this.repetitions = rawObject.repetitions;
    this.series = rawObject.series;
    this.weight = rawObject.weight;
    this.musclesWorked = rawObject.musclesWorked;
    this.recoveryTimesBetweenEachSeries = rawObject.recoveryTimesBetweenEachSeries;
    this.finalRecoveryTimes = rawObject.finalRecoveryTimes;

    return this;
  }
}
