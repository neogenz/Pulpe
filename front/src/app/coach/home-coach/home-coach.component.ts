import {Component, OnInit} from '@angular/core';
import {Animations} from "../../shared/Animations";
import {Dashboard} from "../../_model/Dashboard";
import {ActivatedRoute} from "@angular/router";
import {AuthenticationService} from "../../_services/authentication/authentication.service";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";
import {ModeDialogEnum} from "../../_enums/ModeDialogEnum";
import {DialogService} from "ng2-bootstrap-modal";
import {MachineFormDialogComponent} from "../machines/machine-form-dialog/machine-form-dialog.component";
import {ProfileMemberFormDialogComponent} from "../../shared/profile/profile-member-form-dialog/profile-member-form-dialog.component";
import {ExerciseFormDialogComponent} from "../exercises/exercise-form-dialog/exercise-form-dialog.component";

@Component({
	selector: 'pulpe-home-coach',
	templateUrl: './home-coach.component.html',
	styleUrls: ['./home-coach.component.scss'],
	animations: [Animations.fadeIn()]
})
export class HomeCoachComponent implements OnInit {
	dashboard: Dashboard;
	authenticationProfile: AuthenticationProfile;

	constructor(public route: ActivatedRoute,
							private auth: AuthenticationService,
							private dialogService: DialogService) {
	}

	ngOnInit() {
		this.dashboard = this.route.snapshot.data['dashboard'];
		this.authenticationProfile = this.auth.getAuthenticationProfileInLocalStorage();
	}

	openMachineFormDialog() {
		this.dialogService.addDialog(MachineFormDialogComponent, {
			machine: null,
			mode: ModeDialogEnum.Add,
			title: `Ajout d'une machine`,
			titleConfirm: 'Ajouter'
		}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe((machineSaved) => {
				if (machineSaved) {
					this.dashboard.nbMachines += 1;
				}
			}
		);
	}

	openMemberFormDialog() {
		this.dialogService.addDialog(ProfileMemberFormDialogComponent, {
			member: null,
			mode: ModeDialogEnum.Add,
			title: `Ajout d'un adhérent`,
			titleAction: 'Ajouter'
		}, {backdropColor: 'rgba(0,0,0,0.5)'})
			.subscribe((memberSaved) => {
				if (memberSaved) {
					this.dashboard.nbMembers += 1;
				}
			});
	}
}
