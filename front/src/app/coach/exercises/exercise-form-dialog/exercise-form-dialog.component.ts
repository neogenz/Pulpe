import {Component, OnInit} from '@angular/core';
import {Animations} from "../../../shared/Animations";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {AbstractExercise} from "../../../_model/exercise/AbstractExercise";
import {FormArray, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from "@angular/forms";
import {BodybuildingExercise} from "../../../_model/exercise/BodybuildingExercise";
import {ExerciseGroupTypeEnum} from "../../../_enums/ExerciseGroupTypeEnum";
import {WorkedMuscle} from "../../../_model/WorkedMuscle";
import {ToastrService} from "ngx-toastr";
import {Machine} from "../../../_model/Machine";
import {WorkedMuscleSelectable} from "../../../shared/form/select-worked-muscle/select-worked-muscle.component";
import {UsedMachineSelectable} from "../../../shared/form/select-machines/select-machines.component";
import {ExerciseGroupCode, ExerciseGroupCodeConverter} from "../../../shared/ExerciseGroupCodeConverter";
import {SpecificExerciseFormBuilderService} from "./specific-exercise-form-builder.service";
import {ExerciseService} from "../exercise.service";
import {ExerciseOpenMode} from "../exercises.component";
import {ExerciseFactory} from "../../../_model/exercise/ExerciseFactory";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {CardioExercise} from "../../../_model/exercise/CardioExercise";
import {DifficultyConverter} from "../../../shared/DifficultyConverter";

@Component({
  selector: 'pulpe-exercise-form-dialog',
  templateUrl: './exercise-form-dialog.component.html',
  styleUrls: ['./exercise-form-dialog.component.scss'],
  animations: [Animations.fadeIn()]
})
export class ExerciseFormDialogComponent extends DialogComponent<ExerciseFormConfigurable, AbstractExercise> implements ExerciseFormConfigurable, OnInit, WorkedMuscleSelectable, UsedMachineSelectable {

  public ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;
  title: string;
  mode: ExerciseOpenMode;
  exerciseForm: FormGroup;
  nameCtrl: FormControl;
  typeCtrl: FormControl;
  workedMusclesCtrl: FormArray;
  usedMachinesCtrl: FormArray;
  exercise: AbstractExercise;
  errorTranslations: any;
  exercisesGroupCodes: ExerciseGroupCode[];
  exerciseSaveRequest: Observable<AbstractExercise>;
  difficultyLabels: string[];

  constructor(dialogService: DialogService,
              private fb: FormBuilder,
              private toastrService: ToastrService,
              public exerciseGroupCodeConverter: ExerciseGroupCodeConverter,
              private exerciseService: ExerciseService,
              public slimLoadingBarService: SlimLoadingBarService,
              private difficultyConverter: DifficultyConverter,
              private specificExerciseFormBuilderService: SpecificExerciseFormBuilderService) {
    super(dialogService);
    this.exercisesGroupCodes = exerciseGroupCodeConverter.toExerciseGroupCodeArray();
    this.errorTranslations = {
      workedMuscle: {
        alreadyExist: 'Ce muscle est déjà présent pour cette machine.'
      },
      usedMachine: {
        alreadyExist: 'Cette machine est déjà présente pour cet exercice.'
      }
    };
    this.difficultyLabels = this.difficultyConverter.getLabelsArray();
  }

  ngOnInit() {
    if (!this.exercise) {
      this.exercise = ExerciseFactory.create(ExerciseGroupTypeEnum.BodybuildingExercise, {});
      this.exercise.workedMuscles = [];
    }
    this.buildForm();
    this.exercise.workedMuscles.forEach(workedMuscle => this.addWorkedMuscle(workedMuscle));
    this.exercise.machines.forEach(machine => this.addUsedMachine(machine));
  }

  buildForm() {
    this.nameCtrl = this.fb.control(this.exercise.name, Validators.required);
    this.typeCtrl = this.fb.control(this.exercise.type, Validators.required);
    this.workedMusclesCtrl = this.fb.array([], Validators.compose([Validators.required]));
    this.usedMachinesCtrl = this.fb.array([], Validators.compose([Validators.required]));
    this.exerciseForm = this.fb.group({
      name: this.nameCtrl,
      workedMuscles: this.workedMusclesCtrl,
      machines: this.usedMachinesCtrl,
      type: this.typeCtrl,
      specifics: this.specificExerciseFormBuilderService.getFormGroupByExercise(this.exercise)
    });
  }

  public refreshSpecificPropertiesOnChangeExerciseType(): void {
    this.exercise.type = this.typeCtrl.value;
    this.exercise = ExerciseFactory.create(ExerciseGroupTypeEnum[this.exercise.type], {});
    this.exerciseForm.setControl('specifics', this.specificExerciseFormBuilderService.getFormGroupByExercise(this.exercise));
  }

  addWorkedMuscle(workedMuscleToAdd: WorkedMuscle): void {
    let isOnError = false;
    for (let i = 0; i < this.workedMusclesCtrl.value.length; i++) {
      if (this.workedMusclesCtrl.value[i].isSame(workedMuscleToAdd)) {
        this.toastrService.error(this.errorTranslations.workedMuscle.alreadyExist, 'Erreur');
        isOnError = true;
      }
    }
    if (!isOnError) {
      this.workedMusclesCtrl.push(this._initWorkedMuscleControl(workedMuscleToAdd))
    }
  }

  _initWorkedMuscleControl = (workedMuscle: WorkedMuscle): FormControl => {
    return this.fb.control(workedMuscle, Validators.required);
  };

  deleteWorkedMuscleAtThis(index: number): void {
    this.workedMusclesCtrl.removeAt(index);
  }

  addUsedMachine(machineToAdd: Machine): void {
    let isOnError = false;
    for (let i = 0; i < this.usedMachinesCtrl.value.length; i++) {
      if (this.usedMachinesCtrl.value[i].isSame(machineToAdd)) {
        this.toastrService.error(this.errorTranslations.usedMachine.alreadyExist, 'Erreur');
        isOnError = true;
      }
    }
    if (!isOnError) {
      this.usedMachinesCtrl.push(this._initUsedMachineControl(machineToAdd))
    }
  }

  _initUsedMachineControl = (machine: Machine): FormControl => {
    return this.fb.control(machine, Validators.required);
  };

  deleteUsedMachineAtThis(index: number): void {
    this.usedMachinesCtrl.removeAt(index);
  }

  confirm(): void {
    if (this.mode === ExerciseOpenMode.Add) {
      this.add();
    } else {
      this.edit();
    }
  }

  add(): void {
    const exercise: AbstractExercise = ExerciseFactory.create(ExerciseGroupTypeEnum[this.exercise.type], this.exercise);
    exercise.workedMuscles = this.workedMusclesCtrl.value;
    exercise.machines = this.usedMachinesCtrl.value;
    exercise.name = this.nameCtrl.value;
    exercise.type = this.typeCtrl.value;
    this._setSpecificFieldsOn(exercise);
    this.exerciseSaveRequest = this.exerciseService.save(exercise);
    this.slimLoadingBarService.start();
    this.exerciseSaveRequest
      .finally(() => {
        this.slimLoadingBarService.complete();
      })
      .subscribe((exercise) => {
          this.result = exercise;
          this.toastrService.success('Un nouvel exercice a été ajouté', 'Succès!');
          this.close();
        },
        (errorMsg) => {
          console.error(errorMsg);
          this.toastrService.error(errorMsg, 'Erreur');
        }
      );
  }

  edit(): void {
    const exercise: AbstractExercise = ExerciseFactory.create(ExerciseGroupTypeEnum[this.exercise.type], this.exercise);
    exercise.workedMuscles = this.workedMusclesCtrl.value;
    exercise.machines = this.usedMachinesCtrl.value;
    exercise.name = this.nameCtrl.value;
    exercise.type = this.typeCtrl.value;
    this._setSpecificFieldsOn(exercise);
    this.exerciseSaveRequest = this.exerciseService.update(exercise);
    this.slimLoadingBarService.start();
    this.exerciseSaveRequest
      .finally(() => {
        this.slimLoadingBarService.complete();
      })
      .subscribe((exercise) => {
          this.result = exercise;
          this.toastrService.success('Modification effectuée.', 'Succès!');
          this.close();
        },
        (errorMsg) => {
          console.error(errorMsg);
          this.toastrService.error(errorMsg, 'Erreur');
        }
      );
  }

  private _setSpecificFieldsOn(exercise: AbstractExercise) {
    switch (exercise.type) {
      case ExerciseGroupTypeEnum.BodybuildingExercise:
        (exercise as BodybuildingExercise).weight = this.exerciseForm.get('specifics').get('weight').value;
        break;
      case ExerciseGroupTypeEnum.CardioExercise:
        (exercise as CardioExercise).km = this.exerciseForm.get('specifics').get('km').value;
        break;
      case ExerciseGroupTypeEnum.TrainingExercise:
        (exercise as CardioExercise).km = this.exerciseForm.get('specifics').get('km').value;
        break;
      case ExerciseGroupTypeEnum.OrganizedExercise:
        (exercise as CardioExercise).difficulty =
          this.difficultyConverter.getEnumFromName(this.exerciseForm.get('specifics').get('difficulty').value);
        break;
    }
  }
}

export interface ExerciseFormConfigurable {
  title: string;
  exercise: AbstractExercise;
  mode: ExerciseOpenMode;
}
