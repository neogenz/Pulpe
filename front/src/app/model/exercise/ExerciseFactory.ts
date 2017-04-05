import {StretchingExercise} from "./StretchingExercise";
import {CardioExercise} from "./CardioExercise";
import {AbstractExercise} from "./AbstractExercise";
import {MassGainerExercise} from "./MassGainerExercise";
import {OrganizedExercise} from "./OrganizedExercise";

export class ExerciseFactory {

  public static create(type:string, initObject:any):AbstractExercise {
    switch (type) {
      case 'CD':
        return new CardioExercise(initObject.id, initObject.name, initObject.machines).initFromRawObject(initObject);
      case 'MG':
        return new MassGainerExercise(initObject.id, initObject.name, initObject.machines).initFromRawObject(initObject);
      case 'ST':
        return new StretchingExercise(initObject.id, initObject.name, initObject.machines).initFromRawObject(initObject);
      case 'OG':
        return new OrganizedExercise(initObject.id, initObject.name, initObject.machines).initFromRawObject(initObject);
    }

    return null;
  }
}