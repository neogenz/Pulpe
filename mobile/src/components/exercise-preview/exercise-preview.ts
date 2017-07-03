import {Component, Input} from '@angular/core';
import {AbstractExercise} from "../../models/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../enums/ExerciseGroupTypeEnum";
import {DifficultyConverter} from "../../shared/converters/DifficultyConverter";

/**
 * Generated class for the ExercisePreviewComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'exercise-preview',
  templateUrl: 'exercise-preview.html'
})
export class ExercisePreviewComponent {

  @Input() exercise: AbstractExercise;
  public ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;
  public difficultyConverter: DifficultyConverter;

  constructor() {
    this.difficultyConverter = new DifficultyConverter();
  }

}
