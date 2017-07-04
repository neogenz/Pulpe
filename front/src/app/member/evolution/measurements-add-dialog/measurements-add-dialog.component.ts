import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService, DialogOptions} from "ng2-bootstrap-modal";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Measurement} from "../../../_model/Measurement";
import {MeasurementEnum} from "../../../_enums/MeasurementEnum";
import {MemberService} from "../../../_services/member.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Observable} from "rxjs";
import {Router, Params, ActivatedRouteSnapshot, ActivatedRoute} from "@angular/router";
import {Member} from "../../../_model/Member";
import {LocalStorageService} from "angular-2-local-storage";
import {AuthenticationProfile} from "../../../_model/AuthenticationProfile";
import {CustomValidators} from "../../../_formValidators/CustomValidators";
import {MeasurementEnumService} from "../../../_services/measurement-enum.service";

@Component({
  selector: 'pulpe-measurements-add-dialog',
  templateUrl: 'measurements-add-dialog.component.html',
  styleUrls: ['measurements-add-dialog.component.scss']
})
export class MeasurementsAddDialogComponent extends DialogComponent<MeasurementAdd, Measurement[]> implements MeasurementAdd, OnInit {
  memberRequest: Observable<Member> = new Observable();
  authenticationProfile: AuthenticationProfile;
  measurements: any;
  sizesRange: any;
  weightRange: any;
  chestRange: any;
  hipRange: any;
  waistRange: any;
  shouldersRange: any;
  rightArmRange: any;
  leftArmRange: any;
  rightCalfRange: any;
  leftCalfRange: any;
  rightThighRange: any;
  leftThighRange: any;
  errorTranslations: any;
  measurementsForm: FormGroup;
  hipCtrl: FormControl;
  waistCtrl: FormControl;
  chestCtrl: FormControl;
  shouldersCtrl: FormControl;
  rightArmCtrl: FormControl;
  leftArmCtrl: FormControl;
  rightCalfCtrl: FormControl;
  leftCalfCtrl: FormControl;
  leftThighCtrl: FormControl;
  rightThighCtrl: FormControl;
  weightCtrl: FormControl;
  sizeCtrl: FormControl;

  constructor(dialogService: DialogService, private fb: FormBuilder, private route: ActivatedRoute, private localStorage: LocalStorageService,
              private memberService: MemberService, private slimLoadingBarService: SlimLoadingBarService, private router: Router,
              private measurementEnumService: MeasurementEnumService) {
    super(dialogService);
  }

  initValidators() {
    this.sizesRange = {
      min: 50,
      max: 250
    };
    this.weightRange = {
      min: 25,
      max: 250
    };
    this.hipRange = {
      min: 50,
      max: 250
    };
    this.chestRange = {
      min: 50,
      max: 250
    };
    this.waistRange = {
      min: 50,
      max: 250
    };
    this.shouldersRange = {
      min: 50,
      max: 250
    };
    this.rightArmRange = {
      min: 50,
      max: 250
    };
    this.leftArmRange = {
      min: 50,
      max: 250
    };
    this.rightCalfRange = {
      min: 50,
      max: 250
    };
    this.leftCalfRange = {
      min: 50,
      max: 250
    };
    this.rightThighRange = {
      min: 50,
      max: 250
    };
    this.leftThighRange = {
      min: 50,
      max: 250
    };
    this.errorTranslations = {
      size: {
        required: 'Votre taille doit être renseignée.',
        minValue: `Votre taille doit être supérieur à ${this.sizesRange.min} cm.`,
        maxValue: `Votre taille doit être inférieur à ${this.sizesRange.max} cm.`,
      },
      weight: {
        required: 'Votre poids doit être renseigné.',
        minValue: `Votre poids doit être supérieur à ${this.weightRange.min} kg.`,
        maxValue: `Votre poids doit être inférieur à ${this.weightRange.max} kg.`,
      },
      chest: {
        minValue: `Votre tour de poitrine doit être supérieur à ${this.chestRange.min} cm.`,
        maxValue: `Votre tour de poitrine doit être inférieur à ${this.chestRange.max} cm.`,
      },
      hip: {
        minValue: `Votre tour de hanche doit être supérieur à ${this.hipRange.min} cm.`,
        maxValue: `Votre tour de hanche doit être inférieur à ${this.hipRange.max} cm.`,
      },
      waist: {
        minValue: `Votre tour de taille doit être supérieur à ${this.waistRange.min} cm.`,
        maxValue: `Votre tour de taille doit être inférieur à ${this.waistRange.max} cm.`,
      },
      shoulders: {
        minValue: `Votre tour d'épaule doit être supérieur à ${this.shouldersRange.min} cm.`,
        maxValue: `Votre tour d'épaule doit être inférieur à ${this.shouldersRange.max} cm.`,
      },
      rightArm: {
        minValue: `Votre tour de bras droit doit être supérieur à ${this.rightArmRange.min} cm.`,
        maxValue: `Votre tour de bras droit doit être inférieur à ${this.rightArmRange.max} cm.`,
      },
      leftArm: {
        minValue: `Votre tour de bras gauche doit être supérieur à ${this.leftArmRange.min} cm.`,
        maxValue: `Votre tour de bras gauche doit être inférieur à ${this.leftArmRange.max} cm.`,
      },
      rightCalf: {
        minValue: `Votre tour de mollet droit doit être supérieur à ${this.rightCalfRange.min} cm.`,
        maxValue: `Votre tour de mollet droit doit être inférieur à ${this.rightCalfRange.max} cm.`,
      },
      leftCalf: {
        minValue: `Votre tour de mollet gauche doit être supérieur à ${this.leftCalfRange.min} cm.`,
        maxValue: `Votre tour de mollet gauche doit être inférieur à ${this.leftCalfRange.max} cm.`,
      },
      rightThigh: {
        minValue: `Votre tour de cuisse droite doit être supérieur à ${this.rightThighRange.min} cm.`,
        maxValue: `Votre tour de cuisse droite doit être inférieur à ${this.rightThighRange.max} cm.`,
      },
      leftThigh: {
        minValue: `Votre tour de cuisse gauche doit être supérieur à ${this.leftThighRange.min} cm.`,
        maxValue: `Votre tour de cuisse gauche doit être inférieur à ${this.leftThighRange.max} cm.`,
      }
    };
  }

  buildForm(fb: FormBuilder, measurements) {
    let elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Size));
    this.sizeCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      Validators.required,
      CustomValidators.minValue(this.sizesRange.min),
      CustomValidators.maxValue(this.sizesRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Weight));
    this.weightCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      Validators.required,
      CustomValidators.minValue(this.weightRange.min),
      CustomValidators.maxValue(this.weightRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Hip));
    this.hipCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.hipRange.min),
      CustomValidators.maxValue(this.hipRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Waist));
    this.waistCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.waistRange.min),
      CustomValidators.maxValue(this.waistRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Shoulders));
    this.shouldersCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.shouldersRange.min),
      CustomValidators.maxValue(this.shouldersRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Chest));
    this.chestCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.chestRange.min),
      CustomValidators.maxValue(this.chestRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Right_Arm));
    this.rightArmCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.rightArmRange.min),
      CustomValidators.maxValue(this.rightArmRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Left_Arm));
    this.leftArmCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.leftArmRange.min),
      CustomValidators.maxValue(this.leftArmRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Right_Calf));
    this.rightCalfCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.rightCalfRange.min),
      CustomValidators.maxValue(this.rightCalfRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Left_Calf));
    this.leftCalfCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.leftCalfRange.min),
      CustomValidators.maxValue(this.leftCalfRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Right_Thigh));
    this.rightThighCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.rightThighRange.min),
      CustomValidators.maxValue(this.rightThighRange.max)
    ]);
    elem = measurements.filter(m => m.name === this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Left_Thigh));
    this.leftThighCtrl = fb.control(elem.length > 0  ? elem[0].value : '', [
      CustomValidators.minValue(this.leftThighRange.min),
      CustomValidators.maxValue(this.leftThighRange.max)
    ]);

    this.measurementsForm = fb.group({
      hip: this.hipCtrl,
      waist: this.waistCtrl,
      chest: this.chestCtrl,
      shoulders: this.shouldersCtrl,
      rightArm: this.rightArmCtrl,
      leftArm: this.leftArmCtrl,
      rightCalf: this.rightCalfCtrl,
      leftCalf: this.leftCalfCtrl,
      rightThigh: this.rightThighCtrl,
      leftThigh: this.leftThighCtrl,
      weight: this.weightCtrl,
      size: this.sizeCtrl
    });
  }

  confirm() {
    this.close();
    const measurements = this.getMeasurements();
    if (measurements.length > 0) {
      let profileInLocalStorage: string = this.localStorage.get<string>('profile');
      if (profileInLocalStorage) {
        this.authenticationProfile = JSON.parse(profileInLocalStorage);
        this.memberRequest = this.memberService.addMeasurementsOnAuthenticatedMember(measurements);
        this.slimLoadingBarService.start();
        this.memberRequest
          .finally(() => {
            this.slimLoadingBarService.complete();
          })
          .subscribe((member) => {
              this.result = member.measurements;
            },
            (errorMsg) => {
              console.error(errorMsg);
            }
          );
      }
    }
  }

  getMeasurements() {
    let measurements = [];
    if (this.weightCtrl.value) {
      const weight = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Weight),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Kilogram),
        value: this.weightCtrl.value
      };
      measurements.push(weight);
    }
    if (this.sizeCtrl.value) {
      const size = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Size),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.sizeCtrl.value
      };
      measurements.push(size);
    }
    if (this.chestCtrl.value) {
      const chest = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Chest),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.chestCtrl.value
      };
      measurements.push(chest);
    }
    if (this.hipCtrl.value) {
      const hip = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Hip),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.hipCtrl.value
      };
      measurements.push(hip);
    }
    if (this.waistCtrl.value) {
      const waist = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Waist),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.waistCtrl.value
      };
      measurements.push(waist);
    }
    if (this.leftArmCtrl.value) {
      const leftArm = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Left_Arm),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.leftArmCtrl.value
      };
      measurements.push(leftArm);
    }
    if (this.rightArmCtrl.value) {
      const rightArm = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Right_Arm),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.rightArmCtrl.value
      };
      measurements.push(rightArm);
    }
    if (this.leftCalfCtrl.value) {
      const leftCalf = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Left_Calf),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.leftCalfCtrl.value
      };
      measurements.push(leftCalf);
    }
    if (this.rightCalfCtrl.value) {
      const rightCalf = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Right_Calf),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.rightCalfCtrl.value
      };
      measurements.push(rightCalf);
    }
    if (this.leftThighCtrl.value) {
      const leftThigh = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Left_Thigh),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.leftThighCtrl.value
      };
      measurements.push(leftThigh);
    }
    if (this.rightThighCtrl.value) {
      const rightThigh = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Right_Thigh),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.rightThighCtrl.value
      };
      measurements.push(rightThigh);
    }
    if (this.shouldersCtrl.value) {
      const shoulders = {
        name: this.measurementEnumService.getCodeFromName(MeasurementEnum.Name.Shoulders),
        unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter),
        value: this.shouldersCtrl.value
      };
      measurements.push(shoulders);
    }
    return measurements;
  }

  ngOnInit(): void {
    this.initValidators();
    this.buildForm(this.fb, this.measurements === undefined || this.measurements === null ? [] : this.measurements);
  }
}

export interface MeasurementAdd {
  measurements: any;
}