import {
  Component, OnInit, OnChanges, SimpleChange, SimpleChanges, ViewChildren, AfterViewInit,
  ChangeDetectorRef
} from '@angular/core';
import {Animations} from "../shared/Animations";
import {Member} from "../_model/Member";
import {DialogService} from "ng2-bootstrap-modal";
import {Router, ActivatedRoute} from "@angular/router";
import {ObjectiveEnum} from "../_enums/ObjectiveEnum";
import {ObjectiveEnumService} from "../_services/objective-enum.service";
import {ProfileMemberEditDialogComponent} from "../profile/profile-member-edit-dialog/profile-member-edit-dialog.component";

@Component({
  selector: 'pulpe-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  animations: [Animations.fadeIn()]
})
export class MembersComponent implements OnInit {
  private members: Member[];
  ObjectiveEnum
  objectiveEnum;
  filterArgs: string;

  constructor(private route: ActivatedRoute, private dialogService: DialogService, private objectiveEnumService: ObjectiveEnumService) {
  }

  ngOnInit() {
    this.members = this.route.snapshot.data['members'];
    this.filterArgs = '';
  }

  public isMassGainer(objective: string): boolean {
    this.objectiveEnum = this.objectiveEnumService.getObjectiveFromName(objective);
    return ObjectiveEnum.MassGainer === this.objectiveEnum;
  }

  public isGeneralForm(objective: string): boolean {
    this.objectiveEnum = this.objectiveEnumService.getObjectiveFromName(objective);
    return ObjectiveEnum.GeneralForm === this.objectiveEnum;
  }

  public isWeightLoss(objective: string): boolean {
    this.objectiveEnum = this.objectiveEnumService.getObjectiveFromName(objective);
    return ObjectiveEnum.WeightLoss === this.objectiveEnum;
  }

  openDialogEditMember(member) {
    this.dialogService.addDialog(ProfileMemberEditDialogComponent, {member: member}, {
      backdropColor: 'rgba(0,0,0,0.5)'
    }).subscribe((editedMember) => {
        if (editedMember) {
          const indexFinded = this.members.findIndex(m => m._id == member._id);
          this.members[indexFinded] = editedMember;
        }
      }
    );
  }
}
