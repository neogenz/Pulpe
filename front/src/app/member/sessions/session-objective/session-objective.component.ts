import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'pulpe-session-objective',
  templateUrl: 'session-objective.component.html',
  styleUrls: ['session-objective.component.css']
})
export class SessionObjectiveComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
  }

  @Input() musclesMostWorked:string[];

}
