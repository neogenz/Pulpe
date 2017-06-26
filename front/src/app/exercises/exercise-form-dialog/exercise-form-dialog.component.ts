import {Component, OnInit} from '@angular/core';
import {Animations} from "../../shared/Animations";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {BodybuildingExercise} from "../../_model/exercise/BodybuildingExercise";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {WorkedMuscle} from "../../_model/WorkedMuscle";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pulpe-exercise-form-dialog',
  templateUrl: './exercise-form-dialog.component.html',
  styleUrls: ['./exercise-form-dialog.component.scss'],
  animations: [Animations.fadeIn()]
})
export class ExerciseFormDialogComponent extends DialogComponent<ExerciseFormConfigurable, AbstractExercise> implements ExerciseFormConfigurable, OnInit {

  title: string;
  exerciseForm: FormGroup;
  nameCtrl: FormControl;
  typeCtrl: FormControl;
  workedMuscleForm: FormGroup;
  workedMusclesCtrl: FormControl;
  usedMachinesForm: FormGroup;
  usedMachine: FormControl;
  exercise: AbstractExercise;
  workedMuscles: WorkedMuscle[];
  errorTranslations: any;

  constructor(dialogService: DialogService, private fb: FormBuilder, private toastrService: ToastrService) {
    super(dialogService);
    this.workedMuscles = [];
    this.errorTranslations = {
      workedMuscle: {
        alreadyExist: 'Ce muscle est déjà présent pour cette machine.'
      }
    }
  }

  ngOnInit() {
    this.exercise = new BodybuildingExercise(null, '', [], ExerciseGroupTypeEnum.BodybuildingExercise[ExerciseGroupTypeEnum.BodybuildingExercise]);
    this.buildForm();
  }

  buildForm() {
    this.nameCtrl = this.fb.control(this.exercise.name, Validators.required);
    this.exerciseForm = this.fb.group({
      name: this.nameCtrl
    });
  }

  addWorkedMuscle(workedMuscleToAdd: WorkedMuscle): void {
    let isOnError = false;
    for (let i = 0; i < this.workedMuscles.length; i++) {
      if (this.workedMuscles[i].isSame(workedMuscleToAdd)) {
        this.toastrService.error(this.errorTranslations.workedMuscle.alreadyExist, 'Erreur');
        isOnError = true;
      }
    }
    if (!isOnError) {
      this.workedMuscles.push(workedMuscleToAdd);
    }
  }

  deleteThisWorkedMuscle(workedMuscleToDelete: WorkedMuscle): void {
    this.workedMuscles = this.workedMuscles.filter(workedMuscle => {
      return workedMuscleToDelete.name != workedMuscle.name && workedMuscleToDelete.intensity != workedMuscle.intensity;
    });
  }
}

export interface ExerciseFormConfigurable {
  title: string;
}
