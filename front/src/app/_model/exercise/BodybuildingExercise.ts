import {AbstractExercise, ServerAbstractExercise} from "./AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {promise} from "selenium-webdriver";

export class BodybuildingExercise extends AbstractExercise {
  repetitions: number;
  series: number;
  weight: number;
  recoveryTimesBetweenEachSeries: number;
  finalRecoveryTimes: number;
  approximateTimeBySeries: number;


  constructor(id: number, name: string, machines: any[]) {
    super(id, name, machines, ExerciseGroupTypeEnum.BodybuildingExercise);
    this.repetitions = 0;
    this.series = 0;
    this.weight = 0;
    this.recoveryTimesBetweenEachSeries = 0;
    this.finalRecoveryTimes = 0;
    this.approximateTimeBySeries = 0;
  }

  initFromRawObject(rawObject: any): BodybuildingExercise {
    this.repetitions = rawObject.repetitions ? rawObject.repetitions : this.repetitions;
    this.series = rawObject.series ? rawObject.series : this.series;
    this.weight = rawObject.weight ? rawObject.weight : this.weight;
    this.workedMuscles = rawObject.musclesWorked ? rawObject.musclesWorked : this.workedMuscles;
    this.recoveryTimesBetweenEachSeries = rawObject.recoveryTimesBetweenEachSeries ? rawObject.recoveryTimesBetweenEachSeries : this.recoveryTimesBetweenEachSeries;
    this.finalRecoveryTimes = rawObject.finalRecoveryTimes ? rawObject.finalRecoveryTimes : this.finalRecoveryTimes;
    this.approximateTimeBySeries = rawObject.approximateTimeBySeries ? rawObject.approximateTimeBySeries : this.approximateTimeBySeries;
    return this;
  }


  calculApproximateTime(): number {
    let approximateTime: number = 0;

    approximateTime += this.series
      * (this.approximateTimeBySeries + this.recoveryTimesBetweenEachSeries)
      + this.finalRecoveryTimes;

    return approximateTime;
  }


  serialize(): promise.IThenable<ServerAbstractExercise> | ServerAbstractExercise {
    let serverExercise: ServerBodybuildingExercise = new ServerBodybuildingExercise();
    serverExercise.weight = this.weight;
    serverExercise.repetitions = this.repetitions;
    serverExercise.approximateTimeBySeries = this.approximateTimeBySeries;
    serverExercise.finalRecoveryTimes = this.finalRecoveryTimes;
    serverExercise.recoveryTimesBetweenEachSeries = this.recoveryTimesBetweenEachSeries;
    serverExercise.series = this.series;
    serverExercise.id = this.id;
    serverExercise.name = this.name;
    serverExercise.machines = this.machines.map(m => m.serialize());
    serverExercise.approximateTime = this.approximateTime;
    serverExercise.workedMuscles = this.workedMuscles.map(m=>m.serialize());
    serverExercise.type = ExerciseGroupTypeEnum[this.type];
    return serverExercise;
  }
}

export class ServerBodybuildingExercise extends ServerAbstractExercise {
  repetitions: number;
  series: number;
  weight: number;
  recoveryTimesBetweenEachSeries: number;
  finalRecoveryTimes: number;
  approximateTimeBySeries: number;
}

