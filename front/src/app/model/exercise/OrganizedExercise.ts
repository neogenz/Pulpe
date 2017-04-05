import {AbstractExercise} from "./AbstractExercise";
import {DifficultyConverter} from "../../shared/DifficultyConverter";

export class OrganizedExercise extends AbstractExercise {
  difficulty:any; //EnumDifficulty
  musclesWorked:any[];

  constructor(id:number, name:string, machines:any[]) {
    super(id, name, machines);
  }


  initFromRawObject(rawObject:any):OrganizedExercise {
    this.difficulty = new DifficultyConverter().convertThis(rawObject.difficulty);
    this.musclesWorked = rawObject.musclesWorked;

    return this;
  }
}
