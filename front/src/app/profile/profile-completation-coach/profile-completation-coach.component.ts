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
  isInError: boolean;
  errorMsg: string;
  errorTranslations: any;
  TAB_CREATE_GYM = 0;

  constructor(private fb: FormBuilder, private profileService: ProfileService, private localStorageService: LocalStorageService, private router: Router) {
    this.maximumBirthdate = this.buildToBeOldEnoughDate();
    this.initValidators();
    this.buildForm(fb);
  }

  initValidators() {
    this.errorTranslations = {
      birthdate: {
        required: 'Votre date de naissance doit être renseignée.'
      },
      name: {
        required: 'Le nom de la salle de sport doit être renseignée.'
      },
      address: {
        required: `L'adresse être renseignée.`
      },
      city: {
        required: 'Le nom de la ville doit être renseignée.'
      },
      nameExisting: {
        required: 'La salle de sport doit être renseignée.'
      }
    };
  }

  ngOnInit() {
  }

  complete() {
    const httpRequest: Observable<AuthenticationProfile | string> = this.profileService.completeCoachProfile(this.nameExistingGymCtrl.value, this.nameGymCtrl.value, this.addressGymCtrl.value, this.cityGymCtrl.value, new Date(this.birthdateCtrl.value));
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
    this.nameExistingGymCtrl = fb.control();
    this.profileCompleteForm = fb.group({
      birthdate: this.birthdateCtrl,
      nameGym: this.nameGymCtrl,
      addressGym: this.addressGymCtrl,
      cityGym: this.cityGymCtrl,
      nameExistingGym: this.nameExistingGymCtrl
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
    this.birthdateCtrl = this.fb.control('', Validators.required);
    if ($event.index === this.TAB_CREATE_GYM) {
      this.nameGymCtrl = this.fb.control('', Validators.required);
      this.addressGymCtrl = this.fb.control('', Validators.required);
      this.cityGymCtrl = this.fb.control('', Validators.required);
      this.profileCompleteForm = this.fb.group({
        birthdate: this.birthdateCtrl,
        nameGym: this.nameGymCtrl,
        addressGym: this.addressGymCtrl,
        cityGym: this.cityGymCtrl
      });
    } else {
      this.nameExistingGymCtrl = this.fb.control('', Validators.required);
      this.profileCompleteForm = this.fb.group({
        birthdate: this.birthdateCtrl,
        nameExistingGym: this.nameExistingGymCtrl
      });
    }
  }
}
