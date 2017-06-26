import {ServerWorkedMuscle, WorkedMuscle} from "../WorkedMuscle";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {promise, Serializable} from "selenium-webdriver";
import {Machine, ServerMachine} from "../Machine";
export abstract class AbstractExercise implements Serializable<ServerAbstractExercise> {

  id: number;
  name: string;
  machines: Machine[];
  workedMuscles: WorkedMuscle[];
  approximateTime: number;
  type: ExerciseGroupTypeEnum;

  constructor(id: number, name: string, machines: Machine[], type: ExerciseGroupTypeEnum) {
    this.id = id;
    this.name = name;
    this.machines = machines;
    this.type = type;
    this.workedMuscles = [];
    this.approximateTime = 0;
  }

  abstract initFromRawObject(rawObject: any): AbstractExercise;

  abstract calculApproximateTime(): number;


  abstract serialize(): promise.IThenable<ServerAbstractExercise> | ServerAbstractExercise;
}

export abstract class ServerAbstractExercise {
  id: number;
  name: string;
  machines: ServerMachine[];
  workedMuscles: ServerWorkedMuscle[];
  approximateTime: number;
  type: string;
}