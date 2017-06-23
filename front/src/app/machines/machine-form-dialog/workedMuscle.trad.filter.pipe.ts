import {Pipe, PipeTransform} from '@angular/core';
import {WorkedMuscles} from "../../_model/WorkedMuscles";
import {MuscleEnum} from "../../_enums/MuscleEnum";
import {MuscleConverter} from "../../shared/MuscleConverter";

@Pipe({
  name: 'filterWorkedMuscle',
  pure: false
})
export class FilterWorkedMuscle implements PipeTransform {
  constructor(private muscleConverter: MuscleConverter) {
  }

  transform(workedMuscle: WorkedMuscles, value: string): string {
    if (!workedMuscle) {
      return;
    }
    let t = this.muscleConverter.getLabelFromEnum(workedMuscle.name);
    return t;
  }
}