import {AbstractExercise} from "../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../_enums/ExerciseGroupTypeEnum";
import {ExerciseFactory} from "../_model/exercise/ExerciseFactory";
import {Injectable} from "@angular/core";

/**
 * Class used to convert raw exercises group code to label
 */
@Injectable()
export class ExerciseGroupCodeConverter {

  private exerciseGroupLabelConverter = new Map<string, string>();

  constructor() {
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.TrainingExercise], 'Échauffement');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.StretchingExercise], 'Étirements');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.CardioExercise], 'Cardio');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.RecuperationExercise], 'Récupération');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise], 'Musculation');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.AbdominusExercise], 'Abdominaux');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise], 'Cours organisés');
    this.exerciseGroupLabelConverter.entries()
  }


  /**
   * Convert raw exercises group code to human readable label
   * @param exercisesGroup
   * @returns {ExerciseGroupCode[]}
   */
  public convertThis(exercisesGroup: Map<string, AbstractExercise[]>): ExerciseGroupCode[] {
    let exercisesGroupLabel: ExerciseGroupCode[] = [];

    exercisesGroup.forEach((exercises: AbstractExercise[], exersiseGroupLabel: string) => {
      if (!this.exerciseGroupLabelConverter.has(exersiseGroupLabel)) {
        throw new Error('No label finded for this exercise group label' + exersiseGroupLabel);
      }
      exercisesGroupLabel.push(new ExerciseGroupCode(exersiseGroupLabel, this.exerciseGroupLabelConverter.get(exersiseGroupLabel)));
    });

    return exercisesGroupLabel;
  }

  public getLabelOfThis(rawExerciseGroupCode: string) {
    Array.from(this.exerciseGroupLabelConverter.values());
    return this.exerciseGroupLabelConverter.get(rawExerciseGroupCode);
  }

  public static createExercisesGroupsFrom(rawExecises: any[]): Map<string, AbstractExercise[]> {
    let exercises: Map<string, AbstractExercise[]> = new Map<string, AbstractExercise[]>();
    let groupTypeEnumValue = '';
    let groupTypeLabel = '';
    rawExecises.forEach(rawExercise => {
      groupTypeEnumValue = ExerciseGroupTypeEnum[rawExercise.__t];
      groupTypeLabel = ExerciseGroupTypeEnum[groupTypeEnumValue];
      if (!exercises.has(groupTypeLabel)) {
        exercises.set(groupTypeLabel, []);
      }
      exercises.get(groupTypeLabel).push(ExerciseFactory.create(groupTypeLabel, rawExercise));
    });
    return exercises;
  }
}

export class ExerciseGroupCode {
  public rawCode: string;
  public label: string;

  constructor(rawCode: string, label: string) {
    this.rawCode = rawCode;
    this.label = label;
  }
}
