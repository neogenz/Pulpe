import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MuscleConverter} from "../../MuscleConverter";
import {DifficultyEnum} from "../../../_enums/DifficultyEnum";
import {WorkedMuscle} from "../../../_model/WorkedMuscle";
import {DifficultyConverter} from "../../DifficultyConverter";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pulpe-select-worked-muscle',
  templateUrl: './select-worked-muscle.component.html',
  styleUrls: ['./select-worked-muscle.component.scss']
})
export class SelectWorkedMuscleComponent implements OnInit {

  @Output() muscleAdded = new EventEmitter<WorkedMuscle>();

  workedMuscleForm: FormGroup;
  workedMuscleNameCtrl: FormControl;
  intensityCtrl: FormControl;
  workedMusclesLabels: string[];
  difficultyConverter: DifficultyConverter = new DifficultyConverter();
  difficultyOpts: DifficultiesSelectable;
  workedMuscle: WorkedMuscle;

  constructor(private muscleConverter: MuscleConverter, private fb: FormBuilder) {
    this.difficultyOpts = {
      easy: {
        value: DifficultyEnum.easy,
        label: this.difficultyConverter.convertThisEnum(DifficultyEnum.easy),
      },
      medium: {
        value: DifficultyEnum.medium,
        label: this.difficultyConverter.convertThisEnum(DifficultyEnum.medium),
      },
      hard: {
        value: DifficultyEnum.hard,
        label: this.difficultyConverter.convertThisEnum(DifficultyEnum.hard),
      }
    }
  }

  ngOnInit() {
    this.workedMusclesLabels = this.muscleConverter.toLabelArray();
    this.workedMuscle = WorkedMuscle.of().name(null).intensity(DifficultyEnum.easy).build();
    this.buildForm();
  }

  buildForm(): void {
    this.intensityCtrl = this.fb.control(this.workedMuscle.intensity, Validators.required);
    this.workedMuscleNameCtrl = this.fb.control(this.workedMuscle.name, Validators.required);
    this.workedMuscleForm = this.fb.group({
      intensity: this.intensityCtrl,
      name: this.workedMuscleNameCtrl
    });
  }

  add(): void {
    let workedMuscle = WorkedMuscle.of().name(this.muscleConverter.getEnumFrom(this.workedMuscleNameCtrl.value)).intensity(this.intensityCtrl.value).build();
    this.muscleAdded.emit(workedMuscle);
  }
}
interface DifficultySelectable {
  label: string;
  value: DifficultyEnum;
}

interface DifficultiesSelectable {
  easy: DifficultySelectable;
  medium: DifficultySelectable;
  hard: DifficultySelectable;
}

export interface WorkedMuscleSelectable {
  workedMusclesCtrl: FormArray;
  errorTranslations: any;

  _initWorkedMuscleControl(workedMuscle: WorkedMuscle): FormControl;
  deleteWorkedMuscleAtThis(index: number): void;
  addWorkedMuscle(workedMuscleToAdd: WorkedMuscle): void;
}