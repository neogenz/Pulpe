import { Gym } from "./Gym";
import { ServerWorkedMuscle, WorkedMuscle } from "./WorkedMuscle";
import { MuscleEnum } from "../enums/MuscleEnum";
import { DifficultyEnum } from "../enums/DifficultyEnum";
export class Machine {

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }

  _id: string;
  name: string;
  comment: string;
  workedMuscles: WorkedMuscle[];
  gym: Gym;

  public static of(): MachineBuilder {
    return new MachineBuilder();
  }


  serialize(): ServerMachine {
    let serverMachine = new ServerMachine();
    serverMachine.name = this.name;
    serverMachine.workedMuscles = this.workedMuscles.map(m => m.serialize());
    serverMachine.gym = this.gym;
    serverMachine.comment = this.comment;
    serverMachine._id = this._id;
    return serverMachine;
  }

  public isSame(machine: Machine): boolean {
    return this.name === machine.name;
  }
}

/**
 * Class used to implement Builder pattern.
 */
class MachineBuilder {
  private me: Machine = new Machine();

  public id(_id: string): MachineBuilder {
    this.me._id = _id;
    return this;
  }

  public name(name: string): MachineBuilder {
    this.me.name = name;
    return this;
  }

  public comment(comment: string): MachineBuilder {
    this.me.comment = comment;
    return this;
  }

  public workedMuscles(workedMuscles: WorkedMuscle[]): MachineBuilder {
    this.me.workedMuscles = workedMuscles;
    return this;
  }

  public gym(gym: Gym): MachineBuilder {
    this.me.gym = gym;
    return this;
  }

  public build(): Machine {
    return this.me;
  }
}


export class ServerMachine {
  _id: string;
  name: string;
  comment: string;
  workedMuscles: ServerWorkedMuscle[];
  gym: Gym;

  constructor() {

  }
}
