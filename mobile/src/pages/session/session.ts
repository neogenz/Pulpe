import {Component} from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, Loading, ViewController,
  AlertController
} from 'ionic-angular';
import {SessionService} from "../../providers/providers";
import {Session} from "../../models/Session";
import {AbstractExercise} from "../../models/exercise/AbstractExercise";
import {TranslateService} from "@ngx-translate/core";
import {SessionExecutionPage} from "../session-execution/session-execution";

/**
 * Generated class for the SessionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-session',
  templateUrl: 'session.html'
})
export class SessionPage {

  public session: Session = null;
  public exercises: AbstractExercise[] = [];
  private loader: Loading;
  private newSessionTodo: Session = null;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sessionService: SessionService,
              private loadingCtrl: LoadingController,
              public translateService: TranslateService,
              private viewCtrl: ViewController,
              private alertCtrl: AlertController) {
  }

  ionViewDidLoad() {
    console.debug('session.ts => ionViewDidLoad');
    // this.viewCtrl.showBackButton(false);
  }

  ionViewWillEnter() {
    console.debug('session.ts => ionViewWillEnter');
    if (this.newSessionTodo) {
      this.session = this.newSessionTodo;
      this.newSessionTodo = null;
    }
    if (!this.session) {
      this.presentLoading(this.translateService.instant('LOADING_ACTIVE_SESSION'));
      this.loadExercisesOfActiveSession();
    }
  }

  presentLoading(text: string): void {
    this.loader = this.loadingCtrl.create({content: text});
    this.loader.present();
  }

  loadExercisesOfActiveSession() {
    this.sessionService.findSessionTodo()
      .subscribe(session => {
        this.session = session;
        this.exercises = session.getExercises();
        this.loader.dismiss();
      }, errorMsg => {
        let alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: errorMsg,
          buttons: ['OK']
        });
        alert.present();
      });
  }

  refreshSessionTodo(refresher){
    this.sessionService.findSessionTodo()
      .subscribe(session => {
        this.session = session;
        this.exercises = session.getExercises();
        refresher.complete();
        //this.loader.dismiss();
      }, errorMsg => {
        let alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: errorMsg,
          buttons: ['OK']
        });
        alert.present();
      });
  }

  startSession() {
    this.navCtrl.push(SessionExecutionPage, {
      session: this.session,
      callbackToSetNewSessionTodo: this.popCallbackInvokedFromSessionExecutionPage
    });
  }

  popCallbackInvokedFromSessionExecutionPage = (_params) => {
    return new Promise((resolve, reject) => {
      this.newSessionTodo = _params;
      resolve();
    });
  };

}
