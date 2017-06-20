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

@Component({
  selector: 'pulpe-profile-member-edit-dialog',
  templateUrl: 'profile-member-edit-dialog.component.html',
  styleUrls: ['profile-member-edit-dialog.component.css']
})
export class ProfileMemberEditDialogComponent extends DialogComponent<ProfileMemberEdit, Member> implements ProfileMemberEdit, OnInit {
  private frequencyRange: any;
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



  }

  ngOnInit() {
    const httpRequest: Observable<Gym[] | string> = this.gymService.findAll();
    httpRequest.subscribe(gyms => {
        this.gyms = gyms;
      },
      errorMsg => {
        console.error(errorMsg);
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
      moment(this.member.birthdate).format('YYYY-MM-DD'), Validators.required
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
    }

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

  private resetChoices(): void {
    this.objectiveChoices.forEach(objective => objective.checked = false);
    this.objectiveCtrl.setValue('');
  }
}

export interface ProfileMemberEdit {
  member: any;
}