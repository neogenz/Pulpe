import { Component, OnInit, ViewChild } from '@angular/core';
import {Color} from "ng2-charts/index";
import { ColorConfiguration } from "./ColorConfiguration";
import {ProgramService} from "./program.service";
import { ActivatedRoute } from '@angular/router';
import { Observable }     from 'rxjs/Observable';
import {Program} from "../_model/Program";
import {ExerciseGroupCodeConverter} from "../shared/ExerciseGroupCodeConverter";
import {ExerciseGroupCode} from "../shared/ExerciseGroupCodeConverter";
import {ChartConfiguration} from "../shared/ChartConfiguration";
import {AbstractExercise} from "../_model/exercise/AbstractExercise";
import {BaseChartDirective} from "ng2-charts/index";

@Component({
  selector: 'pulpe-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  @ViewChild(BaseChartDirective) chartDirective = null;

  public createdAt:string;
  public totalTimeOfProgram:string;
  public program:Program;
  public exerciseGroupLabelsDictionary:ExerciseGroupCode[] = [];


  constructor(private programService:ProgramService, private exerciseGroupCodeConverter:ExerciseGroupCodeConverter, private route:ActivatedRoute) {
  }


  ngOnInit() {
    this.program = this.route.snapshot.data['program'];
    this.totalTimeOfProgram = this.convertNumberToStrHour(this.programService.getTotalTimeOf(this.program));
    this.exerciseGroupLabelsDictionary = this.exerciseGroupCodeConverter.convertThis(this.program.exercises);
    this.createdAt = this.program.createdAt.toLocaleDateString();
  }


  //todo replace by momentjs
  private convertNumberToStrHour(time:number):string {
    let strHour:string = '';
    let nbOfHours = Math.floor(time / 60);
    let nbOfMinutes = 0;
    if ((time / 60) % 1 !== 0) {
      nbOfMinutes = time % 60;
    }
    strHour = `${nbOfHours > 9 ? nbOfHours : '0' + nbOfHours }H${nbOfMinutes > 9 ? nbOfMinutes : '0' + nbOfMinutes }`;
    return strHour;
  }
}
