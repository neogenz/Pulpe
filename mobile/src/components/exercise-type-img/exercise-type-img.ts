import { Component, Input } from '@angular/core';
import { ExerciseGroupTypeEnum } from "../../enums/ExerciseGroupTypeEnum";

/**
 * Generated class for the ExerciseTypeImgComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'exercise-type-img',
  templateUrl: 'exercise-type-img.html'
})
export class ExerciseTypeImgComponent {

  @Input()
  exerciseTypeEnum: ExerciseGroupTypeEnum;
  ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;

  constructor() {
  }

}
