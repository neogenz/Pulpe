import {AbstractExercise} from "./AbstractExercise";

export class MassGainerExercise extends AbstractExercise {
  repetitions:number;
  series:number;
  weight:number;
  musclesWorked:any[];
  recoveryTimesBetweenEachSeries:number;
  finalRecoveryTimes:number;
  approximateTimeBySeries:number;


  constructor(id:number, name:string, machines:any[]) {
    super(id, name, machines);
  }

  initFromRawObject(rawObject:any):MassGainerExercise {
    this.repetitions = rawObject.repetitions;
    this.series = rawObject.series;
    this.weight = rawObject.weight;
    this.musclesWorked = rawObject.musclesWorked;
    this.recoveryTimesBetweenEachSeries = rawObject.recoveryTimesBetweenEachSeries;
    this.finalRecoveryTimes = rawObject.finalRecoveryTimes;
    this.approximateTimeBySeries = rawObject.approximateTimeBySeries;
    return this;
  }


  calculApproximateTime():number {
    let approximateTime:number = 0;

    approximateTime += this.series
      * (this.approximateTimeBySeries + this.recoveryTimesBetweenEachSeries)
      + this.finalRecoveryTimes;

    return approximateTime;
  }
}
