import { AbstractExercise } from "../../models/exercise/AbstractExercise";
import { ExerciseGroupTypeEnum } from "../../enums/ExerciseGroupTypeEnum";
import { ExerciseFactory } from "../../models/exercise/ExerciseFactory";
import { Injectable } from "@angular/core";
import { ExercisesGroup } from "../../models/exercise/ExercisesGroup";

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
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise], 'Musculation');
    this.exerciseGroupLabelConverter.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise], 'Cours organisés');
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

  public getLabelArray(): string[] {
    return Array.from(this.exerciseGroupLabelConverter.values());
  }

  /**
   *
   * @param rawExerciseGroupCode
   * @returns {undefined|string}
   */
  public getLabelOfThis(rawExerciseGroupCode: string): string {
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

  public getExerciseGroupLabelConverter(): Map<string, string> {
    return this.exerciseGroupLabelConverter;
  }

  public getEnumFrom(labelToFind: string): ExerciseGroupTypeEnum {
    let nameLabelArray: Array<Array<string>> = Array.from(this.exerciseGroupLabelConverter.entries());
    let name: string;
    let label: string;
    for (let i = 0; i < nameLabelArray.length; i++) {
      name = nameLabelArray[i][0];
      label = nameLabelArray[i][1];
      if (label === labelToFind) {
        return ExerciseGroupTypeEnum[name];
      }
    }
    throw new Error(`This label => ${labelToFind} not find on ExerciseGroupTypeEnum`);
  }

  public toExerciseGroupCodeArray(): ExerciseGroupCode[] {
    let exercisesGroupCodes = [];
    let exerciseGroupCode: ExerciseGroupCode = null;
    this.exerciseGroupLabelConverter.forEach((label, name) => {
      exerciseGroupCode = new ExerciseGroupCode(name, label);
      exerciseGroupCode.enumValue = ExerciseGroupTypeEnum[exerciseGroupCode.rawCode];
      exercisesGroupCodes.push(exerciseGroupCode);
    });
    return exercisesGroupCodes;
  }
}

export class ExerciseGroupCode {
  public rawCode: string;
  public enumValue: ExerciseGroupTypeEnum;
  public label: string;

  constructor(rawCode: string, label: string) {
    this.rawCode = rawCode;
    this.label = label;
  }
}
