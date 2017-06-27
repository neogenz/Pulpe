import {
	Component, OnInit, OnChanges, SimpleChange, SimpleChanges, ViewChildren, AfterViewInit,
	ChangeDetectorRef
} from '@angular/core';
import {Animations} from "../../shared/Animations";
import {Member} from "../../_model/Member";
import {DialogService} from "ng2-bootstrap-modal";
import {Router, ActivatedRoute} from "@angular/router";
import {ObjectiveEnum} from "../../_enums/ObjectiveEnum";
import {ObjectiveEnumService} from "../../_services/objective-enum.service";
import {ProfileMemberFormDialogComponent} from "../../shared/profile/profile-member-form-dialog/profile-member-form-dialog.component"
import {ModeDialogEnum} from "../../_enums/ModeDialogEnum";

@Component({
	selector: 'pulpe-members',
	templateUrl: 'members.component.html',
	styleUrls: ['members.component.scss'],
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

	filterArgsChanged(filtersArgs: string) {
		this.filterArgs = null;
		if (filtersArgs !== '') {
			this.filterArgs = filtersArgs;
		}
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

	openMemberFormDialog(member: Member) {
		const mode = member === undefined ? ModeDialogEnum.Add : ModeDialogEnum.Edit;
		let title: string;
		let titleAction: string;
		if (mode === ModeDialogEnum.Add) {
			title = `Ajout d'un adhérent`;
			titleAction = 'Ajouter';
		} else {
			title = `Edition d'un adhérent`;
			titleAction = 'Editer';
		}

		this.dialogService.addDialog(ProfileMemberFormDialogComponent, {
			member: member,
			mode: mode,
			title: title,
			titleAction: titleAction
		}, {backdropColor: 'rgba(0,0,0,0.5)'})
			.subscribe((memberSaved) => {
				if (memberSaved) {
					if (mode === ModeDialogEnum.Add) {
						this.members.push(memberSaved);
					} else {
						const indexFinded = this.members.findIndex(m => m._id == member._id);
						this.members[indexFinded] = memberSaved;
					}
				}
			});
	}
}