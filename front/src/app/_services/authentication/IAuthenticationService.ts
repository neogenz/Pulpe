import {Observable} from "rxjs/Observable";
import {AuthenticateDTO} from "./authentication.service";
export interface IAuthenticationService {

  signin(login:string, password:string):Observable<AuthenticateDTO>;

  signout():void;

  authenticated():Boolean;
}