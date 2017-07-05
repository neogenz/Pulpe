import {Component, Input, OnInit} from '@angular/core';
import {AbstractExercise} from "../../../_model/exercise/AbstractExercise";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {FormBuilder, FormGroup} from "@angular/forms";
import {SpecificExercisePropertiesFormBuilderService} from "./specific-exercise-properties-form-builder.service";
import {ExerciseGroupTypeEnum} from "../../../_enums/ExerciseGroupTypeEnum";
import {DifficultyConverter} from "../../../shared/DifficultyConverter";
import {ExerciseService} from "../../../coach/exercises/exercise.service";
import {BodybuildingExercise} from "../../../_model/exercise/BodybuildingExercise";
import {CardioExercise} from "../../../_model/exercise/CardioExercise";
import {OrganizedExercise} from "../../../_model/exercise/OrganizedExercise";
import {TrainingExercise} from "../../../_model/exercise/TrainingExercise";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {ExerciseFactory} from "../../../_model/exercise/ExerciseFactory";

@Component({
  selector: 'pulpe-exercise-specific-properties-form-dialog',
  templateUrl: './exercise-specific-properties-form-dialog.component.html',
  styleUrls: ['./exercise-specific-properties-form-dialog.component.scss']
})
export class ExerciseSpecificPropertiesFormDialogComponent extends DialogComponent<ExerciseFormConfigurable, AbstractExercise> implements OnInit {
  exerciseSaveRequest: Observable<AbstractExercise>;
  exercise: AbstractExercise;
  title: string;
  exerciseForm: FormGroup;
  public ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;
  public difficultyLabels: string[];

  constructor(public dialogService: DialogService,
              private fb: FormBuilder,
              private specificExerciseFormBuilderService: SpecificExercisePropertiesFormBuilderService,
              private difficultyConverter: DifficultyConverter,
              private slimLoadingBarService: SlimLoadingBarService,
              private toastrService: ToastrService,
              private exerciseService: ExerciseService) {
    super(dialogService);
  }

  ngOnInit() {
    this.difficultyLabels = this.difficultyConverter.getLabelsArray();
    this._buildForm();
  }

  private _buildForm() {
    this.exerciseForm = this.fb.group({
      specifics: this.specificExerciseFormBuilderService.getFormGroupByExercise(this.exercise)
    });
  }

  confirm(): void {
    let exerciseCopy = ExerciseFactory.create(this.exercise.type, this.exercise);
    this._setSpecificFieldsOn(exerciseCopy);
    this.exerciseSaveRequest = this.exerciseService.updateOneOfMember(exerciseCopy);
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
    let exerciseUpdated = null;
    switch (exercise.type) {
      case ExerciseGroupTypeEnum.BodybuildingExercise:
        exerciseUpdated = (exercise as BodybuildingExercise);
        exerciseUpdated.weight = this.exerciseForm.get('specifics').get('weight').value;
        exerciseUpdated.series = this.exerciseForm.get('specifics').get('series').value;
        exerciseUpdated.repetitions = this.exerciseForm.get('specifics').get('repetitions').value;
        exerciseUpdated.recoveryBetweenEachSeries = this.exerciseForm.get('specifics').get('recoveryBetweenEachSeries').value;
        break;
      case ExerciseGroupTypeEnum.CardioExercise:
        exerciseUpdated = (exercise as CardioExercise);
        exerciseUpdated.speed = this.exerciseForm.get('specifics').get('speed').value;
        exerciseUpdated.times = []
        let nbOfTimes = this.exerciseForm.get('specifics').get('numberOfTimes').value;
        let time = this.exerciseForm.get('specifics').get('times').value;
        if(Array.isArray(time)){
          time = time[0];
        }
        for(let i = 0; i < nbOfTimes; i++){
          exerciseUpdated.times.push(time);
        }
        break;
      case ExerciseGroupTypeEnum.TrainingExercise:
        exerciseUpdated = (exercise as TrainingExercise);
        exerciseUpdated.speed = this.exerciseForm.get('specifics').get('speed').value;
        exerciseUpdated.times = this.exerciseForm.get('specifics').get('times').value;
        break;
      case ExerciseGroupTypeEnum.OrganizedExercise:
        exerciseUpdated = (exercise as OrganizedExercise);
        exerciseUpdated.difficulty = this.difficultyConverter.getEnumFromLabel(this.exerciseForm.get('specifics').get('difficulty').value);
        exerciseUpdated.approximateTime = this.exerciseForm.get('specifics').get('approximateTime').value;
        break;
    }
  }
}

export interface ExerciseFormConfigurable {
  title: string;
  exercise: AbstractExercise;
}
