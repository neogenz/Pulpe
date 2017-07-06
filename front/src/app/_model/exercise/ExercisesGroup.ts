import { AbstractExercise } from "./AbstractExercise";
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

  addOrReplaceOne(exercise: AbstractExercise): AbstractExercise {
    for (let i = 0; i < this.exercises.length; i++) {
      if (this.exercises[i].id === exercise.id) {
        this.exercises[i] = exercise;
        return this.exercises[i];
      }
    }
    this.exercises.push(exercise);
    return exercise;
  }

  public removeOne(exerciseToDelete:AbstractExercise): AbstractExercise{
    this.exercises = this.exercises.filter(exercise => exercise.id !== exerciseToDelete.id);
    return exerciseToDelete;
  }

  /**
   * Find exercise by this id
   * @param {AbstractExercise} exercise 
   */
  public haveThis(exercise: AbstractExercise): boolean {
    return this.exercises.find(e => e.id === exercise.id) !== undefined;
  }
}