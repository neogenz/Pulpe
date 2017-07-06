import { Component, ViewChild } from '@angular/core';
import {
  IonicPage, NavController, NavParams, LoadingController, Loading, ViewController,
  AlertController, ActionSheetController, ActionSheet
} from 'ionic-angular';
import { SessionService } from "../../providers/providers";
import { Session } from "../../models/Session";
import { AbstractExercise } from "../../models/exercise/AbstractExercise";
import { TranslateService } from "@ngx-translate/core";
import { SessionExecutionPage } from "../session-execution/session-execution";

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
  private _sessions: Session[] = [];
  public exercises: AbstractExercise[] = [];
  private loader: Loading;
  private newSessionTodo: Session = null;
  private moreOptions: ActionSheet;

  constructor(public navCtrl: NavController,
    public navParams: NavParams,
    private sessionService: SessionService,
    private loadingCtrl: LoadingController,
    public translateService: TranslateService,
    private viewCtrl: ViewController,
    private actionSheetCtrl: ActionSheetController,
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
    this.loader = this.loadingCtrl.create({ content: text });
    this.loader.present();
  }

  loadExercisesOfActiveSession() {
    this.sessionService.findAllSessionOfActiveProgramByAuthenticatedMember()
      .flatMap(sessions => {
        this._sessions = sessions;
        return this.sessionService.findSessionTodo();
      }).finally(() => {
        this.loader.dismiss();
      })
      .subscribe(session => {
        this.session = session;
        this.exercises = session.getExercises();
      }, errorMsg => {
        let alert = this.alertCtrl.create({
          title: 'Erreur',
          subTitle: errorMsg,
          buttons: [this.translateService.instant('OK')]
        });
        alert.present();
      });
  }

  refreshSessionTodo(refresher) {
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
          buttons: [this.translateService.instant('OK')]
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

  openMoresOptions() {
    this.moreOptions = this.actionSheetCtrl.create({
      title: 'Options',
      buttons: [{
        text: 'Changer ma séance',
        handler: () => {
          this.chooseManualSessionTodo();
          return false;
        }
      }, {
        text: 'Annuler',
        role: 'cancel'
      }
      ]
    });
    this.moreOptions.present();
  }

  chooseManualSessionTodo() {
    let chooseNewSessionTodo = this.alertCtrl.create();
    chooseNewSessionTodo.setTitle('Choisir une séance');
    this._sessions.forEach((session) => {
      chooseNewSessionTodo.addInput({ type: 'radio', label: session.dayInWeek, value: session.id, checked: session.id === this.session.id });
    });
    chooseNewSessionTodo.addButton({
      role: 'cancel',
      text: this.translateService.instant('CANCEL')
    });
    chooseNewSessionTodo.addButton({
      text: this.translateService.instant('OK'),
      handler: idOfNewSessionTodo => {
        this.sessionService.changeSessionTodoBy(idOfNewSessionTodo)
        .subscribe(() => {
          this.loadExercisesOfActiveSession();
        }, errorMsg => {
          let errorAlert = this.alertCtrl.create({
            title: 'Erreur',
            subTitle: errorMsg,
            buttons: [this.translateService.instant('OK')]
          });
          errorAlert.present();
        });
      }
    });
    chooseNewSessionTodo.present();
  }
}
