import {AbstractExercise, ServerAbstractExercise} from "./AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {promise} from "selenium-webdriver";
import {DifficultyEnum} from "../../_enums/DifficultyEnum";
import {Machine} from "../Machine";

export class StretchingExercise extends AbstractExercise {
  time: number;

  constructor(id: number, name: string, machines: Machine[],order:number=0) {
    super(id, name, machines, ExerciseGroupTypeEnum.StretchingExercise,order);
    this.time = 0;
  }

  initFromRawObject(rawObject: any): StretchingExercise {
    super.initFromRawObject(rawObject);
    this.time = rawObject.time ? rawObject.time : this.time;
    return this;
  }


  calculApproximateTime(): number {
    return this.time;
  }

  serialize(): promise.IThenable<ServerStretchingExercise> | ServerStretchingExercise {
    let serverExercise: ServerStretchingExercise = new ServerStretchingExercise();
    serverExercise.time = this.time;
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

export class ServerStretchingExercise extends ServerAbstractExercise {
  time: number;
}

