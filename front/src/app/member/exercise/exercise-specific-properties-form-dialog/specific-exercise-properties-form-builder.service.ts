import {Injectable} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {OrganizedExercise} from "../../../_model/exercise/OrganizedExercise";
import {TrainingExercise} from "../../../_model/exercise/TrainingExercise";
import {CardioExercise} from "../../../_model/exercise/CardioExercise";
import {BodybuildingExercise} from "../../../_model/exercise/BodybuildingExercise";
import {ExerciseGroupTypeEnum} from "../../../_enums/ExerciseGroupTypeEnum";
import {DifficultyConverter} from "../../../shared/DifficultyConverter";
import {AbstractExercise} from "../../../_model/exercise/AbstractExercise";

@Injectable()
export class SpecificExercisePropertiesFormBuilderService {

  constructor(private fb: FormBuilder, private difficultyConverter: DifficultyConverter) {
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
      weight: this.fb.control(exercise.weight, [Validators.required, Validators.min(1), Validators.max(250)]),
      series: this.fb.control(exercise.series, [Validators.required, Validators.min(1), Validators.max(10)]),
      repetitions: this.fb.control(exercise.repetitions, [Validators.required, Validators.min(1), Validators.max(25)]),
      recoveryBetweenEachSeries: this.fb.control(exercise.recoveryTimesBetweenEachSeries, [Validators.required, Validators.min(0.30), Validators.max(4)])
    });
  }

  private _getFormGroupToCardioExerciseBy(exercise: CardioExercise): FormGroup {
    return this.fb.group({
      speed: this.fb.control(exercise.speed, [Validators.required, Validators.min(1), Validators.max(80)]),
      times: this.fb.control(exercise.times, [Validators.required, Validators.min(1), Validators.max(240)])
    });
  }

  private _getFormGroupToTrainingExerciseBy(exercise: TrainingExercise): FormGroup {
    return this.fb.group({
      speed: this.fb.control(exercise.speed, [Validators.required, Validators.min(1), Validators.max(80)]),
      times: this.fb.control(exercise.times, [Validators.required, Validators.min(1), Validators.max(240)])
    });
  }

  private _getFormGroupToOrganizedExerciseBy(exercise: OrganizedExercise): FormGroup {
    const difficulty: string = this.difficultyConverter.convertThisEnum(exercise.difficulty);
    return this.fb.group({
      difficulty: this.fb.control(difficulty, [Validators.required]),
      approximateTime: this.fb.control(exercise.approximateTime, [Validators.required, Validators.min(1), Validators.max(240)])
    });
  }

}
