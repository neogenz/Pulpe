import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Api} from './api';
import 'rxjs/add/operator/map';
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import 'rxjs/add/operator/toPromise';
import {Storage} from '@ionic/storage';
import {AuthenticationProfile} from "../models/AuthenticationProfile";

/**
 * Most apps have the concept of a User. This is a simple provider
 * with stubs for login/signup/etc.
 *
 * This User provider makes calls to our API at the `login` and `signup` endpoints.
 *
 * By default, it expects `login` and `signup` to return a JSON object of the shape:
 *
 * ```json
 * {
 *   status: 'success',
 *   user: {
 *     // User fields your app needs, like "id", "name", "email", etc.
 *   }
 * }
 * ```
 *
 * If the `status` field is not `success`, then an error is detected and returned.
 */
@Injectable()
export class User {
  _user: any;
  jwtHelper: JwtHelper = new JwtHelper();

  constructor(public http: Http, public api: Api, private storage: Storage) {
  }

  /**
   * Send a POST request to our login endpoint with the data
   * the user entered on the form.
   */
  signin(accountInfo: any) {
    let seq = this.api.post('signin', accountInfo).share();
    seq
      .map(res => res.json())
      .subscribe(res => {
        // If the API returned a successful response, mark the user as logged in
        this.storage.set('token', res.token);
        const rawProfile = this.jwtHelper.decodeToken(res.token);
        let authProfile = AuthenticationProfile.of().token(res.token)
          .login(rawProfile.email)
          .id(rawProfile._id)
          .profileCompleted(rawProfile.profileCompleted)
          .firstName(rawProfile.firstName)
          .isCoach(res.isCoach)
          .gym(rawProfile.gym)
          .lastName(rawProfile.lastName)
          .password(accountInfo.password).build();
        this._loggedIn(authProfile);
        this.storage.set('profile', authProfile);
      }, err => {
        console.error('ERROR', err);
      });

    return seq;
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