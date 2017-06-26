import {AbstractExercise} from "./AbstractExercise";
/**
 * Created by maximedesogus on 24/06/2017.
 */

export class ExercisesGroup {

  groupType: string;
  exercises: AbstractExercise[];

  constructor(groupType: string, exercises: AbstractExercise[]) {
    this.groupType = groupType;
    this.exercises = exercises;
  }

  isGroupOf(type: string): boolean {
    return this.groupType === type;
  }

  addOne(exercise: AbstractExercise): void {
    this.exercises.push(exercise);
  }
}