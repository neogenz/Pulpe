import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {LocalStorageService} from 'angular-2-local-storage';
import {environment} from '../../environments/environment'
import {Program} from "../_model/Program";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

//Merry, look 'Become ninja Angular 2' to understand this code :p
@Injectable()
export class ProgramService {

  constructor(private _http: AuthHttp, private localStorageService: LocalStorageService) {
  }


  /**
   * Find the current program of member
   * @returns {Observable<Program>}
   */
  findActiveByAuthenticatedMemberId(): Observable<Program> {
    let programLocallyStored: string = this.localStorageService.get<string>('program');
    if (programLocallyStored) {
      let rawProgram = JSON.parse(programLocallyStored);
      return Observable.of(Program.of()
        .sessionsFromServer(rawProgram.sessions)
        .createdAt(rawProgram.createdAt)
        .objective(rawProgram.objective)
        .level(rawProgram.level).build());
    } else {
      return this._http.get(`${environment.baseUrl()}/programs/active`)
        .map(res => {
          let data: any = this.extractData(res);
          this.localStorageService.set('program', JSON.stringify(data.program));
          return Program.of()
            .sessionsFromServer(data.program.sessions)
            .createdAt(data.program.createdAt)
            .objective(data.program.objective)
            .level(data.program.level).build();
        })
        .catch(this.handleError);
    }
  }


  private extractData(res: Response) {
    let body = res.json();
    return body || {};
  }


  private handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    //transforms the error into a user-friendly message, and returns the message in a new, failed observable
    return Observable.throw(errMsg);
  }
}
