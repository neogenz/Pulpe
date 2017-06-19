import {Component, OnInit, ViewChild, trigger, state, transition, style, animate} from '@angular/core';
import {Color} from "ng2-charts/index";
import {ColorConfiguration} from "./ColorConfiguration";
import {ProgramService} from "./program.service";
import {ActivatedRoute} from '@angular/router';
import {Observable}     from 'rxjs/Observable';
import {Program} from "../_model/Program";
import {ExerciseGroupCodeConverter} from "../shared/ExerciseGroupCodeConverter";
import {ExerciseGroupCode} from "../shared/ExerciseGroupCodeConverter";
import {ChartConfiguration} from "../shared/ChartConfiguration";
import {AbstractExercise} from "../_model/exercise/AbstractExercise";
import {BaseChartDirective} from "ng2-charts/index";
import {Animations} from "../shared/Animations";
import {Session} from "../_model/Session";
import {SessionsService} from "../sessions/sessions.service";
import {MdSelectChange} from "@angular/material";

@Component({
  selector: 'pulpe-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css'],
  animations: [Animations.fadeIn()]
})
export class ProgramComponent implements OnInit {
  @ViewChild(BaseChartDirective) chartDirective = null;

  public createdAt: string;
  public totalTimeOfFocusedSession: string;
  public program: Program;
  public exerciseGroupLabels: ExerciseGroupCode[] = [];
  public focusedSession: Session;


  constructor(private programService: ProgramService,
              private exerciseGroupCodeConverter: ExerciseGroupCodeConverter,
              private route: ActivatedRoute,
              private sessionService: SessionsService) {
  }


  ngOnInit() {
    this.program = this.route.snapshot.data['program'];
    this.focusedSession = this.program.sessions[0];
    this.refreshConfigBy(this.focusedSession);
  }


  //todo replace by momentjs
  private convertNumberToStrHour(time: number): string {
    let strHour;
    let nbOfHours = Math.floor(time / 60);
    let nbOfMinutes = 0;
    if ((time / 60) % 1 !== 0) {
      nbOfMinutes = time % 60;
    }
    strHour = `${nbOfHours > 9 ? nbOfHours : '0' + nbOfHours }H${nbOfMinutes > 9 ? nbOfMinutes : '0' + nbOfMinutes }`;
    return strHour;
  }

  private refreshConfigBy(session: Session) {
    this.totalTimeOfFocusedSession = this.convertNumberToStrHour(this.sessionService.getTotalTimeOf(session));
    this.exerciseGroupLabels = this.exerciseGroupCodeConverter.convertThis(session.exercisesGroups);
    this.createdAt = session.createdAt.toLocaleDateString();
  }

  public focusedSessionChanged(newValue: MdSelectChange) {
    this.refreshConfigBy(newValue.value);
  }
}
