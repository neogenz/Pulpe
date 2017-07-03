import {Component} from '@angular/core';
import {NavController} from 'ionic-angular';

import {LoginPage} from '../login/login';
import {SignupPage} from '../signup/signup';
import {User} from "../../providers/user";
import {SessionPage} from "../session/session";

/**
 * The Welcome Page is a splash page that quickly describes the app,
 * and then directs the user to create an account or log in.
 * If you'd like to immediately put the user onto a login/signup page,
 * we recommend not using the Welcome page.
 */
@Component({
  selector: 'page-welcome',
  templateUrl: 'welcome.html'
})
export class WelcomePage {

  constructor(public navCtrl: NavController, private user: User) {
  }

  async ionViewWillEnter() {
    let authenticated = await this.user.authenticated();
    if (authenticated) {
      this.navCtrl.push(SessionPage);
    }
  }

  login() {
    this.navCtrl.push(LoginPage);
  }

  signup() {
    this.navCtrl.push(SignupPage);
  }
}
