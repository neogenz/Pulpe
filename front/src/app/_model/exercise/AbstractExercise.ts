import {WorkedMuscle} from "../WorkedMuscle";
export abstract class AbstractExercise {

  id: number;
  name: string;
  machines: any[];
  workedMuscles: WorkedMuscle[];
  approximateTime: number;
  type: string;

  constructor(id: number, name: string, machines: any[], type: string) {
    this.id = id;
    this.name = name;
    this.machines = machines;
    this.type = type;
    this.workedMuscles = [];
  }

  abstract initFromRawObject(rawObject: any): AbstractExercise;

  abstract calculApproximateTime(): number;
}
