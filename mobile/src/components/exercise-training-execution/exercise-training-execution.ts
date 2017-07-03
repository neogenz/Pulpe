import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {AbstractExercise} from "../../models/exercise/AbstractExercise";
import {ExerciseExecutionContext} from "../../models/ExerciceExecutionContext";

/**
 * Generated class for the ExerciseTrainingExecutionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'exercise-training-execution',
  templateUrl: 'exercise-training-execution.html'
})
export class ExerciseTrainingExecutionComponent implements OnInit {

  @Input() exerciseExecutionContext: ExerciseExecutionContext;
  @Output() finished: EventEmitter<ExerciseExecutionContext> = new EventEmitter<ExerciseExecutionContext>();
  delayIsFinished: boolean = false;

  constructor() {
    console.debug('ExerciseTrainingExecutionComponent builded');
  }

  ngOnInit() {
  }

  terminateDelay() {
    this.delayIsFinished = true;
  }

  terminate() {
    this.finished.emit(this.exerciseExecutionContext);
  }

}
