import {Gym} from "./Gym";
import {ServerWorkedMuscle, WorkedMuscle} from "./WorkedMuscle";
import {MuscleEnum} from "../_enums/MuscleEnum";
import {DifficultyEnum} from "../_enums/DifficultyEnum";
import {promise, Serializable} from "selenium-webdriver";
export class Machine implements Serializable<ServerMachine> {

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }

  _id: string;
  name: string;
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
  workedMuscles: ServerWorkedMuscle[];
  gym: Gym;

  constructor() {

  }
}
