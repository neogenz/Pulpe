import {StretchingExercise} from "./StretchingExercise";
import {CardioExercise} from "./CardioExercise";
import {AbstractExercise} from "./AbstractExercise";
import {BodybuildingExercise} from "./BodybuildingExercise";
import {OrganizedExercise} from "./OrganizedExercise";
import {ExerciseGroupTypeEnum} from "../../enums/ExerciseGroupTypeEnum";
import {TrainingExercise} from "./TrainingExercise";

export class ExerciseFactory {

  /**
   *
   * @param {string|ExerciseGroupTypeEnum} type If it's string, she's must be represent name of ExerciseGroupTypeEnum
   * @param {any} initObject
   * @returns {AbstractExercise}
   */
  public static create(type: string | ExerciseGroupTypeEnum, initObject: any): AbstractExercise {
    let exercise: AbstractExercise;
    switch (type) {
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.CardioExercise]:
      case ExerciseGroupTypeEnum.CardioExercise:
        exercise = new CardioExercise(initObject.id ? initObject.id : initObject._id, initObject.name, initObject.machines, initObject.order);
        break;
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise]:
      case ExerciseGroupTypeEnum.BodybuildingExercise:
        exercise = new BodybuildingExercise(initObject.id ? initObject.id : initObject._id, initObject.name, initObject.machines, initObject.order);
        break;
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.StretchingExercise]:
      case ExerciseGroupTypeEnum.StretchingExercise:
        exercise = new StretchingExercise(initObject.id ? initObject.id : initObject._id, initObject.name, initObject.machines, initObject.order);
        break;
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise]:
      case ExerciseGroupTypeEnum.OrganizedExercise:
        exercise = new OrganizedExercise(initObject.id ? initObject.id : initObject._id, initObject.name, initObject.machines, initObject.order);
        break;
      case ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.TrainingExercise]:
      case ExerciseGroupTypeEnum.TrainingExercise:
        exercise = new TrainingExercise(initObject.id ? initObject.id : initObject._id, initObject.name, initObject.machines, initObject.order);
        break;
      default:
        throw new Error(`The type ${type} is unknown.`);
    }
    exercise.initFromRawObject(initObject);
    exercise.approximateTime = exercise.calculApproximateTime();
    return exercise;
  }
}