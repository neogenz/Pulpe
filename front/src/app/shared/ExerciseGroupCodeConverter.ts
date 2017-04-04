import {AbstractExercise} from "../model/exercise/AbstractExercise";

/**
 * Class used to convert raw exercises group code to label
 */
export class ExerciseGroupCodeConverter {

  private exerciseGroupLabelConverter = new Map<string,string>();

  constructor() {
    this.exerciseGroupLabelConverter.set('TR', 'Échauffement');
    this.exerciseGroupLabelConverter.set('ST', 'Étirements');
    this.exerciseGroupLabelConverter.set('MU', 'Musculation');
    this.exerciseGroupLabelConverter.set('CD', 'Cardio');
    this.exerciseGroupLabelConverter.set('RC', 'Récupération');
    this.exerciseGroupLabelConverter.set('MU', 'Musculation');
    this.exerciseGroupLabelConverter.set('AB', 'Abdominaux');
    this.exerciseGroupLabelConverter.set('OG', 'Organisé');
  }

  public convertThis(exercisesGroup:Map<string, AbstractExercise[]>):ExerciseGroupCode[] {
    let exercisesGroupLabel:ExerciseGroupCode[] = [];

    exercisesGroup.forEach((exercises:AbstractExercise[], exersiseGroupLabel:string) => {
      if (!this.exerciseGroupLabelConverter.has(exersiseGroupLabel)) {
        throw new Error('No label finded for this exercise group label' + exersiseGroupLabel);
      }
      exercisesGroupLabel.push(new ExerciseGroupCode(exersiseGroupLabel, this.exerciseGroupLabelConverter.get(exersiseGroupLabel)));
    });

    return exercisesGroupLabel;
  }

  public getLabelOfThis(rawExerciseGroupCode: string){
    return this.exerciseGroupLabelConverter.get(rawExerciseGroupCode);
  }
}

export class ExerciseGroupCode {
  public rawCode:string;
  public label:string;

  constructor(rawCode:string, label:string) {
    this.rawCode = rawCode;
    this.label = label;
  }
}
