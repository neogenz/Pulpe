import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable }     from 'rxjs/Observable';
import { Member } from "../_model/Member";
import { LocalStorageService } from 'angular-2-local-storage';
import { environment } from '../../environments/environment'
import {Program} from "../_model/Program";
import {AbstractExercise} from "../_model/exercise/AbstractExercise";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

//Merry, look 'Become ninja Angular 2' to understand this code :p
@Injectable()
export class ProgramService {

  constructor(private _http:AuthHttp, private localStorageService:LocalStorageService) {
  }


  /**
   * Calcul and return the total time of the program.
   * @param {Program} program
   * @returns {number}
   */
  getTotalTimeOf(program:Program):number {
    let totalTime:number = 0;

    program.exercises.forEach((exercises:AbstractExercise[], exerciseGroupCode:string) => {
      exercises.forEach((exercise:AbstractExercise)=> {
        totalTime += exercise.approximateTime;
      });
    });

    totalTime = Math.ceil(totalTime);

    return totalTime;
  }


  /**
   * Find the current program of member
   * @param {Member} member
   * @returns {Observable<Program>}
   */
  findBy(member:Member):Observable<Program> {
    let programLocallyStored:string = this.localStorageService.get<string>('program');

    if (programLocallyStored) {
      let rawProgram = JSON.parse(programLocallyStored);
      return Observable.of(new Program().initFromRawObject(rawProgram));
    } else {
      return this._http.get(environment.baseUrl() + '/assets/stubs/programs.json')
        .map(res => {
          let data:any = this.extractData(res);
          this.localStorageService.set('program', JSON.stringify(data.massGainers[0]));
          return new Program().initFromRawObject(data.massGainers[0]);
        })
        .catch(this.handleError);
    }
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
