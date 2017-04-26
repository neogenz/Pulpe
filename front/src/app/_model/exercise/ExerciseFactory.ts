import {StretchingExercise} from "./StretchingExercise";
import {CardioExercise} from "./CardioExercise";
import {AbstractExercise} from "./AbstractExercise";
import {MassGainerExercise} from "./MassGainerExercise";
import {OrganizedExercise} from "./OrganizedExercise";

export class ExerciseFactory {

  public static create(type:string, initObject:any):AbstractExercise {
    let exercise:AbstractExercise;
    switch (type) {
      case 'CD':
        exercise = new CardioExercise(initObject.id, initObject.name, initObject.machines).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
      case 'MG':
        exercise = new MassGainerExercise(initObject.id, initObject.name, initObject.machines).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
      case 'ST':
        exercise = new StretchingExercise(initObject.id, initObject.name, initObject.machines).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
      case 'OG':
        exercise = new OrganizedExercise(initObject.id, initObject.name, initObject.machines).initFromRawObject(initObject);
        exercise.approximateTime = exercise.calculApproximateTime();
        return exercise;
    }

    return null;
  }
}