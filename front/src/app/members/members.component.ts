import {Component, OnInit} from '@angular/core';
import {Animations} from "../shared/Animations";
import {Member} from "../_model/Member";
import {DialogService} from "ng2-bootstrap-modal";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'pulpe-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [Animations.fadeIn()]
})
export class MembersComponent implements OnInit {
  private members: Member[];

  constructor(private route: ActivatedRoute, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.members = this.route.snapshot.data['members'];
  }

}
