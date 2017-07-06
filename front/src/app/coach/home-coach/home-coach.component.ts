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
import {environment} from "../../../environments/environment";
import {DemoService} from "../../_services/demo.service";
import {HomeCoachService} from "./home-coach.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {OnError} from "../../_helpers/IUIErrorHandlerHelper";
import {ToastrService} from "ngx-toastr";

@Component({
	selector: 'pulpe-home-coach',
	templateUrl: './home-coach.component.html',
	styleUrls: ['./home-coach.component.scss'],
	animations: [Animations.fadeIn()],
	providers: [DemoService]
})
export class HomeCoachComponent implements OnInit, OnError {
	isInError: boolean;
	errorMsg: string;
	dashboard: Dashboard;
	authenticationProfile: AuthenticationProfile;
	demo: boolean = environment.demo;

	constructor(public route: ActivatedRoute,
							private auth: AuthenticationService,
							private dialogService: DialogService,
							private demoService: DemoService,
							private slimLoadingBarService: SlimLoadingBarService,
							private homeCoachService: HomeCoachService,
							private toastrService: ToastrService) {
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

	populateDemoData(): void {
		this.slimLoadingBarService.start();
		this.demoService.generateDemoDataOnAuthenticatedCoachGym()
			.flatMap(() => {
				return this.homeCoachService.findStatistiques();
			}).finally(() => {
			this.slimLoadingBarService.complete();
		}).subscribe(dashboard => {
			this.dashboard = dashboard;
		}, error => {

		});
	}

	displayErrorMsg(errorMsg: string) {
		this.toastrService.error(errorMsg, 'Erreur');
	}

	hideErrorMsg() {
		throw new Error("Method not implemented.");
	}
}
