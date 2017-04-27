import { Injectable } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Member} from "../_model/Member";
import {Program} from "../_model/Program";

@Injectable()
export class ProgramMockService {

  constructor() {
  }

  /**
   * Find the current program of member
   * @param {Member} member
   * @returns {Observable<Program>}
   */
  findBy(member:Member):Observable<Program> {
    // console.debug('Call on FakeStepsService');
    return Observable.of(new Program());
  }
}
