import {Component, OnInit} from '@angular/core';
import {Router, ActivatedRoute} from "@angular/router";
import {Member} from "../../_model/Member";
import {Animations} from "../../shared/Animations";
import {DialogService} from "ng2-bootstrap-modal";
import {ProfileMemberFormDialogComponent} from "../../shared/profile/profile-member-form-dialog/profile-member-form-dialog.component";
import {ModeDialogEnum} from "../../_enums/ModeDialogEnum";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pulpe-profile',
  templateUrl: 'profile.component.html',
  styleUrls: ['profile.component.scss'],
  animations: [Animations.fadeIn()]
})
export class ProfileComponent implements OnInit {
  private member: Member;
  objective: string;

  constructor(private route: ActivatedRoute, private dialogService: DialogService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    this.member = this.route.snapshot.data['profile'];
    this.setObjective();
  }

  setObjective() {
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

  openMemberFormDialog(member: Member) {
    const mode = ModeDialogEnum.Edit;
    const title = `Edition de mon profil`;
    const titleAction = 'Editer';
    this.dialogService.addDialog(ProfileMemberFormDialogComponent, {
      member: member,
      mode: mode,
      title: title,
      titleAction: titleAction
    }, {backdropColor: 'rgba(0,0,0,0.5)'})
      .subscribe((updated) => {
        if (updated) {
          if (this.member.objective !== updated.objective) {
            this.toastrService.success('Votre programme a été re-calculé.', 'Succès');
          }
          this.member = updated;
          this.setObjective();
        }
      });
  }
}