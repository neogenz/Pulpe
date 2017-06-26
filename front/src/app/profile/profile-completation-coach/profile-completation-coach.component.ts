import {Component, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from "@angular/forms";
import {Router} from "@angular/router";
import {LocalStorageService} from "angular-2-local-storage";
import {ProfileService} from "../profile.service";
import * as moment from 'moment/moment';
import {OnError} from "../../_helpers/IUIErrorHandlerHelper";
import {Animations} from "../../shared/Animations";
import {Observable} from "rxjs";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";
import {GymService} from "../../_services/gym/gym.service";
import {Gym} from "../../_model/Gym";

@Component({
  selector: 'pulpe-profile-completation-coach',
  templateUrl: './profile-completation-coach.component.html',
  styleUrls: ['./profile-completation-coach.component.css'],
  animations: [Animations.fadeIn()]
})
export class ProfileCompletationCoachComponent implements OnInit, OnError {
  profileCompleteForm: FormGroup;
  private maximumBirthdate: string;
  birthdateCtrl: FormControl;
  nameGymCtrl: FormControl;
  addressGymCtrl: FormControl;
  cityGymCtrl: FormControl;
  nameExistingGymCtrl: FormControl;
  genderCtrl: FormControl;
  isInError: boolean;
  errorMsg: string;
  errorTranslations: any;
  TAB_CREATE_GYM = 0;
  gyms: any;
  private cityRange: any;
  private addressRange: any;
  private nameRange: any;

  constructor(private fb: FormBuilder, private profileService: ProfileService, private gymService: GymService, private localStorageService: LocalStorageService, private router: Router) {
    this.maximumBirthdate = this.buildToBeOldEnoughDate();
    this.cityRange = {
      min: 10,
      max: 150
    };
    this.addressRange = {
      min: 10,
      max: 150
    };
    this.nameRange = {
      min: 10,
      max: 90
    };
    this.initValidators();
    this.buildForm(fb);
  }

  initValidators() {
    this.errorTranslations = {
      birthdate: {
        required: 'Votre date de naissance doit être renseignée.'
      },
      name: {
        required: 'Le nom de la salle de sport doit être renseignée.',
        minValue: `Le nom de la salle de sport doit être supérieur à ${this.nameRange.min} caractères.`,
        maxValue: `Le nom de la salle de sport doit être inférieur à ${this.nameRange.max} caractères.`,
      },
      address: {
        required: `L'adresse être renseignée.`,
        minValue: `L'adresse de la salle de sport doit être supérieure à ${this.addressRange.min} caractères.`,
        maxValue: `L'adresse de la salle de sport doit être inférieure à ${this.addressRange.max} caractères.`,
      },
      city: {
        required: 'Le nom de la ville doit être renseignée.',
        minValue: `Le nom de la ville doit être supérieur à ${this.cityRange.min} caractères.`,
        maxValue: `Le nom de la ville doit être inférieur à ${this.cityRange.max} caractères.`,
      },
      nameExisting: {
        required: 'La salle de sport doit être renseignée.'
      }
    };
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

  complete() {
    const httpRequest: Observable<AuthenticationProfile | string> = this.profileService.completeCoachProfile(this.nameExistingGymCtrl.value, this.nameGymCtrl.value, this.addressGymCtrl.value, this.cityGymCtrl.value, new Date(this.birthdateCtrl.value), this.genderCtrl.value);
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

  buildForm(fb) {
    this.birthdateCtrl = fb.control('', Validators.required);
    this.nameGymCtrl = fb.control('', Validators.required);
    this.addressGymCtrl = fb.control('', Validators.required);
    this.cityGymCtrl = fb.control('', Validators.required);
    this.genderCtrl = fb.control('Male');
    this.nameExistingGymCtrl = fb.control();
    this.profileCompleteForm = fb.group({
      birthdate: this.birthdateCtrl,
      nameGym: this.nameGymCtrl,
      addressGym: this.addressGymCtrl,
      cityGym: this.cityGymCtrl,
      nameExistingGym: this.nameExistingGymCtrl,
      gender: this.genderCtrl
    });
  }

  private buildToBeOldEnoughDate(): string {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 14);
    maxDate.setMonth(0);
    maxDate.setDate(1);
    return moment(maxDate).format('YYYY-MM-DD');
  }

  displayErrorMsg(errorMsg: string) {
    this.isInError = true;
    this.errorMsg = errorMsg;
  }

  hideErrorMsg() {
    this.isInError = false;
    this.errorMsg = '';
  }

  onSelectChange = ($event: any): void => {
    this.birthdateCtrl = this.fb.control(this.birthdateCtrl.value, Validators.required);
    this.genderCtrl = this.fb.control(this.genderCtrl.value, Validators.required);
    if ($event.index === this.TAB_CREATE_GYM) {
      this.nameGymCtrl = this.fb.control('', Validators.required);
      this.addressGymCtrl = this.fb.control('', Validators.required);
      this.cityGymCtrl = this.fb.control('', Validators.required);
      this.profileCompleteForm = this.fb.group({
        birthdate: this.birthdateCtrl,
        gender: this.genderCtrl,
        nameGym: this.nameGymCtrl,
        addressGym: this.addressGymCtrl,
        cityGym: this.cityGymCtrl
      });
    } else {
      this.nameExistingGymCtrl = this.fb.control('', Validators.required);
      this.profileCompleteForm = this.fb.group({
        birthdate: this.birthdateCtrl,
        gender: this.genderCtrl,
        nameExistingGym: this.nameExistingGymCtrl
      });
    }
  }
}
