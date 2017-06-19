import {Component, OnInit, Input, AfterContentInit} from '@angular/core';
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";

@Component({
  selector: 'pulpe-exercise-preview',
  templateUrl: './exercise-preview.component.html',
  styleUrls: ['./exercise-preview.component.css']
})
export class ExercisePreviewComponent implements OnInit {

  public bodybuildingExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise].toString();
  public trainingExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.TrainingExercise].toString();
  public stretchingExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.StretchingExercise].toString();
  public cardioExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.CardioExercise].toString();
  public recuperationExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.RecuperationExercise].toString();
  public abdominusExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.AbdominusExercise].toString();
  public organizedExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise].toString();

  constructor() {
  }

  ngOnInit() {
  }


  @Input() exercise: AbstractExercise;
  @Input() exercisesGroupRawCode: string;
}
