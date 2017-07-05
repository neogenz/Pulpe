import { ExerciseExecutionStateEnum } from "../enums/exercise-execution-state.enum";
import { AbstractExercise } from "./exercise/AbstractExercise";
import { BodybuildingExercise } from "./exercise/BodybuildingExercise";
import { CardioExercise } from "./exercise/CardioExercise";
export class ExerciseExecutionContext {

  private _state: ExerciseExecutionStateEnum;
  private _exercise: AbstractExercise;
  private _seriesTodo: number;
  private _timesTodo: number;

  constructor(exercise: AbstractExercise) {
    this._exercise = exercise;
    this._state = ExerciseExecutionStateEnum.WillStart;
  }

  public getExercise(): AbstractExercise {
    return this._exercise;
  }

  start() {
    this._state = ExerciseExecutionStateEnum.Started;
  }

  terminate() {
    this._state = ExerciseExecutionStateEnum.Done;
  }

  setExercise(exercise: AbstractExercise) {
    debugger;
    this._exercise = exercise;
    if (this._exercise instanceof BodybuildingExercise) {
      this._seriesTodo = this._exercise.series;
    }
    if (this._exercise instanceof CardioExercise) {
      this._timesTodo = this._exercise.times.length;
    }
  }

  isDone() {
    return this._state === ExerciseExecutionStateEnum.Done;
  }

  isInRecovery() {
    return this._state === ExerciseExecutionStateEnum.WaitingRecovery;
  }

  isInProgress(){
    return this._state === ExerciseExecutionStateEnum.InProgress;
  }

  isInPause(){
    return this._state === ExerciseExecutionStateEnum.InPause;
  }

  passInRecovery() {
    this._state = ExerciseExecutionStateEnum.WaitingRecovery;
  }

  passInProgress() {
    this._state = ExerciseExecutionStateEnum.InProgress;
  }

  passInPause(){
    this._state = ExerciseExecutionStateEnum.InPause;
  }

  refreshState() {
    if (this._exercise instanceof BodybuildingExercise) {
      if (this._seriesTodo <= 0) {
        this._state = ExerciseExecutionStateEnum.Done;
      }
    } else if (this._exercise instanceof CardioExercise) {
      if (this._timesTodo <= 0) {
        this._state = ExerciseExecutionStateEnum.Done;
      }
    }
  }

  startSerie() {
    if (this._seriesTodo > 0) {
      this.passInProgress();
    }
    this.refreshState();
  }

  terminateCurrentSerie() {
    if (this._seriesTodo > 0) {
      this._seriesTodo--;
    }
    this.refreshState();
  }

  allSeriesIsDone(): boolean {
    return this._seriesTodo === 0;
  }

  getSeriesTodo(): number {
    return this._seriesTodo;
  }

  isLastSerie(): boolean {
    return this._seriesTodo === 1;
  }

  startTime() {
    if (this._timesTodo > 0) {
      this.passInProgress();
    }
    this.refreshState();
  }

  terminateCurrenTime() {
    if (this._timesTodo > 0) {
      this._timesTodo--;
    }
    this.refreshState();
  }

  allTimesIsDone(): boolean {
    return this._timesTodo === 0;
  }

  getTimesTodo(): number {
    return this._timesTodo;
  }

  isLastTimes(): boolean {
    return this._timesTodo === 1;
  }

  isFirstTimes():boolean{
    return this._timesTodo === (this._exercise as CardioExercise).times.length;
  }
}
