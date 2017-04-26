import { Response } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {JwtHelper} from "angular2-jwt/angular2-jwt";

export class ObservableHelper {

  protected jwtHelper:JwtHelper;

  constructor() {
    this.jwtHelper = new JwtHelper();
  }

  public extractDataOf(res:Response) {
    let body = res.json();
    return body || {};
  }

  public handleError(error:any):Observable<string> {
    debugger;
    return Observable.throw(error.json() || {message: 'Server error'});
  }
}