import {Injectable} from '@angular/core';
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {BodybuildingExercise} from "../../_model/exercise/BodybuildingExercise";
import {TrainingExercise} from "../../_model/exercise/TrainingExercise";
import {CardioExercise} from "../../_model/exercise/CardioExercise";
import {OrganizedExercise} from "../../_model/exercise/OrganizedExercise";

@Injectable()
export class SpecificExerciseFormBuilderService {

  constructor(private fb: FormBuilder) {
  }

  public getFormGroupByExercise(exercise: AbstractExercise): FormGroup {
    switch (exercise.type) {
      case ExerciseGroupTypeEnum.BodybuildingExercise:
        return this._getFormGroupToBodybuildingExerciseBy(exercise as BodybuildingExercise);
      case ExerciseGroupTypeEnum.CardioExercise:
        return this._getFormGroupToCardioExerciseBy(exercise as CardioExercise);
      case ExerciseGroupTypeEnum.TrainingExercise:
        return this._getFormGroupToTrainingExerciseBy(exercise as TrainingExercise);
      case ExerciseGroupTypeEnum.OrganizedExercise:
        return this._getFormGroupToOrganizedExerciseBy(exercise as TrainingExercise);
    }
    return this.fb.group({});
  }

  private _getFormGroupToBodybuildingExerciseBy(exercise: BodybuildingExercise): FormGroup {
    return this.fb.group({
      weight: this.fb.control(exercise.weight >= 5 ? exercise.weight : null, [Validators.required, Validators.min(5), Validators.max(250)])
    });
  }

  private _getFormGroupToCardioExerciseBy(exercise: CardioExercise): FormGroup {
    return this.fb.group({
      km: this.fb.control(exercise.km >= 1 ? exercise.km : null, [Validators.required, Validators.min(1), Validators.max(80)])
    });
  }

  private _getFormGroupToTrainingExerciseBy(exercise: TrainingExercise): FormGroup {
    return this.fb.group({
      km: this.fb.control(exercise.km >= 1 ? exercise.km : null, [Validators.required, Validators.min(1), Validators.max(80)])
    });
  }

  private _getFormGroupToOrganizedExerciseBy(exercise: OrganizedExercise): FormGroup {
    return this.fb.group({
      difficulty: this.fb.control(exercise.difficulty, [Validators.required ])
    });
  }
}
