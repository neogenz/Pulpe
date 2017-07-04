import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Api} from './api';
import 'rxjs/add/operator/map';
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import 'rxjs/add/operator/toPromise';
import {Storage} from '@ionic/storage';
import {AuthenticationProfile} from "../models/AuthenticationProfile";
import {ObservableHelper} from "../helpers/ObserverHelper";
import {Observable} from 'rxjs/Rx';

@Injectable()
export class User extends ObservableHelper {
  _user: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: Http, public api: Api, private storage: Storage) {
    super();
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  signin(accountInfo: any): Observable<AuthenticationProfile> {
    return this.api.post('signin', accountInfo)
      .map(res => {
        const data: any = this.extractDataOf(res);
        const token: string = data.token;
        const rawProfile = this.jwtHelper.decodeToken(token);
        this.storage.set('token', token);
        let authProfile = AuthenticationProfile.of().token(token)
          .login(rawProfile.email)
          .id(rawProfile._id)
          .profileCompleted(rawProfile.profileCompleted)
          .firstName(rawProfile.firstName)
          .isCoach(data.isCoach)
          .gym(rawProfile.gym)
          .lastName(rawProfile.lastName)
          .password(accountInfo.password).build();
        this._loggedIn(authProfile);
        this.storage.set('profile', authProfile);
        return authProfile;
      }).catch(this.handleError);
  }

  /**
   * Send a POST request to our signup endpoint with the data
   * the user entered on the form.
   */
  signout(): Promise<any> {
    let promises: Promise<any>[] = [];
    promises.push(this.storage.remove('token'));
    promises.push(this.storage.remove('authProfile'));
    return Promise.all(promises);
  }

  async authenticated(): Promise<boolean> {
    let token = await this.storage.get('token');
    if (token) {
      return !this.jwtHelper.isTokenExpired(token);
    }
    return false;
  }

  /**
   * Log the user out, which forgets the session
   */
  logout() {
    this._user = null;
    this.storage.remove('token');
  }

  /**
   * Process a login/signup response to store user data
   */
  _loggedIn(resp) {
    this._user = resp.user;
  }
}
