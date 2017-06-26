import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {Coach} from "../../_model/Coach";
import {Animations} from "../../shared/Animations";
import {ProfileCoachEditDialogComponent} from "./profile-coach-edit-dialog/profile-coach-edit-dialog.component";

@Component({
	selector: 'pulpe-profile-coach',
	templateUrl: 'profile-coach.component.html',
	styleUrls: ['profile-coach.component.scss'],
	animations: [Animations.fadeIn()]
})
export class ProfileCoachComponent implements OnInit {
	private coach: Coach;

	constructor(private route: ActivatedRoute, private dialogService: DialogService) {
	}

	ngOnInit() {
		this.coach = this.route.snapshot.data['profile'];
	}

	openDialogEditCoach() {
		this.dialogService.addDialog(ProfileCoachEditDialogComponent, {
			coach: this.coach,
		}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe((coach) => {
			if (coach) {
				this.coach = coach;
			}
		});
	}

}