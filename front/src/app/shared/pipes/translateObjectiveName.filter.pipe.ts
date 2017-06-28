import {Pipe, PipeTransform} from '@angular/core';
import {WorkedMuscle} from "../../_model/WorkedMuscle";
import {MuscleEnum} from "../../_enums/MuscleEnum";
import {MuscleConverter} from "../../shared/MuscleConverter";
import {ObjectiveConveter} from "../ObjectiveConverter";

@Pipe({
  name: 'translateObjectiveName',
  pure: false
})
export class TranslateObjectiveNamePipe implements PipeTransform {
  constructor(private objectiveConveter: ObjectiveConveter) {
  }

  transform(objective: string, value: string): string {
    if (!objective) {
      return;
    }
    return this.objectiveConveter.getLabelFrom(objective);
  }
}