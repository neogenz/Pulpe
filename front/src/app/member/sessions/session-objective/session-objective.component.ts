import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pulpe-session-objective',
  templateUrl: 'session-objective.component.html',
  styleUrls: ['session-objective.component.scss']
})
export class SessionObjectiveComponent implements OnInit {
  @Input() musclesMostWorked:string[];

  constructor() {
  }

  ngOnInit() {
    debugger;
  }

}
