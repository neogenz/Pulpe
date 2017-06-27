import {ExerciseGroupTypeEnum} from "../_enums/ExerciseGroupTypeEnum";
/**
 * Created by maximedesogus on 24/06/2017.
 */
export abstract class ExerciseGroupTypeFiltrable {
  public bodybuildingExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise].toString();
  public trainingExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.TrainingExercise].toString();
  public stretchingExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.StretchingExercise].toString();
  public cardioExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.CardioExercise].toString();
  public organizedExerciseEnumLabel: string = ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise].toString();
}

export interface ExerciseGroupTypeFiltrable{
  bodybuildingExerciseEnumLabel: string;
  trainingExerciseEnumLabel: string;
  stretchingExerciseEnumLabel: string;
  cardioExerciseEnumLabel: string;
  organizedExerciseEnumLabel: string;
}