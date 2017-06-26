import {AbstractExercise} from "../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../_enums/ExerciseGroupTypeEnum";
import {ExerciseFactory} from "../_model/exercise/ExerciseFactory";
import {Injectable} from "@angular/core";
import {ExercisesGroup} from "../_model/exercise/ExercisesGroup";

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
  public convertThis(exercisesGroups: ExercisesGroup[]): ExerciseGroupCode[] {
    let exercisesGroupLabel: ExerciseGroupCode[] = [];

    exercisesGroups.forEach(exercisesGroup => {
      if (!this.exerciseGroupLabelConverter.has(exercisesGroup.groupType)) {
        throw new Error('No label finded for this exercise group label' + exercisesGroup.groupType);
      }
      exercisesGroupLabel.push(new ExerciseGroupCode(exercisesGroup.groupType, this.exerciseGroupLabelConverter.get(exercisesGroup.groupType)));
    });

    return exercisesGroupLabel;
  }

  /**
   *
   * @param rawExerciseGroupCode
   * @returns {undefined|string}
   */
  public getLabelOfThis(rawExerciseGroupCode: string) {
    Array.from(this.exerciseGroupLabelConverter.values());
    return this.exerciseGroupLabelConverter.get(rawExerciseGroupCode);
  }

  /**
   *
   * @param rawExecises
   * @returns {ExercisesGroup[]}
   */
  public static createExercisesGroupsFrom(rawExecises: any[]): ExercisesGroup[] {
    let exercisesGroups: ExercisesGroup[] = [];
    let groupTypeEnumValue = '';
    let groupTypeLabel = '';
    let exercisesGroupAlreadyPresent: ExercisesGroup = null;
    rawExecises.forEach(rawExercise => {
      groupTypeEnumValue = ExerciseGroupTypeEnum[rawExercise.__t];
      groupTypeLabel = ExerciseGroupTypeEnum[groupTypeEnumValue];
      exercisesGroupAlreadyPresent = exercisesGroups.find(exercisesGroup => exercisesGroup.isGroupOf(groupTypeLabel));
      if (!exercisesGroupAlreadyPresent) {
        exercisesGroupAlreadyPresent = new ExercisesGroup(groupTypeLabel, []);
        exercisesGroups.push(exercisesGroupAlreadyPresent);
      }
      exercisesGroupAlreadyPresent.addOne(ExerciseFactory.create(groupTypeLabel, rawExercise));
    });
    return exercisesGroups;
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
