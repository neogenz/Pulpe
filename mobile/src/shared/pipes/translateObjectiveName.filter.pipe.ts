import { Pipe, PipeTransform } from '@angular/core';
import { ObjectiveConveter } from "../converters/ObjectiveConverter";

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