import {Component, OnInit} from '@angular/core';
import {NavController, ToastController} from 'ionic-angular';
import {Storage} from '@ionic/storage';

import {MainPage} from '../../pages/pages';

import {User} from '../../providers/user';

import {TranslateService} from '@ngx-translate/core';
import {SessionPage} from "../session/session";


@Component({
  selector: 'page-login',
  templateUrl: 'login.html'
})
export class LoginPage implements OnInit {
  // The account fields for the login form.
  // If you're using the username field with or without email, make
  // sure to add it to the type
  account: { email: string, password: string } = {
    email: '',
    password: ''
  };
  rememberMe: boolean = false;

  // Our translated text strings
  private loginErrorString: string;

  constructor(public navCtrl: NavController,
              public user: User,
              public toastCtrl: ToastController,
              public translateService: TranslateService,
              private storage: Storage) {

    this.translateService.get('LOGIN_ERROR').subscribe((value) => {
      this.loginErrorString = value;
    })
  }

  async ngOnInit() {
    let authProfile = await this.storage.get('rememberedLoginForm');
    if (authProfile) {
      this.rememberMe = true;
      this.account.email = authProfile.email;
      this.account.password = authProfile.password;
    }
  }

  // Attempt to login in through our User service
  signin() {
    if (this.rememberMe) {
      this.storage.set('rememberedLoginForm', this.account);
    }
    this.user.signin(this.account).subscribe((resp) => {
      this.navCtrl.push(SessionPage);
    }, (err) => {
      let toast = this.toastCtrl.create({
        message: this.loginErrorString,
        duration: 3000,
        position: 'top'
      });
      toast.present();
    });
  }
}
