import {AbstractExercise} from "../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../_enums/ExerciseGroupTypeEnum";

/**
 * Class used to convert raw exercises group code to label
 */
export class ExerciseGroupCodeConverter {

  private exerciseGroupLabelConverter = new Map<string,string>();

  constructor() {
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.TrainingExercise], 'Échauffement');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.StretchingExercise], 'Étirements');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.CardioExercise], 'Cardio');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.RecuperationExercise], 'Récupération');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise], 'Musculation');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.AbdominusExercise], 'Abdominaux');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise], 'Cours organisés');
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
