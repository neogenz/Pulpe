import {Gym} from "./Gym";
import {WorkedMuscle} from "./WorkedMuscle";
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


  serialize(): promise.IThenable<ServerMachine> | ServerMachine {
    let serverMachine = new ServerMachine();
    let workedMuscleToServer: WorkedMuscle[] = [];
    serverMachine.name = this.name;
    this.workedMuscles.forEach(workedMuscle => {
      workedMuscleToServer.push(WorkedMuscle.of().name(MuscleEnum.Name[workedMuscle.name]).intensity(DifficultyEnum[workedMuscle.intensity]).build());
    });
    serverMachine.workedMuscles = workedMuscleToServer;
    serverMachine.gym = this.gym;
    serverMachine._id = this._id;
    return serverMachine;
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
  workedMuscles: WorkedMuscle[];
  gym: Gym;

  constructor() {

  }
}
