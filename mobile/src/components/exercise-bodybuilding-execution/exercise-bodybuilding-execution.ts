import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {AbstractExercise} from "../../models/exercise/AbstractExercise";
import {ExerciseExecutionContext} from "../../models/ExerciceExecutionContext";
import {IBodybuildingExerciseExecutableComponent} from "../IExerciseExecutableComponent";
import {BodybuildingExercise} from "../../models/exercise/BodybuildingExercise";
import {trigger, state, style, transition, animate, keyframes} from '@angular/animations';


/**
 * Generated class for the ExerciseBodybuildingExecutionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'exercise-bodybuilding-execution',
  templateUrl: 'exercise-bodybuilding-execution.html',
  animations: [
    trigger(
      'alertRefresh', [
        transition('0 => 1', animate("600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)", keyframes([
          style({transform: 'scale(2)', opacity: 1}),
          style({transform: 'scale(1)'})
        ])))

      ])
  ]
})
export class ExerciseBodybuildingExecutionComponent implements OnInit, IBodybuildingExerciseExecutableComponent {

  @Input() exerciseExecutionContext: ExerciseExecutionContext;
  @Output() finished: EventEmitter<ExerciseExecutionContext> = new EventEmitter<ExerciseExecutionContext>();
  exercise: AbstractExercise = null;
  recoveryDelay: number = null;
  actualized: boolean = false;

  constructor() {
  }

  ngOnInit() {
    this.exercise = this.exerciseExecutionContext.getExercise();
  }

  terminate(): void {
    this.finished.emit(this.exerciseExecutionContext);
  }

  startNextSerie(): void {
    if (this.exerciseExecutionContext.allSeriesIsDone() && this.exerciseExecutionContext.isInRecovery()) {
      this.exerciseExecutionContext.refreshState();
    }
    if (this.exerciseExecutionContext.isDone()) {
      this.terminate();
    } else {
      this.exerciseExecutionContext.startSerie();
    }
  }

  terminateCurrentSerie(): void {
    this.actualized = true;
    this.exerciseExecutionContext.terminateCurrentSerie();
    if (this.exerciseExecutionContext.isDone()) {
      this.recoveryDelay = (this.exercise as BodybuildingExercise).finalRecoveryTimes * 60;
    } else {
      this.recoveryDelay = (this.exercise as BodybuildingExercise).recoveryTimesBetweenEachSeries * 60;
    }
    this.exerciseExecutionContext.passInRecovery();
  }

  alertRefreshDone() {
    this.actualized = false;
  }
}
