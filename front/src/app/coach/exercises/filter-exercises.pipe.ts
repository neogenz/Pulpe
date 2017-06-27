import {Pipe, PipeTransform} from '@angular/core';
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {MuscleConverter} from "../../shared/MuscleConverter";

@Pipe({
  name: 'filterExercises'
})
export class FilterExercisesPipe implements PipeTransform {
  transform(exercises: AbstractExercise[], args?: any): any {
    if (!exercises || !args) {
      return exercises;
    }
    let filtered: any = exercises.filter(exercise => exercise.name.toLocaleLowerCase().includes(args.toLocaleLowerCase()));
    return filtered;
  }
}
