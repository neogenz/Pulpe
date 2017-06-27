import {Component, Input, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Member} from "../../../_model/Member";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../../_services/member/member.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import * as moment from "moment/moment";
import {Observable} from "rxjs";
import {GymService} from "../../../_services/gym/gym.service";
import {Gym} from "../../../_model/Gym";
import {CustomValidators} from "../../../_formValidators/CustomValidators";
import {ToastrService} from "ngx-toastr";
import {ProfileService} from "../../../member/profile/profile.service";
import {AuthenticationProfile} from "../../../_model/AuthenticationProfile";
import {AuthenticationService} from "../../../_services/authentication/authentication.service";
import {ModeDialogEnum} from "../../../_enums/ModeDialogEnum";

@Component({
	selector: 'pulpe-profile-member-form-dialog',
	templateUrl: 'profile-member-form-dialog.component.html',
	styleUrls: ['profile-member-form-dialog.component.scss']
})
export class ProfileMemberFormDialogComponent extends DialogComponent<IForm, Member> implements IForm, OnInit {
	authenticationProfile: AuthenticationProfile;
	title: string;
	titleAction: string;
	mode: ModeDialogEnum;
	memberRequest: Observable<Member> = new Observable();
	frequencyRange: any;
	maximumBirthdate: string;
	member: Member;
	gyms: any;
	memberForm: FormGroup;
	frequencyCtrl: FormControl;
	emailCtrl: FormControl;
	firstNameCtrl: FormControl;
	lastNameCtrl: FormControl;
	birthdateCtrl: FormControl;
	genderCtrl: FormControl;
	gymCtrl: FormControl;
	objectiveCtrl: FormControl;
	objectiveChoices = [
		{
			checked: false,
			value: 'GF',
			picture: '../../assets/img/exercise-types/stationary-bike-64.png',
			display: 'Forme générale'
		},
		{
			checked: false,
			value: 'MG',
			picture: '../../assets/img/exercise-types/strength-64.png',
			display: 'Prise de masse'
		},
		{
			checked: false,
			value: 'WL',
			picture: '../../assets/img/exercise-types/weight-64.png',
			display: 'Perte de poids'
		}
	];

	constructor(dialogService: DialogService,
							private fb: FormBuilder,
							private profileService: ProfileService,
							private memberService: MemberService,
							private gymService: GymService,
							private slimLoadingBarService: SlimLoadingBarService,
							private toastrService: ToastrService,
							private auth: AuthenticationService) {
		super(dialogService);
	}

	ngOnInit() {
		const httpRequest: Observable<Gym[] | string> = this.gymService.findAll();
		httpRequest.subscribe(gyms => {
				this.gyms = gyms;
			},
			errorMsg => {
				console.error(errorMsg);
				this.toastrService.error(errorMsg, 'Erreur');
			});

		this.authenticationProfile = this.auth.getAuthenticationProfileInLocalStorage();

		if (!this.member) {
			this.member = new Member();
		}
		this.buildForm();
	}

	buildForm() {
		this.frequencyRange = {
			min: 1,
			max: 25
		};
		this.emailCtrl = this.fb.control(this.member.email, Validators.required);
		this.firstNameCtrl = this.fb.control(this.member.firstName, Validators.required);
		this.lastNameCtrl = this.fb.control(this.member.lastName, Validators.required);
		this.objectiveCtrl = this.fb.control('');
		this.gymCtrl = this.fb.control('');
		this.genderCtrl = this.fb.control(this.member.gender, Validators.required);
		this.frequencyCtrl = this.fb.control(this.member.sessionFrequency, [Validators.required,
			CustomValidators.minValue(this.frequencyRange.min),
			CustomValidators.maxValue(this.frequencyRange.max)
		]);
		this.birthdateCtrl = this.fb.control(
			moment(this.member.birthDate).format('YYYY-MM-DD'), Validators.required
		);
		switch (this.member.objective) {
			case 'GeneralForm':
				this.objectiveChoices[0].checked = true;
				break;
			case 'MassGainer':
				this.objectiveChoices[1].checked = true;
				break;
			case 'WeightLoss':
				this.objectiveChoices[2].checked = true;
				break;
			default :
				this.objectiveChoices[1].checked = true;
				break;
		}
		this.maximumBirthdate = this.buildToBeOldEnoughDate();
		this.memberForm = this.fb.group({
			email: this.emailCtrl,
			firstName: this.firstNameCtrl,
			lastName: this.lastNameCtrl,
			birthdate: this.birthdateCtrl,
			objective: this.objectiveCtrl,
			frequency: this.frequencyCtrl,
			gym: this.gymCtrl,
			gender: this.genderCtrl
		});
	}

	confirm() {
		const member = Member.of()
			.id(this.member._id)
			.email(this.emailCtrl.value)
			.lastName(this.lastNameCtrl.value)
			.firstName(this.firstNameCtrl.value)
			.sessionFrequency(this.frequencyCtrl.value)
			.birthDate(new Date(this.birthdateCtrl.value))
			.gender(this.genderCtrl.value)
			.objective(this.getObjectiveValue())
			.build();

		switch (this.mode) {
			case ModeDialogEnum.Add:
				member.gym = this.authenticationProfile.gym;
				this.add(member);
				break;
			case ModeDialogEnum.Edit:
				member._id = this.member._id;
				member.gym = this.member.gym;
				this.edit(member);
				break;
		}
	}

	edit(member: Member) {
		this.memberRequest = this.memberService.update(member);
		this.slimLoadingBarService.start();
		this.memberRequest
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

	add(member: Member) {
		this.memberRequest = this.memberService.create(member);
		this.slimLoadingBarService.start();
		this.memberRequest
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((member) => {
					this.result = member;
					this.close();
					this.toastrService.success(`Un nouvel adhérent a été ajouté. Le mot de passe a été envoyé à : ${member.email}.`, 'Succès');
				},
				(errorMsg) => {
					console.error(errorMsg);
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
	}

	check(choice) {
		this.resetChoices();
		this.objectiveCtrl.setValue(choice.value);
		choice.checked = true;
	}

	getObjectiveValue() {
		let value;
		this.objectiveChoices.forEach(obj => {
			if (obj.checked) {
				value = obj.value;
			}
		});
		return value;
	}

	private buildToBeOldEnoughDate(): string {
		const maxDate = new Date();
		maxDate.setFullYear(maxDate.getFullYear() - 14);
		maxDate.setMonth(0);
		maxDate.setDate(1);
		return moment(maxDate).format('YYYY-MM-DD');
	}

	private resetChoices(): void {
		this.objectiveChoices.forEach(objective => objective.checked = false);
		this.objectiveCtrl.setValue('');
	}

	static passwordMatch(group: FormGroup) {
		const password = group.get('password').value;
		const confirm = group.get('confirmPassword').value;
		return password === confirm ? null : {matchingError: true};
	}
}

export interface IForm {
	member: Member;
	title: string;
	titleAction: string;
	mode: ModeDialogEnum;
}