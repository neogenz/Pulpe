import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {Member} from "../../_model/Member";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MemberService} from "../../_services/member/member.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import * as moment from "moment/moment";
import {Observable} from "rxjs";
import {GymService} from "../../_services/gym/gym.service";
import {Gym} from "../../_model/Gym";
import {CustomValidators} from "../../_formValidators/CustomValidators";
import {OnError} from "../../_helpers/IUIErrorHandlerHelper";

@Component({
  selector: 'pulpe-profile-member-edit-dialog',
  templateUrl: 'profile-member-edit-dialog.component.html',
  styleUrls: ['profile-member-edit-dialog.component.css']
})
export class ProfileMemberEditDialogComponent extends DialogComponent<ProfileMemberEdit, Member> implements ProfileMemberEdit, OnInit, OnError {
  memberRequest: Observable<Member> = new Observable();
  isInError: boolean;
  errorMsg: string;
  private frequencyRange: any;
  private maximumBirthdate: string;
  member: any;
  gyms: any;
  errorTranslations: any;
  memberForm: FormGroup;
  frequencyCtrl: FormControl;
  emailCtrl: FormControl;
  firstNameCtrl: FormControl;
  lastNameCtrl: FormControl;
  birthdateCtrl: FormControl;
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

  constructor(dialogService: DialogService, private fb: FormBuilder,
              private memberService: MemberService, private gymService: GymService, private slimLoadingBarService: SlimLoadingBarService) {
    super(dialogService);
  }

  edit() {
    this.close();
    this.member.lastName = this.lastNameCtrl.value;
    this.member.firstName = this.firstNameCtrl.value;
    this.member.mail = this.emailCtrl.value;
    this.member.sessionFrequency = this.frequencyCtrl.value;
    this.member.birthDate = new Date(this.birthdateCtrl.value);
    this.member.objective = this.getObjectiveValue();
    this.memberRequest = this.memberService.editProfile(this.member);
    this.slimLoadingBarService.start();
    this.memberRequest
      .finally(() => {
        this.slimLoadingBarService.complete();
      })
      .subscribe((member) => {
          this.result = member;
        },
        (errorMsg) => {
          console.error(errorMsg);
          this.displayErrorMsg(errorMsg);
        }
      );
  }

  ngOnInit() {
    const httpRequest: Observable<Gym[] | string> = this.gymService.findAll();
    httpRequest.subscribe(gyms => {
        this.gyms = gyms;
      },
      errorMsg => {
        console.error(errorMsg);
        this.displayErrorMsg(errorMsg);
      });

    this.buildForm();
  }

  buildForm() {
    this.frequencyRange = {
      min: 1,
      max: 25
    };
    this.errorTranslations = {
      frequency: {
        required: 'La fréquence à laquelle vous irais à la salle doit être renseignée.',
        minValue: `Vous devez aller au moins une fois à la salle de sport.`,
        maxValue: `Vous ne pouvez pas allez jusqu'à ${this.frequencyRange.max} fois à la salle.`,
      }
    };

    this.emailCtrl = this.fb.control(this.member.mail, Validators.required);
    this.firstNameCtrl = this.fb.control(this.member.firstName, Validators.required);
    this.lastNameCtrl = this.fb.control(this.member.lastName, Validators.required);
    this.objectiveCtrl = this.fb.control('');
    this.gymCtrl = this.fb.control('');
    this.frequencyCtrl = this.fb.control(this.member.sessionFrequency, [Validators.required,
      CustomValidators.minValue(this.frequencyRange.min),
      CustomValidators.maxValue(this.frequencyRange.max)
    ]);
    this.birthdateCtrl = this.fb.control(
      moment(this.member.birthDate).format('YYYY-MM-DD'), Validators.required
    );

    if (this.member.objective === 'GeneralForm' || this.member.objective === 'GF') {
      this.objectiveChoices[0].checked = true;
    } else if (this.member.objective === 'MassGainer' || this.member.objective === 'MG') {
      this.objectiveChoices[1].checked = true;
    } else {
      this.objectiveChoices[2].checked = true;
    }
    this.maximumBirthdate = this.buildToBeOldEnoughDate();
    this.memberForm = this.fb.group({
      email: this.emailCtrl,
      firstName: this.firstNameCtrl,
      lastName: this.lastNameCtrl,
      birthdate: this.birthdateCtrl,
      objective: this.objectiveCtrl,
      frequency: this.frequencyCtrl,
      gym: this.gymCtrl
    });
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

  displayErrorMsg(errorMsg: string) {
    this.isInError = true;
    this.errorMsg = errorMsg;
  }

  hideErrorMsg() {
    this.isInError = false;
    this.errorMsg = '';
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
}

export interface ProfileMemberEdit {
  member: any;
}