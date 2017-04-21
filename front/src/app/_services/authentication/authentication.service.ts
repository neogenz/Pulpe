import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import {Observable} from "rxjs/Observable";
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {tokenNotExpired} from "angular2-jwt/angular2-jwt";
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {IAuthenticationService} from "./IAuthenticationService";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class AuthenticationService implements IAuthenticationService {

  constructor(private http:AuthHttp, private localStorageService:LocalStorageService) {
  }

  public signin(login:string, password:string):Observable<AuthenticateDTO> {
    return null;
  }

  public signout():void {
  }

  public authenticated():Boolean {
    return null;
  }
}

export class AuthenticateDTO {
  constructor(token:string) {
    this.token = token;
  }

  public token:string;
}
