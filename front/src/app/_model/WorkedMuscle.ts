import {MuscleEnum} from "../_enums/MuscleEnum";
import {DifficultyEnum} from "../_enums/DifficultyEnum";
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
    return workedMuscle.intensity === this.intensity && this.name === workedMuscle.name;
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
