import {ExerciseExecutionStateEnum} from "../enums/exercise-execution-state.enum";
import {AbstractExercise} from "./exercise/AbstractExercise";
import {BodybuildingExercise} from "./exercise/BodybuildingExercise";
export class ExerciseExecutionContext {

  private _state: ExerciseExecutionStateEnum;
  private _exercise: AbstractExercise;
  private _seriesTodo: number;

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
    this._exercise = exercise;
    if (this._exercise instanceof BodybuildingExercise) {
      this._seriesTodo = this._exercise.series;
    }
  }

  isDone() {
    return this._state === ExerciseExecutionStateEnum.Done;
  }

  isInRecovery() {
    return this._state === ExerciseExecutionStateEnum.WaitingRecovery;
  }

  passInRecovery() {
    this._state = ExerciseExecutionStateEnum.WaitingRecovery;
  }

  passInProgress() {
    this._state = ExerciseExecutionStateEnum.InProgress;
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

  refreshState() {
    if (this._exercise instanceof BodybuildingExercise) {
      if (this._seriesTodo <= 0) {
        this._state = ExerciseExecutionStateEnum.Done;
      }
    }
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
}
