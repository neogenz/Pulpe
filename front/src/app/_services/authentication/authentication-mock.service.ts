import {Injectable} from '@angular/core';
import {IAuthenticationService} from "./IAuthenticationService";
import {tokenNotExpired} from "angular2-jwt/angular2-jwt";
import {Observable} from "rxjs/Observable";
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";

@Injectable()
export class AuthenticationMockService implements IAuthenticationService {

  constructor(private localStorageService:LocalStorageService) {
  }

  public signin(login:string, password:string):Observable<AuthenticationProfile> {
    let authenticationRequest:Observable < AuthenticationProfile > = null;

    if (login === 'admin@pulpe.fit' && password === 'pulpe') {
      authenticationRequest = Observable
        .of(AuthenticationProfile.of().token('eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibG9naW4iOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.ljY2uMt2vs78QM2A9mURVh2NDhsoOi9GMCoSEnAe0cE').build())
        .delay(new Date(Date.now() + 2000));
    } else {
      authenticationRequest = Observable.throw(new Error('Identifiants incorrect.'));
    }

    authenticationRequest.subscribe((authDTO) => {
        this.localStorageService.set('token', authDTO.token);
        this.localStorageService.set('profile', {login: login});
      },
      error => {
        console.log(error);
      });

    return authenticationRequest;
  }

  public signup(firstname:string, lastname:string, login:string, password:string):Observable<AuthenticationProfile> {
    let authenticationRequest:Observable < AuthenticationProfile > = null;

    authenticationRequest = Observable
      .of(AuthenticationProfile.of()
        .token('eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibG9naW4iOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.ljY2uMt2vs78QM2A9mURVh2NDhsoOi9GMCoSEnAe0cE').build())
      .delay(new Date(Date.now() + 2000));

    authenticationRequest.subscribe((authDTO) => {
        this.localStorageService.set('token', authDTO.token);
        this.localStorageService.set('profile', {
          firstname: firstname,
          lastname: lastname,
          login: login
        });
      },
      error => {
        console.log(error);
      });

    return authenticationRequest;
  }

  public signout():void {
    this.localStorageService.remove('token');
  }

  public authenticated():boolean {
    return tokenNotExpired();
  }

  public getAuthenticationProfileInLocalStorage():AuthenticationProfile {
    let profileInLocalStorage:string = this.localStorageService.get<string>('profile');
    if (profileInLocalStorage) {
      let profile:AuthenticationProfile = JSON.parse(profileInLocalStorage);
      return profile;
    }
    return null;
  }
}
