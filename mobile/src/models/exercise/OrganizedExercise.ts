import { AbstractExercise, ServerAbstractExercise } from "./AbstractExercise";
import { DifficultyConverter } from "../../shared/converters/DifficultyConverter";
import { ExerciseGroupTypeEnum } from "../../enums/ExerciseGroupTypeEnum";
import { DifficultyEnum } from "../../enums/DifficultyEnum";
import { ServerCardioExercise } from "./CardioExercise";
import { Machine } from "../Machine";

export class OrganizedExercise extends AbstractExercise {
  difficulty: DifficultyEnum;

  constructor(id: number, name: string, machines: Machine[]) {
    super(id, name, machines, ExerciseGroupTypeEnum.OrganizedExercise);
    this.difficulty = DifficultyEnum.easy;
  }


  initFromRawObject(rawObject: any): OrganizedExercise {
    super.initFromRawObject(rawObject);
    this.difficulty = rawObject.difficulty ? new DifficultyConverter().getEnumFromName(rawObject.difficulty) : this.difficulty;
    this.approximateTime = rawObject.approximateTime ? rawObject.approximateTime : this.approximateTime;
    return this;
  }


  calculApproximateTime(): number {
    return this.approximateTime;
  }

  serialize(): ServerOrganizedExercise {
    let serverExercise: ServerOrganizedExercise = new ServerOrganizedExercise();
    serverExercise.difficulty = DifficultyEnum[this.difficulty];
    serverExercise._id = this.id;
    serverExercise.name = this.name;
    serverExercise.machines = this.machines.map(m => m.serialize());
    serverExercise.approximateTime = this.approximateTime;
    serverExercise.workedMuscles = this.workedMuscles.map(m => m.serialize());
    serverExercise.type = ExerciseGroupTypeEnum[this.type];
    return serverExercise;
  }
}

export class ServerOrganizedExercise extends ServerAbstractExercise {
  difficulty: string;
  approximateTime: number;
}
