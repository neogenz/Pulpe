import {ServerWorkedMuscle, WorkedMuscle} from "../WorkedMuscle";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {promise, Serializable} from "selenium-webdriver";
import {Machine, ServerMachine} from "../Machine";
import {MuscleConverter} from "../../shared/MuscleConverter";
import {MuscleEnum} from "../../_enums/MuscleEnum";
export abstract class AbstractExercise implements Serializable<ServerAbstractExercise> {

  id: number;
  name: string;
  machines: Machine[];
  workedMuscles: WorkedMuscle[];
  approximateTime: number;
  type: ExerciseGroupTypeEnum;
  order:number;

  constructor(id: number, name: string, machines: Machine[], type: ExerciseGroupTypeEnum, order:number=0) {
    this.id = id;
    this.name = name;
    this.machines = machines ? machines : [];
    this.type = type;
    this.workedMuscles = [];
    this.approximateTime = 0;
    this.order = order;
  }

  initFromRawObject(rawObject: any): AbstractExercise {
    let muscleConverter: MuscleConverter = new MuscleConverter();
    if (rawObject.workedMuscles) {
      this.workedMuscles = rawObject.workedMuscles.map(muscle => WorkedMuscle.of()
        .name(muscleConverter.getEnumFromName(muscle.name))
        .intensityFromServer(muscle.intensity)
        .build());
    }
    if (rawObject.machines) {
      this.machines = [];
      rawObject.machines.forEach(machine => {
        this.machines.push(Machine.of()
          .id(machine._id)
          .name(machine.name)
          .workedMuscles(rawObject.workedMuscles.map(muscle => WorkedMuscle.of()
            .name(muscleConverter.getEnumFromName(muscle.name))
            .intensityFromServer(muscle.intensity)
            .build()))
          .gym(machine.gym)
          .build());
      });
    }
    return this;
  }

  abstract calculApproximateTime(): number;


  abstract serialize(): promise.IThenable<ServerAbstractExercise> | ServerAbstractExercise;
}

export abstract class ServerAbstractExercise {
  _id: number;
  name: string;
  order:number;
  machines: ServerMachine[];
  workedMuscles: ServerWorkedMuscle[];
  approximateTime: number;
  type: string;
}