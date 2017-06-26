import {Component, OnInit} from '@angular/core';
import {Observable} from "rxjs";
import {Coach} from "../../../_model/Coach";
import {FormGroup, FormControl, FormBuilder, Validators} from "@angular/forms";
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {ProfileService} from "../../../member/profile/profile.service";
import {CoachService} from "../../../_services/coach/coach.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import * as moment from "moment/moment";
import {ToastrService} from "ngx-toastr";

@Component({
	selector: 'pulpe-profile-coach-edit-dialog',
	templateUrl: 'profile-coach-edit-dialog.component.html',
	styleUrls: ['profile-coach-edit-dialog.component.scss']
})
export class ProfileCoachEditDialogComponent extends DialogComponent<IEditable, Coach> implements IEditable, OnInit {
	coachRequest: Observable<Coach> = new Observable();
	maximumBirthdate: string;
	coach: Coach;
	coachForm: FormGroup;
	emailCtrl: FormControl;
	firstNameCtrl: FormControl;
	lastNameCtrl: FormControl;
	birthdateCtrl: FormControl;
	genderCtrl: FormControl;

	constructor(dialogService: DialogService, private fb: FormBuilder,
							private coachService: CoachService,
							private slimLoadingBarService: SlimLoadingBarService,
							private toastrService: ToastrService) {
		super(dialogService);
	}


	ngOnInit() {
		this.buildForm();
	}

	buildForm() {
		this.emailCtrl = this.fb.control(this.coach.email, Validators.required);
		this.firstNameCtrl = this.fb.control(this.coach.firstName, Validators.required);
		this.lastNameCtrl = this.fb.control(this.coach.lastName, Validators.required);
		this.genderCtrl = this.fb.control(this.coach.gender);
		this.birthdateCtrl = this.fb.control(
			moment(this.coach.birthDate).format('YYYY-MM-DD'), Validators.required
		);

		this.maximumBirthdate = this.buildToBeOldEnoughDate();
		this.coachForm = this.fb.group({
			email: this.emailCtrl,
			firstName: this.firstNameCtrl,
			lastName: this.lastNameCtrl,
			birthdate: this.birthdateCtrl,
			gender: this.genderCtrl
		});
	}

	edit() {
		const coach = Coach.of()
			.id(this.coach._id)
			.email(this.emailCtrl.value)
			.lastName(this.lastNameCtrl.value)
			.firstName(this.firstNameCtrl.value)
			.birthDate(new Date(this.birthdateCtrl.value))
			.gym(this.coach.gym)
			.gender(this.genderCtrl.value)
			.build();

		this.coachRequest = this.coachService.update(coach);
		this.slimLoadingBarService.start();
		this.coachRequest
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((member) => {
					this.result = member;
					this.close();
					this.toastrService.success('Votre profil a bien été mis à jour.', 'Succès');
				},
				(errorMsg) => {
					console.error(errorMsg);
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
	}

	private buildToBeOldEnoughDate(): string {
		const maxDate = new Date();
		maxDate.setFullYear(maxDate.getFullYear() - 14);
		maxDate.setMonth(0);
		maxDate.setDate(1);
		return moment(maxDate).format('YYYY-MM-DD');
	}
}

export interface IEditable {
	coach: any;
}