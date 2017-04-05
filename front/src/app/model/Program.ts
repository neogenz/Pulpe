import {AbstractExercise} from "./exercise/AbstractExercise";
import {ExerciseFactory} from "./exercise/ExerciseFactory";

export class Program {
  level:number = null;
  goal:string;
  exercises:Map<string, AbstractExercise[]>;


  constructor() {
    this.exercises = new Map<string, AbstractExercise[]>();
  }


  public initFromRawObject(rawInitObject:any) {
    if (rawInitObject.level === undefined || rawInitObject.level === null) {
      throw new Error('Level is not defined in raw json.');
    }
    if (!rawInitObject.exercisesGroup) {
      throw new Error('exercises is not defined in raw json.');
    }
    this.level = rawInitObject.level;
    let rawExercisesByCurrentGroup = [];

    for (let groupKey in rawInitObject.exercisesGroup) {
      this.exercises.set(groupKey, []);
      rawExercisesByCurrentGroup = rawInitObject.exercisesGroup[groupKey];

      rawExercisesByCurrentGroup.forEach((rawExercise) => {
        this.exercises.get(groupKey).push(ExerciseFactory.create(rawExercise.type, rawExercise));
      });
    }
    return this;
  }

  public getNbExercises():number {
    let totalLength = 0;
    this.exercises.forEach((exercisesForCurrentGroup:AbstractExercise[])=> {
      totalLength += exercisesForCurrentGroup.length;
    });
    return totalLength;
  }
}