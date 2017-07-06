import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, Config, Loading, LoadingController, AlertController, NavController } from 'ionic-angular';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { TutorialPage } from '../pages/tutorial/tutorial';
import { WelcomePage } from '../pages/welcome/welcome';

import { TranslateService } from '@ngx-translate/core'
import { Storage } from "@ionic/storage";
import { User } from "../providers/user";
import { Session } from "../models/Session";
import { SessionService } from "../providers/sessions";

@Component({
  template: `
      <ion-menu [content]="content">
          <ion-header>
              <ion-toolbar>
                  <ion-title>Menu</ion-title>
              </ion-toolbar>
          </ion-header>

          <ion-content>
              <ion-list>
                  <button menuClose ion-item (click)="signout()">
                      <ion-icon name="log-out"></ion-icon>
                      Déconnexion
                  </button>
              </ion-list>
          </ion-content>
      </ion-menu>

      <!-- Disable swipe-to-go-back because it's poor UX to combine STGB with side menus -->
      <ion-nav [root]="rootPage" #content swipeBackEnabled="false"></ion-nav>`
})
export class MyApp {
  rootPage: any;
  loader: Loading;

  @ViewChild(Nav) nav: Nav;

  pages: any[] = [];

  constructor(private loadingCtrl: LoadingController,
    private translate: TranslateService,
    private platform: Platform,
    private sessionService: SessionService,
    private config: Config,
    private statusBar: StatusBar,
    private splashScreen: SplashScreen,
    private storage: Storage,
    private user: User,
    private alertCtrl: AlertController) {
    this.initTranslate();
    this.translate.get('LOADING_APP').subscribe(loadingMsg => {
      this._presentLoading(loadingMsg);
      return this.platform.ready().then(() => {
        // Okay, so the platform is ready and our plugins are available.
        // Here you can do any higher level native things you might need.
        this.statusBar.styleDefault();
        this.splashScreen.hide();
        return this.storage.get('tutorialShown');
      }).then(tutorialShown => {
        this.loader.dismiss();
        if (tutorialShown) {
          this.rootPage = WelcomePage;
        } else {
          this.rootPage = TutorialPage;
        }
      });
    });
  }

  initTranslate() {
    // Set the default language for translation strings, and the current language.
    if (this.translate.getBrowserLang() !== undefined) {
      this.translate.use(this.translate.getBrowserLang());
    } else {
      this.translate.use('fr'); // Set your language here
    }

    this.translate.get(['BACK_BUTTON_TEXT']).subscribe(values => {
      this.config.set('ios', 'backButtonText', values.BACK_BUTTON_TEXT);
    });
  }

  openPage(page) {
    // Reset the content nav to have just this page
    // we wouldn't want the back button to show in this scenario
    this.nav.setRoot(page.component);
  }

  private _presentLoading(text: string): void {
    this.loader = this.loadingCtrl.create({ content: text });
    this.loader.present();
  }

  signout() {
    this.user.signout().then(() => {
      this.nav.setRoot(WelcomePage);
    });
  }
}
