import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Member} from "../_model/Member";
import {environment} from '../../environments/environment'
import {Session} from "../_model/Session";
import {AbstractExercise} from "../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../_enums/ExerciseGroupTypeEnum";
import {ExerciseFactory} from "../_model/exercise/ExerciseFactory";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class SessionsService {

  constructor(private _http: AuthHttp) {
  }

  /**
   * Find sessions of a member
   * @param {Member} member
   * @returns {Observable<Session>}
   */
  //todo refactor with session binded on server and session builder
  findBy(member: Member): Observable<Session> {
    return this._http.get(`http://localhost:4200/assets/stubs/sessions.json`)
      .map(res => {
        let data: any = this.extractData(res);
        return new Session();
      })
      .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }

  findActiveProgramByAuthenticatedUser() {
    let session: Session = null,
      sessions: Session[] = [];
    return this._http.get(`${environment.baseUrl()}/programs/active/sessions`)
      .map(res => {
        let rawSessions: any[] = this.extractData(res);
        rawSessions.forEach(rawSession => {
          session = Session.of()
            .objective(rawSession.objective)
            .exercisesGroupsFromServer(rawSession.exercises)
            .needTraining(rawSession.training)
            .doneCounter(rawSession.doneCounter)
            .createdAt(rawSession.createdAt)
            .mainMusclesGroup(rawSession.mainMusclesGroup)
            .build();
          sessions.push(session);
        });
        return sessions[0];
      })
      .catch(this.handleError);
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
