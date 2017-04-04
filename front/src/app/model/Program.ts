import {AbstractExercise} from "./exercise/AbstractExercise";
import {ExerciseFactory} from "./exercise/ExerciseFactory";

export class Program {
  level:number = null;
  goal: string;
  //training:AbstractExercise[] = [];
  //goal:AbstractExercise[] = [];
  //stretching:AbstractExercise[] = [];
  exercises:Map<string, AbstractExercise[]>;


  constructor() {
    this.exercises = new Map<string, AbstractExercise[]>();
  }

  public initFromRawObject(rawInitObject:any) {
    if (rawInitObject.level === undefined || rawInitObject.level === null) {
      throw new Error('Level is not defined in raw json.');
    }
    if (!rawInitObject.exercises) {
      throw new Error('exercises is not defined in raw json.');
    }

    this.level = rawInitObject.level;
    let rawExercises = [];
    let exercises = [];
    for (let exercisesGroupRawCode in rawInitObject.exercises) {
      rawExercises = rawInitObject.exercises[exercisesGroupRawCode];
      exercises = [];
      for (let i = 0, exercisesSize = rawExercises.length; i < exercisesSize; i++) {
        exercises.push(ExerciseFactory.create(rawExercises[i].type, rawExercises[i]));
      }
      this.exercises.set(exercisesGroupRawCode, exercises);
      debugger;
    }

    //let rawExercises = [];
    //for (let exercisesType in rawInitObject.exercises) {
    //  rawExercises = rawInitObject.exercises[exercisesType];
    //  for (let i = 0, exercisesSize = rawExercises.length; i < exercisesSize; i++) {
    //    this[exercisesType].push(ExerciseFactory.create(rawExercises[i].type, rawExercises[i]));
    //  }
    //
    //}
    return this;
  }
}