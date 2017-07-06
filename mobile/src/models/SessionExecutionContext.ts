import {Session} from "./Session";
import {SessionExecutionStateEnum} from "../enums/session-execution-state.enum";
import {ExerciseExecutionContext} from "./ExerciceExecutionContext";
import {AbstractExercise} from "./exercise/AbstractExercise";
/**
 * Created by maximedesogus on 29/06/2017.
 */
export class SessionExecutionContext {

  private _session: Session;
  private _state: SessionExecutionStateEnum;
  private _exerciseExecutionContext: ExerciseExecutionContext;
  private _nextExerciseExecutionContext: ExerciseExecutionContext;
  private _exercises: AbstractExercise[];
  private _currentExerciseIndex: number;

  constructor(session: Session) {
    this._currentExerciseIndex = 0;
    this._state = SessionExecutionStateEnum.WillStart;
    this._session = session;
    this._exercises = this._session.getExercises();
    this._exerciseExecutionContext = new ExerciseExecutionContext(this._getCurrentExercise());
    this._nextExerciseExecutionContext = new ExerciseExecutionContext(this._getNextExercise());
  }

  public start() {
    this._state = SessionExecutionStateEnum.Started;
   // this.startExercise();
  }

  public stop() {
    this._state = SessionExecutionStateEnum.Stoped;
  }

  public startExercise() {
    this._exerciseExecutionContext.start();
  }

  public terminateExercise() {
    this._exerciseExecutionContext.terminate();
  }

  public refreshState() {
    if (this._haveExercisesTodo()) {
      this._state = SessionExecutionStateEnum.InProgress;
    } else {
      this._state = SessionExecutionStateEnum.Done;
    }
  }

  private _haveExercisesTodo(): boolean {
    let todo = false;
    if (this._currentExerciseIndex < this._exercises.length - 1) {
      todo = true;
    }
    return todo;
  }

  public getExerciseInExecution(): AbstractExercise {
    return this._exerciseExecutionContext.getExercise();
  }

  private _getCurrentExercise(): AbstractExercise {
    return this._exercises[this._currentExerciseIndex];
  }

  private _getNextExercise(): AbstractExercise {
    return this._exercises[this._currentExerciseIndex + 1];
  }


  public isDone(): boolean {
    return this._state === SessionExecutionStateEnum.Done;
  }

  public nextExercise() {
    this._currentExerciseIndex++;
    this._exerciseExecutionContext.setExercise(this._exercises[this._currentExerciseIndex]);
    this._nextExerciseExecutionContext.setExercise(this._exercises[this._currentExerciseIndex + 1]);
  }

  public getExerciseExecutionContext(): ExerciseExecutionContext {
    return this._exerciseExecutionContext;
  }

  public getNextExerciseExecutionContext(): ExerciseExecutionContext {
    return this._nextExerciseExecutionContext;
  }

}