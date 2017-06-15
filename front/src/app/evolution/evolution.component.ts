import {Component, OnInit} from '@angular/core';
import {Program} from "../_model/Program";
import {Member} from "../_model/Member";
import {ActivatedRoute} from "@angular/router";
import {Animations} from "../shared/Animations";

@Component({
  selector: 'pulpe-evolution',
  templateUrl: './evolution.component.html',
  styleUrls: ['./evolution.component.css'],
  animations: [Animations.fadeIn()]
})
export class EvolutionComponent implements OnInit {
  member: Member;

  constructor(private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.member = this.route.snapshot.data['evolution'];
  }
}
