import {Component, OnInit} from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms'

@Component({
  selector: 'pulpe-profile-completation',
  templateUrl: './profile-completation.component.html',
  styleUrls: ['./profile-completation.component.css']
})
export class ProfileCompletationComponent implements OnInit {
  public profilCompleteForm:FormGroup;
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
  public generalChecked = false;
  public massGainerChecked = false;
  public weightLossChecked = false;
  public sizeCtrl:FormControl;
  public objectiveCtrl:FormControl;

  constructor(fb:FormBuilder) {
    this.sizeCtrl = fb.control('', [Validators.required]);
    this.objectiveCtrl = fb.control('', [Validators.required]);
    this.profilCompleteForm = fb.group({
      size: this.sizeCtrl,
      objective: this.objectiveCtrl
    });
  }

  ngOnInit() {
  }

  public check(choice) {
    this.uncheckAllChoice();
    this.objectiveCtrl.setValue(choice.value);
    choice.checked = true;
  }

  private uncheckAllChoice():void {
    this.objectiveChoices.forEach(objective => objective.checked = false);
    this.objectiveCtrl.setValue('');
  }

  public complete() {
    console.log(this.profilCompleteForm.value);
  }
}
