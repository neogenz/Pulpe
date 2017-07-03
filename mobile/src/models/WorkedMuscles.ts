import { MuscleEnum } from "../enums/MuscleEnum";
export class WorkedMuscles {

  constructor() {
  }

  public initFromRawObject(rawInitObject: any) {
    return this;
  }

  intensity: string;
  name: any;

  public static of(): WorkedMusclesBuilder {
    return new WorkedMusclesBuilder();
  }
}

/**
 * Class used to implement Builder pattern.
 */
class WorkedMusclesBuilder {
  private me: WorkedMuscles = new WorkedMuscles();

  public intensity(intensity: string): WorkedMusclesBuilder {
    this.me.intensity = intensity;
    return this;
  }

  public name(name: any): WorkedMusclesBuilder {
    this.me.name = name;
    return this;
  }

  public build(): WorkedMuscles {
    return this.me;
  }
}
