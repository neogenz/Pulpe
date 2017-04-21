import { Injectable } from '@angular/core';
import {IAuthenticationService} from "./IAuthenticationService";
import {tokenNotExpired} from "angular2-jwt/angular2-jwt";
import {AuthenticateDTO} from "./authentication.service";
import {Observable} from "rxjs/Observable";
import {LocalStorageService} from "angular-2-local-storage/dist/index";

@Injectable()
export class AuthenticationMockService implements IAuthenticationService {

  constructor(private localStorageService:LocalStorageService) {
  }

  public signin(login:string, password:string):Observable<AuthenticateDTO> {
    let authDTO:Observable < AuthenticateDTO > = null;

    if (login === 'admin' && password === 'pulpe') {
      authDTO = Observable
        .of(new AuthenticateDTO('eyJhbGciOiJIUzI1NiIsIR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibG9naW4iOiJKb2huIERvZSIsImFkbWluIjp0cnVlfQ.ljY2uMt2vs78QM2A9mURVh2NDhsoOi9GMCoSEnAe0cE'))
        .delay(new Date(Date.now() + 2000));
    } else {
      authDTO = Observable.throw(new Error('Identifiants incorrect.'));
    }

    authDTO.subscribe((authDTO)=> {
        this.localStorageService.set('token', authDTO.token);
        this.localStorageService.set('profile', {login: login});
      },
      error=> {
        console.log(error);
      });

    return authDTO;
  }

  public signout():void {
    this.localStorageService.remove('token');
    this.localStorageService.remove('profile');
  }

  public authenticated():Boolean {
    return tokenNotExpired();
  }
}
