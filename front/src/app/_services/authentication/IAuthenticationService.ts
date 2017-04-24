import {Observable} from "rxjs/Observable";
import {AuthenticationProfile} from "../../model/AuthenticationProfile";
export interface IAuthenticationService {

  signin(login:string, password:string):Observable<AuthenticationProfile>;

  signout():void;

  authenticated():Boolean;
}