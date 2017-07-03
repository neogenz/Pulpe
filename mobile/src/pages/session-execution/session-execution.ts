import {ChangeDetectorRef, Component, ViewChild} from '@angular/core';
import {AlertController, IonicPage, MenuController, NavController, NavParams} from 'ionic-angular';
import {Session} from "../../models/Session";
import {SessionExecutionContext} from "../../models/SessionExecutionContext";
import {AbstractExercise} from "../../models/exercise/AbstractExercise";
import {ExerciseExecutionContext} from "../../models/ExerciceExecutionContext";
import {ExerciseExecutionComponent} from "../../components/exercise-execution/exercise-execution";
import {SessionPage} from "../session/session";

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

  constructor(public navCtrl: NavController, public navParams: NavParams, private alertCtrl: AlertController) {
    this.sessionExecutionContext = new SessionExecutionContext(navParams.get('session'));
    this.currentExerciseExecutionContext = this.sessionExecutionContext.getExerciseExecutionContext();
    this.sessionExecutionContext.start();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SessionExecutionPage');
  }

  ionViewWillEnter() {
  }

  nextExercise() {
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
      subTitle: 'Yes ! Un pas de plus vers ton objectif !',

      buttons: [
        {
          text: 'Ma séance',
          handler: () => {
            this.navCtrl.pop()
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
}
