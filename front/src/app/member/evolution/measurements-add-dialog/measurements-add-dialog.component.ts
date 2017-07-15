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
import {MeasurementConverter} from "../../../shared/MeasurementConverter";

@Component({
  selector: 'pulpe-measurements-add-dialog',
  templateUrl: 'measurements-add-dialog.component.html',
  styleUrls: ['measurements-add-dialog.component.scss']
})
export class MeasurementsAddDialogComponent extends DialogComponent<MeasurementAdd, Measurement[]> implements MeasurementAdd, OnInit {
  memberRequest: Observable<Member> = new Observable();
  authenticationProfile: AuthenticationProfile;
  measurements: Measurement[];
  rangesValidations: any;
  measurementForm: FormGroup;
  valueCtrl: FormControl;
  rangeValidations: any;

  measurementsLabels: string[] = [];
  measurementTypeCtrl: FormControl;

  constructor(dialogService: DialogService, private fb: FormBuilder, private route: ActivatedRoute, private localStorage: LocalStorageService,
              private memberService: MemberService, private slimLoadingBarService: SlimLoadingBarService, private router: Router,
              private measurementEnumService: MeasurementEnumService, private measurementConverter: MeasurementConverter) {
    super(dialogService);
  }

  ngOnInit(): void {
    this.measurementsLabels = this.measurementConverter.toLabelsArray();
    this.initValidators();
    this.buildForm(this.fb);
  }

  initValidators() {
    this.rangesValidations = {};
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.Size]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.Weight]] = {
      min: 25,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.Hip]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.Chest]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.Waist]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.Shoulders]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.RightArm]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.LeftArm]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.RightCalf]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.LeftCalf]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.RightThigh]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };
    this.rangesValidations[MeasurementEnum.Name[MeasurementEnum.Name.LeftThigh]] = {
      min: 50,
      max: 250,
      unit: this.measurementEnumService.getCodeFromUnit(MeasurementEnum.Unit.Centimeter)
    };

  }

  buildForm(fb: FormBuilder) {
    this.measurementTypeCtrl = this.fb.control('', Validators.required);
    this.valueCtrl = this.fb.control({});
    this.measurementForm = fb.group({
      type: this.measurementTypeCtrl,
      value: this.valueCtrl
    });

  }

  confirm() {
    this.close();
    let profileInLocalStorage: string = this.localStorage.get<string>('profile');
    if (profileInLocalStorage) {
      const measurementToAdd: Measurement = Measurement.of()
        .name(this.measurementConverter.getEnumFrom(this.measurementTypeCtrl.value))
        .value(this.valueCtrl.value)
        .unit(this.measurementEnumService.getUnitEnumFrom(this.rangeValidations.unit))
        .build();
      this.authenticationProfile = JSON.parse(profileInLocalStorage);
      this.memberRequest = this.memberService.addMeasurementOnAuthenticatedMember(measurementToAdd);
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

  refreshSpecificPropertiesOnChangeMeasurement(): void {
    let measurementNameSelected: string = this.measurementConverter.getNameFrom(this.measurementTypeCtrl.value);
    let measurement = this.measurements.filter(m => m.name.toString() === measurementNameSelected)[0];
    this.rangeValidations = this.rangesValidations[measurementNameSelected];
    if (measurement) {
      this.valueCtrl.setValidators([Validators.required, Validators.max(this.rangeValidations.max), Validators.min(this.rangeValidations.min)]);
      this.valueCtrl.setValue(measurement.value);
    }
  }
}

export interface MeasurementAdd {
  measurements: Measurement[];
}