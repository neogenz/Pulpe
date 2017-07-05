import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { ExerciseExecutionContext } from "../../models/ExerciceExecutionContext";
import { ICardioExerciseExecutableComponent } from "../IExerciseExecutableComponent";
import { AbstractExercise } from "../../models/exercise/AbstractExercise";
import { CardioExercise } from "../../models/exercise/CardioExercise";
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

/**
 * Generated class for the ExerciseCardioExecutionComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'exercise-cardio-execution',
  templateUrl: 'exercise-cardio-execution.html',
  animations: [
    trigger(
      'alertRefresh', [
        transition('0 => 1', animate("600ms cubic-bezier(0.68, -0.55, 0.265, 1.55)", keyframes([
          style({ transform: 'scale(2)', opacity: 1 }),
          style({ transform: 'scale(1)' })
        ])))

      ])
  ]
})
export class ExerciseCardioExecutionComponent implements OnInit, ICardioExerciseExecutableComponent {

  @Input() exerciseExecutionContext: ExerciseExecutionContext;
  @Output() finished: EventEmitter<ExerciseExecutionContext> = new EventEmitter<ExerciseExecutionContext>();
  delayIsFinished: boolean = false;
  exercise: AbstractExercise = null;
  actualized: boolean = false;
  recoveryDelay: number = null;

  constructor() {
    console.debug('ExerciseCardioExecutionComponent builded');
  }

  ngOnInit() {
    this.exercise = this.exerciseExecutionContext.getExercise();
  }

  terminateDelay() {
    this.delayIsFinished = true;
  }

  terminate() {
    this.finished.emit(this.exerciseExecutionContext);
  }

  startNextTime(): void {
    debugger;
    if (this.exerciseExecutionContext.allTimesIsDone() && this.exerciseExecutionContext.isInPause()) {
      this.exerciseExecutionContext.refreshState();
    }
    this.exerciseExecutionContext.startTime();

  }

  terminateCurrentTime(): void {
    this.actualized = true;
    this.exerciseExecutionContext.terminateCurrenTime();
    if (this.exerciseExecutionContext.isDone()) {
      this.terminate();
    } else {
      this.exerciseExecutionContext.passInPause();
    }
  }

  alertRefreshDone() {
    this.actualized = false;
  }

}
