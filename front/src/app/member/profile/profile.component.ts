import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Member} from "../../_model/Member";
import {Animations} from "../../shared/Animations";
import {DialogService} from "ng2-bootstrap-modal";
import {ProfileMemberEditDialogComponent} from "./profile-member-edit-dialog/profile-member-edit-dialog.component";

@Component({
  selector: 'pulpe-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.css'],
  animations: [Animations.fadeIn()]
})
export class ProfileComponent implements OnInit {
  private member: Member;
  objective: string;

  constructor(private route: ActivatedRoute, private dialogService: DialogService) {
  }

  ngOnInit() {
    this.member = this.route.snapshot.data['profile'];
    switch (this.member.objective) {
      case  'MassGainer':
        this.objective = 'Prise de masse';
        break;
      case  'WeightLoss':
        this.objective = 'Perte de poids';
        break;
      case  'GeneralForm':
        this.objective = 'Forme générale';
        break;
    }
  }

  openDialogEditMember() {
    this.dialogService.addDialog(ProfileMemberEditDialogComponent, {member: this.member, title:'Edition de mon profil'}, {
      backdropColor: 'rgba(0,0,0,0.5)'
    }).subscribe((member) => {
      if (member) {
        this.member = member;
      }
    });
  }
}
