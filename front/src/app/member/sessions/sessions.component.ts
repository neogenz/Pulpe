import {Component, OnInit, ViewChild} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {ExerciseGroupCodeConverter} from "../../shared/ExerciseGroupCodeConverter";
import {ExerciseGroupCode} from "../../shared/ExerciseGroupCodeConverter";
import {Session} from "../../_model/Session";
import {SessionExecutionContext} from '../../_model/SessionExecutionContext';
import {Animations} from "../../shared/Animations";

@Component({
  selector: 'pulpe-sessions',
  templateUrl: 'sessions.component.html',
  styleUrls: ['sessions.component.scss'],
  animations: [Animations.isVisibleChanged()]
})
export class SessionsComponent implements OnInit {

  public session: Session;
  public createdAt: string;
  public exerciseGroupLabelsDictionary: ExerciseGroupCode[] = [];
  public filterSeances: string;
  public filters: string[];
  private _sessionExercutionContext: SessionExecutionContext;
  public sessionStarted: boolean = false;

  constructor(private exerciseGroupCodeConverter: ExerciseGroupCodeConverter, private route: ActivatedRoute) {
  }


  ngOnInit() {
    this.session = this.route.snapshot.data['sessions'];
    this.exerciseGroupLabelsDictionary = this.exerciseGroupCodeConverter.convertThis(this.session.exercisesGroups);
    this.createdAt = this.session.createdAt.toLocaleDateString();
    this.filters = ['Ma prochaine séance', 'Toutes les séances'];
  }

  startSession() {
    this._sessionExercutionContext = new SessionExecutionContext(null);
    this._sessionExercutionContext.start();
    this.sessionStarted = true;
  }

  stopSession(){
    this._sessionExercutionContext = new SessionExecutionContext(null);
    this._sessionExercutionContext.stop();
    this.sessionStarted = false;
  }
}
