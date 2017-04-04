import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Member } from "../model/Member";
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment'
import {Program} from "../model/Program";

//Merry, look 'Become ninja Angular 2' to understand this code :p
@Injectable()
export class ProgramService {

  constructor(private _http:Http, private localStorageService:LocalStorageService) {
  }


  /**
   * Find the current program of member
   * @param {Member} member
   * @returns {Observable<Program>}
   */
  findBy(member:Member):Observable<Program> {
    //let programLocallyStored:string = this.localStorageService.get<string>('program');

    //if (programLocallyStored.length) {
    //  let rawProgram = JSON.parse(programLocallyStored);
    //  return Observable.of(new Program().initFromRawObject(rawProgram));
    //} else {
    return this._http.get(environment.baseUrl() + '/assets/stubs/programs.json')
      .map(res => {
        let data:any = this.extractData(res);
        //this.localStorageService.set('program', JSON.stringify(data.massGainers[0]));
        return new Program().initFromRawObject(data.massGainers[0]);
      })
      .catch(this.handleError);
    //}
  }

  private extractData(res:Response) {
    let body = res.json();
    return body || {};
  }

  private handleError(error:any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    //transforms the error into a user-friendly message, and returns the message in a new, failed observable
    return Observable.throw(errMsg);
  }

}
