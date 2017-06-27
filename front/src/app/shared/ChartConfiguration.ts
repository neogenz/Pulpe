import {ColorConfiguration} from "../member/program/ColorConfiguration";
import {ExerciseGroupCodeConverter} from "./ExerciseGroupCodeConverter";
import {ExerciseGroupTypeEnum} from "../_enums/ExerciseGroupTypeEnum";

export class ChartConfigurationData {
  public label: string;
  public colors: ColorConfiguration;

  constructor(label: string, colors: ColorConfiguration) {
    this.label = label;
    this.colors = colors;
  }
}

export class ChartConfiguration {
  public configurations: Map<string, ChartConfigurationData>;
  public static instance = new ChartConfiguration();
  private exerciseGroupCodeConverter = new ExerciseGroupCodeConverter();

  private constructor() {
    this.configurations = new Map<string, any>();
    this.configurations.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.TrainingExercise], new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.TrainingExercise]),
      new ColorConfiguration('rgba(255,99,132,0.4)', 'rgba(255,99,132,1)')));

    this.configurations.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise], new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.BodybuildingExercise]),
      new ColorConfiguration('rgba(255,87,34,0.4)', 'rgba(255,87,34,1)')));

    this.configurations.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.StretchingExercise], new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.StretchingExercise]),
      new ColorConfiguration('rgba(118,255,3,0.4)', 'rgba(118,255,3,1)')));

    this.configurations.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.CardioExercise], new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.CardioExercise]),
      new ColorConfiguration('rgba(213,0,249,0.4)', 'rgba(213,0,249,1)')));

    this.configurations.set(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise], new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis(ExerciseGroupTypeEnum[ExerciseGroupTypeEnum.OrganizedExercise]),
      new ColorConfiguration('rgba(255,234,0,0.4)', 'rgba(255,234,0,1)')));
  }


  public static getInstance(): ChartConfiguration {
    if (!this.instance) {
      this.instance = new ChartConfiguration();
    }
    return this.instance;
  }
}