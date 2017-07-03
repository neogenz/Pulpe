import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {DifficultyConverter} from "../../shared/converters/DifficultyConverter";
import {AbstractExercise} from "../../models/exercise/AbstractExercise";
import {ExerciseExecutionContext} from "../../models/ExerciceExecutionContext";
import {IOrganizedExerciseExecutableComponent} from "../IExerciseExecutableComponent";

/**
 * Generated class for the ExerciseOrganizedExecutionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'exercise-organized-execution',
  templateUrl: 'exercise-organized-execution.html'
})
export class ExerciseOrganizedExecutionComponent implements OnInit, IOrganizedExerciseExecutableComponent {
  @Input() exerciseExecutionContext: ExerciseExecutionContext;
  @Output() finished: EventEmitter<ExerciseExecutionContext> = new EventEmitter<ExerciseExecutionContext>();

  constructor(public difficultyConverter: DifficultyConverter) {
  }


  ngOnInit(): void {
  }

  terminate(): void {
    this.finished.emit(this.exerciseExecutionContext);
  }
}
