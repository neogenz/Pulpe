import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Rx';
import { Session } from "../models/Session";
import { AbstractExercise } from "../models/exercise/AbstractExercise";
import { AuthHttp } from "angular2-jwt";
import { environment } from "../environment";
import { ObservableHelper } from "../helpers/ObserverHelper";

@Injectable()
export class SessionService extends ObservableHelper {

  constructor(private _http: AuthHttp) {
    super();
  }

  findSessionTodo(): Observable<Session> {
    let session: Session = null;
    return this._http.get(`${environment.baseUrl()}/programs/active/sessions/todo`)
      .map(res => {
        let rawSession: any = this.extractDataOf(res);
        session = Session.of()
          .id(rawSession._id)
          .objective(rawSession.objective)
          .exercisesGroupsFromServer(rawSession.exercises)
          .needTraining(rawSession.training)
          .doneCounter(rawSession.doneCounter)
          .createdAt(rawSession.createdAt)
          .dayInWeek(rawSession.dayInWeek)
          .mainMusclesGroup(rawSession.mainMusclesGroup)
          .build();
        return session;
      }).catch(this.handleError);
  }

  doneCurrentSession(): Observable<Session> {
    let newSessionTodo: Session = null;
    return this._http.put(`${environment.baseUrl()}/programs/active/sessions/todo/done`, {})
      .map(res => {
        let data: any = this.extractDataOf(res);
        const rawNewSessionTodo = data.newSessionTodo;
        newSessionTodo = Session.of()
          .id(rawNewSessionTodo._id)
          .objective(rawNewSessionTodo.objective)
          .exercisesGroupsFromServer(rawNewSessionTodo.exercises)
          .needTraining(rawNewSessionTodo.training)
          .doneCounter(rawNewSessionTodo.doneCounter)
          .createdAt(rawNewSessionTodo.createdAt)
          .dayInWeek(rawNewSessionTodo.dayInWeek)
          .mainMusclesGroup(rawNewSessionTodo.mainMusclesGroup)
          .build();
        return newSessionTodo;
      }).catch(this.handleError);
  }


  findAllSessionOfActiveProgramByAuthenticatedMember(): Observable<Session[]> {
    let sessions: Session[] = [];
    let session: Session;
    return this._http.get(`${environment.baseUrl()}/programs/active/sessions`)
      .map(res => {
        let rawSessions: any = this.extractDataOf(res);
        rawSessions.forEach(rawSession => {
          session = Session.of()
            .id(rawSession._id)
            .objective(rawSession.objective)
            .exercisesGroupsFromServer(rawSession.exercises)
            .needTraining(rawSession.training)
            .doneCounter(rawSession.doneCounter)
            .createdAt(rawSession.createdAt)
            .dayInWeek(rawSession.dayInWeek)
            .mainMusclesGroup(rawSession.mainMusclesGroup)
            .build();
          sessions.push(session);
        });
        return sessions;
      }).catch(this.handleError);
  }

  changeSessionTodoBy(sessionId: string): Observable<Session> {
    let newSessionTodo: Session = null;
    return this._http.put(`${environment.baseUrl()}/programs/active/sessions/todo`, {
      id: sessionId
    })
      .map(res => {
        let data: any = this.extractDataOf(res);
        const rawNewSessionTodo = data.newSessionTodo;
        newSessionTodo = Session.of()
          .id(rawNewSessionTodo._id)
          .objective(rawNewSessionTodo.objective)
          .exercisesGroupsFromServer(rawNewSessionTodo.exercises)
          .needTraining(rawNewSessionTodo.training)
          .doneCounter(rawNewSessionTodo.doneCounter)
          .createdAt(rawNewSessionTodo.createdAt)
          .dayInWeek(rawNewSessionTodo.dayInWeek)
          .mainMusclesGroup(rawNewSessionTodo.mainMusclesGroup)
          .build();
        return newSessionTodo;
      }).catch(this.handleError);
  }

  /**
   * Calcul and return the total time of the session.
   * @param {Session} session
   * @returns {number}
   */
  getTotalTimeOf(session: Session): number {
    let totalTime: number = 0;

    session.exercisesGroups.forEach(exercisesGroup => {
      exercisesGroup.exercises.forEach((exercise: AbstractExercise) => {
        totalTime += exercise.approximateTime;
      });
    });

    totalTime = Math.ceil(totalTime);

    return totalTime;
  }
}
