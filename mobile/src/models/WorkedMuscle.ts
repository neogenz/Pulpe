import { MuscleEnum } from "../enums/MuscleEnum";
import { DifficultyEnum } from "../enums/DifficultyEnum";
export class WorkedMuscle {
  intensity: DifficultyEnum | string;
  name: MuscleEnum.Name | string;

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }


  public static of(): WorkedMusclesBuilder {
    return new WorkedMusclesBuilder();
  }

  public isSame(workedMuscle: WorkedMuscle): boolean {
    if (this.name === workedMuscle.name && this.intensity === workedMuscle.intensity) {
      return !(this.name === workedMuscle.name && this.intensity !== workedMuscle.intensity);
    }
    return false;
  }


  serialize(): ServerWorkedMuscle {
    let serverWorkedMuscle: ServerWorkedMuscle = new ServerWorkedMuscle();
    serverWorkedMuscle.name = MuscleEnum.Name[this.name];
    serverWorkedMuscle.intensity = DifficultyEnum[this.intensity];
    return serverWorkedMuscle;
  }
}

/**
 * Class used to implement Builder pattern.
 */
class WorkedMusclesBuilder {
  private me: WorkedMuscle = new WorkedMuscle();

  public intensity(intensity: DifficultyEnum): WorkedMusclesBuilder {
    this.me.intensity = intensity;
    return this;
  }

  public intensityFromServer(intensity: string): WorkedMusclesBuilder {
    this.me.intensity = DifficultyEnum[intensity];
    return this;
  }

  public name(name: MuscleEnum.Name): WorkedMusclesBuilder {
    this.me.name = name;
    return this;
  }

  public build(): WorkedMuscle {
    return this.me;
  }
}

export class ServerWorkedMuscle {
  intensity: string;
  name: string;

  constructor() {

  }
}
