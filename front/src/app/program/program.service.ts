import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {LocalStorageService} from 'angular-2-local-storage';
import {environment} from '../../environments/environment'
import {Program} from "../_model/Program";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {ObservableHelper} from "../_helpers/ObservableHelper";

//Merry, look 'Become ninja Angular 2' to understand this code :p
@Injectable()
export class ProgramService extends ObservableHelper {

  constructor(private _http: AuthHttp, private localStorageService: LocalStorageService) {
    super();
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
          let data: any = this.extractDataOf(res);
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
}
