import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, ValidatorFn, AbstractControl } from '@angular/forms'
import {CustomValidators} from "../_formValidators/CustomValidators";
import * as moment from 'moment/moment';

@Component({
  selector: 'pulpe-profile-completation',
  templateUrl: './profile-completation.component.html',
  styleUrls: ['./profile-completation.component.css']
})
export class ProfileCompletationComponent implements OnInit {
  public profilCompleteForm:FormGroup;
  public sizeCtrl:FormControl;
  public objectiveCtrl:FormControl;
  public weightCtrl:FormControl;
  public birthdateCtrl:FormControl;
  public frequencyCtrl:FormControl;
  public objectiveChoices = [
    {
      checked: false,
      value: 'general',
      picture: '../../assets/img/exercise-types/stationary-bike-64.png',
      display: 'Forme générale'
    },
    {
      checked: false,
      value: 'massGainer',
      picture: '../../assets/img/exercise-types/strength-64.png',
      display: 'Prise de masse'
    },
    {
      checked: false,
      value: 'weightLoss',
      picture: '../../assets/img/exercise-types/weight-64.png',
      display: 'Perte de poids'
    }
  ];
  public errorTranslations:any;
  private sizesRange:any;
  private frequencyRange:any;
  private maximumBirthdate:string;
  private weightRange:any;
  public debug:boolean;

  constructor(fb:FormBuilder) {
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

  private buildForm(fb:FormBuilder) {
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
    this.frequencyCtrl = fb.control('', [Validators.required,
      CustomValidators.minValue(this.frequencyRange.min),
      CustomValidators.maxValue(this.frequencyRange.max)
    ]);
    this.profilCompleteForm = fb.group({
      size: this.sizeCtrl,
      objective: this.objectiveCtrl,
      weight: this.weightCtrl,
      birthdate: this.birthdateCtrl,
      frequency: this.frequencyCtrl
    });
  }

  ngOnInit() {
  }

  public check(choice) {
    this.resetChoices();
    this.objectiveCtrl.setValue(choice.value);
    choice.checked = true;
  }

  private resetChoices():void {
    this.objectiveChoices.forEach(objective => objective.checked = false);
    this.objectiveCtrl.setValue('');
  }

  public complete() {
    console.log(this.profilCompleteForm.value);
  }

  private buildToBeOldEnoughDate():string {
    const maxDate = new Date();
    maxDate.setFullYear(maxDate.getFullYear() - 14);
    maxDate.setMonth(0);
    maxDate.setDate(1);
    return moment(maxDate).format('YYYY-MM-DD');
  }
}
