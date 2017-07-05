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
import { AuthenticationService } from "../../../_services/authentication/authentication.service";
import { ObjectiveEnum } from "../../../_enums/ObjectiveEnum";

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
  private maximumBirthdate: Date;
  private weightRange: any;
  private objectiveAlreadySelected:boolean = false;
  selectedObjective:{checked:boolean, value:string,picture:string,display:string} = null;
  private authProfile:AuthenticationProfile;
  debug: boolean;
  gyms: any;
  objectiveChoices = [
    {
      checked: false,
      value: 'GeneralForm',
      picture: '../../assets/img/exercise-types/stationary-bike-64.png',
      display: 'Forme générale'
    },
    {
      checked: false,
      value: 'MassGainer',
      picture: '../../assets/img/exercise-types/strength-64.png',
      display: 'Prise de masse'
    },
    {
      checked: false,
      value: 'WeightLoss',
      picture: '../../assets/img/exercise-types/weight-64.png',
      display: 'Perte de poids'
    }
  ];

  constructor(
    private fb: FormBuilder, 
    private profileService: ProfileService, 
    private authService:AuthenticationService, 
    private gymService: GymService, 
    private localStorageService: LocalStorageService, 
    private router: Router) {
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
  }

  ngOnInit() {
     this.authProfile = this.authService.getAuthenticationProfileInLocalStorage();
    this.buildForm(this.fb);
    const httpRequest: Observable<Gym[] | string> = this.gymService.findAll();
    httpRequest.subscribe(gyms => {
        this.gyms = gyms;
      },
      errorMsg => {
        this.displayErrorMsg(errorMsg);
      });
  }

  private buildForm(fb: FormBuilder) {
    debugger;
    this.sizeCtrl = fb.control('', [
      Validators.required,
      CustomValidators.minValue(this.sizesRange.min),
      CustomValidators.maxValue(this.sizesRange.max)
    ]);
    //It's builded before assign default value, because method 'this.check' work on instance of this.objectiveCtrl
    this.objectiveCtrl = fb.control(null, Validators.required);
    let preSelectedObjective = null;
    if(this.authProfile.objective){
      this.objectiveAlreadySelected = true;
      preSelectedObjective = ObjectiveEnum[this.authProfile.objective];
      this.check(this.objectiveChoices.find(o=>o.value===preSelectedObjective));
      this.objectiveCtrl.disable();
    }
    this.weightCtrl = fb.control('', [
      Validators.required,
      CustomValidators.minValue(this.weightRange.min),
      CustomValidators.maxValue(this.weightRange.max)
    ]);
    this.birthdateCtrl = fb.control(null, Validators.required);
    if( moment(this.authProfile.birhtdate).isValid()){
      this.birthdateCtrl.disable();
      this.birthdateCtrl.setValue(this.authProfile.birhtdate);
    }
    this.genderCtrl = fb.control(this.authProfile.gender ?this.authProfile.gender:'Male' , Validators.required);
    if(this.authProfile.gender){
      this.genderCtrl.disable();
    }
    this.frequencyCtrl = fb.control(this.authProfile.frequency, [Validators.required,
      CustomValidators.minValue(this.frequencyRange.min),
      CustomValidators.maxValue(this.frequencyRange.max)
    ]);
    if(this.authProfile.frequency){
      this.frequencyCtrl.disable();
    }
    this.gymCtrl = fb.control(null, Validators.required);
    if(this.authProfile.gym){
      let preSelectedGymId = null;
      preSelectedGymId = this.authProfile.gym._id;
      this.gymCtrl.setValue(preSelectedGymId);
      this.gymCtrl.disable();
    }
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

  check(choice) {
    this.resetChoices();
    this.objectiveCtrl.setValue(choice.value);
    choice.checked = true;
    this.selectedObjective = choice;
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
        this.router.navigateByUrl('/programme');
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

  private buildToBeOldEnoughDate(): Date {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 14);
    maxDate.setMonth(0);
    maxDate.setDate(1);
    return moment(maxDate).toDate();
  }
}
