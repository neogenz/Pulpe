import {StretchingExercise} from "./StretchingExercise";
import {CardioExercise} from "./CardioExercise";
import {AbstractExercise} from "./AbstractExercise";
import {BodybuildingExercise} from "./BodybuildingExercise";
import {OrganizedExercise} from "./OrganizedExercise";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {TrainingExercise} from "./TrainingExercise";

export class ExerciseFactory {

  public static create(type: string, initObject: any): AbstractExercise {

    let exercise: AbstractExercise;
    switch (type) {
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.CardioExercise]:
        exercise = new CardioExercise(initObject.id, initObject.name, initObject.machines, initObject.__t).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise]:
        exercise = new BodybuildingExercise(initObject.id, initObject.name, initObject.machines, initObject.__t).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.StretchingExercise]:
        exercise = new StretchingExercise(initObject.id, initObject.name, initObject.machines, initObject.__t).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise]:
        exercise = new OrganizedExercise(initObject.id, initObject.name, initObject.machines, initObject.__t).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.TrainingExercise]:
        exercise = new TrainingExercise(initObject.id, initObject.name, initObject.machines, initObject.__t).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
    }
    throw new Error(`The type ${type} is unknown.`);
  }
}