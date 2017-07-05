import {Component} from '@angular/core';
import {AlertController, IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import {SessionExecutionContext} from "../../models/SessionExecutionContext";
import {ExerciseExecutionContext} from "../../models/ExerciceExecutionContext";
import {SessionService} from "../../providers/sessions";
import {TranslateService} from "@ngx-translate/core";

/**
 * Generated class for the SessionExecutionPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@IonicPage()
@Component({
  selector: 'page-session-execution',
  templateUrl: 'session-execution.html',
})
export class SessionExecutionPage {
  private sessionExecutionContext: SessionExecutionContext;
  public currentExerciseExecutionContext: ExerciseExecutionContext;
  private _callbackToSetNewSessionTodo: any;
  private _loader: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private alertCtrl: AlertController,
              private sessionService: SessionService,
              private loadingCtrl: LoadingController,
              private translateService: TranslateService) {
    this.sessionExecutionContext = new SessionExecutionContext(navParams.get('session'));
    this.currentExerciseExecutionContext = this.sessionExecutionContext.getExerciseExecutionContext();
    this.sessionExecutionContext.start();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionExecutionPage');
  }

  ionViewWillEnter() {
    this._callbackToSetNewSessionTodo = this.navParams.get("callbackToSetNewSessionTodo");
  }

  nextExercise() {
    debugger;
    this.sessionExecutionContext.refreshState();
    if (this.sessionExecutionContext.isDone()) {
      this._presentDoneSessionAlert();
    } else {
      this.sessionExecutionContext.nextExercise();
      this.sessionExecutionContext.startExercise();
    }
  }

  private _presentDoneSessionAlert() {
    let alert = this.alertCtrl.create({
      title: 'Bravo !',
      subTitle: 'Un pas de plus vers ton objectif !',
      buttons: [
        {
          text: 'Ma prochaine séance',
          handler: () => {
            this.presentLoading(this.translateService.instant('LOADING_ACTIVE_SESSION'));
            this.sessionService.doneCurrentSession().subscribe(newSessionTodo => {
              this._callbackToSetNewSessionTodo(newSessionTodo).then(() => {
                this._loader.dismiss();
                this.navCtrl.pop();
              });
            });
          }
        }
      ]
    });
    alert.present();
  }

  abortSession() {
    let alert = this.alertCtrl.create({
      title: 'Confirmation',
      message: 'Voulez-vous abandonner votre séance ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
          handler: () => {

          }
        },
        {
          text: 'Confirmer',
          handler: () => {
            this.navCtrl.pop();
          }
        }
      ]
    });
    alert.present();
  }

  presentLoading(text: string): void {
    this._loader = this.loadingCtrl.create({content: text});
    this._loader.present();
  }
}
