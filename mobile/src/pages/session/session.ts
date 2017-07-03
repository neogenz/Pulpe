import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams, LoadingController, Loading, ViewController} from 'ionic-angular';
import {SessionService} from "../../providers/providers";
import {Session} from "../../models/Session";
import {AbstractExercise} from "../../models/exercise/AbstractExercise";
import {TranslateService} from "@ngx-translate/core";
import {SessionExecutionContext} from "../../models/SessionExecutionContext";
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

  public session: Session;
  public exercises: AbstractExercise[];
  private loader: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              private sessionService: SessionService,
              private loadingCtrl: LoadingController,
              public translateService: TranslateService, private viewCtrl: ViewController) {
  }

  ionViewDidLoad() {
    this.loadExercisesOfActiveSession();
  }

  ionViewWillEnter() {
    this.viewCtrl.showBackButton(false);
    if (!this.session) {
      this.presentLoading(this.translateService.instant('LOADING_ACTIVE_SESSION'));
    }
  }

  presentLoading(text: string): void {
    this.loader = this.loadingCtrl.create({content: text});
    this.loader.present();
  }

  loadExercisesOfActiveSession() {
    debugger;
    this.sessionService.findSessionTodo().subscribe(session => {
      this.session = session;
      this.exercises = session.getExercises();
      this.loader.dismiss();
    });
  }

  startSession() {
    this.navCtrl.push(SessionExecutionPage, {
      session: this.session
    });
  }

}
