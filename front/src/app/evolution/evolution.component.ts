import {Component, OnInit} from '@angular/core';
import {Program} from "../_model/Program";
import {Member} from "../_model/Member";
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pulpe-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css']
})
export class EvolutionComponent implements OnInit {
  member: Member;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.member = this.route.snapshot.data['evolution'];
  }
}
