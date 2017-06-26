import {AbstractExercise} from "./AbstractExercise";

export class BodybuildingExercise extends AbstractExercise {
  repetitions:number;
  series:number;
  weight:number;
  musclesWorked:any[];
  recoveryTimesBetweenEachSeries:number;
  finalRecoveryTimes:number;
  approximateTimeBySeries:number;


  constructor(id:number, name:string, machines:any[], type:string) {
    super(id, name, machines, type);
  }

  initFromRawObject(rawObject:any):BodybuildingExercise {
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
