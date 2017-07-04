/**
 * Created by maximedesogus on 03/07/2017.
 */
import {Observable} from 'rxjs/Rx';
import {JwtHelper} from "angular2-jwt/angular2-jwt";

export class ObservableHelper {

  protected jwtHelper: JwtHelper;

  constructor() {
    this.jwtHelper = new JwtHelper();
  }

  public extractDataOf(res: Response | any) {
    let body = res.json();
    return body || {};
  }

  public handleError(error: any): Observable<string> {
    let errMsg: string = ObservableHelper.getConsumerErrorMessage(error);
    return Observable.throw(errMsg);
  }

  static getConsumerErrorMessage(error: any): string {
    let errMsg: string;
    let consumerErrMessage: string = 'Une erreur technique est survenue.';

    if (error instanceof Response) {
      const body: any = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `HTTP Status : ${error.status} - Text : ${error.statusText || ''} ${err}`;
      if (body.message) {
        consumerErrMessage = body.message;
      }
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return consumerErrMessage;
  }
}