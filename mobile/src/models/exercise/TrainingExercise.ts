import { AbstractExercise, ServerAbstractExercise } from "./AbstractExercise";
import { ExerciseGroupTypeEnum } from "../../enums/ExerciseGroupTypeEnum";
import { DifficultyEnum } from "../../enums/DifficultyEnum";
import { DifficultyConverter } from "../../shared/converters/DifficultyConverter";
import { Machine } from "../Machine";

export class TrainingExercise extends AbstractExercise {
  times: number;
  km: number;
  calories: number;
  speed: number;
  recovery: number;
  difficulty: DifficultyEnum;

  constructor(id: number, name: string, machines: Machine[], order:number = 0) {
    super(id, name, machines, ExerciseGroupTypeEnum.TrainingExercise, order);
    this.times = 0;
    this.km = 0;
    this.calories = 0;
    this.recovery = 0;
    this.difficulty = DifficultyEnum.easy;
  }


  initFromRawObject(rawObject: any): TrainingExercise {
    super.initFromRawObject(rawObject);
    this.times = rawObject.times ? rawObject.times : this.times;
    this.km = rawObject.km ? rawObject.km : this.km;
    this.calories = rawObject.calories ? rawObject.calories : this.calories;
    this.speed = rawObject.speed ? rawObject.speed : this.speed;
    this.recovery = rawObject.recovery ? rawObject.recovery : this.recovery;
    this.difficulty = rawObject.difficulty ? new DifficultyConverter().getEnumFromName(rawObject.difficulty) : this.difficulty;

    return this;
  }


  calculApproximateTime(): number {
    return this.times;
  }

  serialize(): ServerTrainingExercise {
    let serverExercise: ServerTrainingExercise = new ServerTrainingExercise();
    serverExercise.times = this.times;
    serverExercise.km = this.km;
    serverExercise.calories = this.calories;
    serverExercise.speed = this.speed;
    serverExercise.recovery = this.recovery;
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

export class ServerTrainingExercise extends ServerAbstractExercise {
  times: number;
  km: number;
  calories: number;
  speed: number;
  recovery: number;
  difficulty: string;
}