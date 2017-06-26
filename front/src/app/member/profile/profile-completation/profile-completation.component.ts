import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, FormControl, Validators} from '@angular/forms'
import {CustomValidators} from "../../../_formValidators/CustomValidators";
import * as moment from 'moment/moment';
import {ProfileService} from "../profile.service";
import {Measurement} from "../../../_model/Measurement";
import {MeasurementEnum} from '../../../_enums/MeasurementEnum';
import {Observable} from "rxjs/Observable";
import {AuthenticationProfile} from "../../../_model/AuthenticationProfile";
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {Router} from '@angular/router';
import {OnError} from "../../../_helpers/IUIErrorHandlerHelper";
import {Gym} from "../../../_model/Gym";
import {GymService} from "../../../_services/gym/gym.service";

@Component({
  selector: 'pulpe-profile-completation',
  templateUrl: 'profile-completation.component.html',
  styleUrls: ['profile-completation.component.scss']
})
export class ProfileCompletationComponent implements OnInit, OnError {
  isInError: boolean;
  errorMsg: string;
  profileCompleteForm: FormGroup;
  sizeCtrl: FormControl;
  objectiveCtrl: FormControl;
  weightCtrl: FormControl;
  birthdateCtrl: FormControl;
  frequencyCtrl: FormControl;
  genderCtrl: FormControl;
  gymCtrl: FormControl;
  errorTranslations: any;
  private sizesRange: any;
  private frequencyRange: any;
  private maximumBirthdate: string;
  private weightRange: any;
  debug: boolean;
  gyms: any;
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

  constructor(fb: FormBuilder, private profileService: ProfileService, private gymService: GymService, private localStorageService: LocalStorageService, private router: Router) {
    this.sizesRange = {
      min: 50,
      max: 250
    };
    this.weightRange = {
      min: 25,
      max: 250
    };
    this.frequencyRange = {
      min: 1,
      max: 25
    };
    this.maximumBirthdate = this.buildToBeOldEnoughDate();
    this.errorTranslations = {
      size: {
        required: 'Votre taille doit être renseignée.',
        minValue: `Votre taille doit être supérieur à ${this.sizesRange.min} cm.`,
        maxValue: `Votre taille doit être inférieur à ${this.sizesRange.max} cm.`,
      },
      frequency: {
        required: 'La fréquence à laquelle vous irais à la salle doit être renseignée.',
        minValue: `Vous devez aller au moins une fois à la salle de sport.`,
        maxValue: `Vous ne pouvez pas allez jusqu'à ${this.frequencyRange.max} fois à la salle.`,
      },
      weight: {
        required: 'Votre poids doit être renseigné.',
        minValue: `Votre poids doit être supérieur à ${this.weightRange.min} kg.`,
        maxValue: `Votre poids doit être inférieur à ${this.weightRange.max} kg.`,
      }
    };
    this.debug = false;
    this.buildForm(fb);
  }

  private buildForm(fb: FormBuilder) {
    this.sizeCtrl = fb.control('', [
      Validators.required,
      CustomValidators.minValue(this.sizesRange.min),
      CustomValidators.maxValue(this.sizesRange.max)
    ]);
    this.objectiveCtrl = fb.control('', Validators.required);
    this.weightCtrl = fb.control('', [
      Validators.required,
      CustomValidators.minValue(this.weightRange.min),
      CustomValidators.maxValue(this.weightRange.max)
    ]);
    this.birthdateCtrl = fb.control('', Validators.required);
    this.genderCtrl = fb.control('Male');
    this.frequencyCtrl = fb.control('', [Validators.required,
      CustomValidators.minValue(this.frequencyRange.min),
      CustomValidators.maxValue(this.frequencyRange.max)
    ]);
    this.gymCtrl = fb.control('');
    this.profileCompleteForm = fb.group({
      size: this.sizeCtrl,
      objective: this.objectiveCtrl,
      weight: this.weightCtrl,
      birthdate: this.birthdateCtrl,
      frequency: this.frequencyCtrl,
      gym: this.gymCtrl,
      gender: this.genderCtrl
    });
  }

  ngOnInit() {
    const httpRequest: Observable<Gym[] | string> = this.gymService.findAll();
    httpRequest.subscribe(gyms => {
        console.dir(gyms);
        this.gyms = gyms;
      },
      errorMsg => {
        this.displayErrorMsg(errorMsg);
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

  complete() {
    const size = Measurement.of()
      .name(MeasurementEnum.Name.Size)
      .unit(MeasurementEnum.Unit.Centimeter)
      .value(this.sizeCtrl.value)
      .build();

    const weight = Measurement.of()
      .name(MeasurementEnum.Name.Weight)
      .unit(MeasurementEnum.Unit.Kilogram)
      .value(this.weightCtrl.value)
      .build();


    const httpRequest: Observable<AuthenticationProfile | string> = this.profileService.completeMemberProfile(this.gymCtrl.value, size, weight, this.frequencyCtrl.value, new Date(this.birthdateCtrl.value), this.objectiveCtrl.value, this.genderCtrl.value);
    httpRequest.subscribe(
      authProfile => {
        this.localStorageService.set('profile', JSON.stringify(authProfile));
        this.router.navigateByUrl('/accueil');
      },
      errorMsg => {
        this.displayErrorMsg(errorMsg);
      }
    );
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
}
