import {Observable} from "rxjs/Observable";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";
export interface IAuthenticationService {

  signin(login:string, password:string):Observable<AuthenticationProfile>;

  signup(firstName:string, lastName:string, login:string, password:string):Observable<AuthenticationProfile>;

  signout():void;

  authenticated():boolean;

  getAuthenticationProfileInLocalStorage():AuthenticationProfile;
}