import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {AbstractExercise} from "../../models/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../enums/ExerciseGroupTypeEnum";
import {ExerciseExecutionContext} from "../../models/ExerciceExecutionContext";
import {ExerciseBodybuildingExecutionComponent} from "../exercise-bodybuilding-execution/exercise-bodybuilding-execution";

/**
 * Generated class for the ExerciseExecutionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'exercise-execution',
  templateUrl: 'exercise-execution.html'
})
export class ExerciseExecutionComponent implements OnInit {

  @Input() exerciseExecutionContext: ExerciseExecutionContext;
  @Output() finished: EventEmitter<ExerciseExecutionContext> = new EventEmitter<ExerciseExecutionContext>();
  ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;

  constructor() {
  }

  ngOnInit(): void {
  }

  terminate() {
    this.exerciseExecutionContext.terminate();
    this.finished.emit(this.exerciseExecutionContext);
  }
}
