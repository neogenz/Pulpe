import {ColorConfiguration} from "../program/ColorConfiguration";
import {ExerciseGroupCodeConverter} from "./ExerciseGroupCodeConverter";

export class ChartConfigurationData {
  public label:string;
  public colors:ColorConfiguration;

  constructor(label:string, colors:ColorConfiguration) {
    this.label = label;
    this.colors = colors;
  }
}

export class ChartConfiguration {
  public configurations:Map<string, ChartConfigurationData>;
  public static instance = new ChartConfiguration();
  private exerciseGroupCodeConverter = new ExerciseGroupCodeConverter();

  private constructor() {
    this.configurations = new Map<string, any>();
    this.configurations.set('TR', new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis('TR'),
      new ColorConfiguration('rgba(255,99,132,0.4)', 'rgba(255,99,132,1)')));

    this.configurations.set('MU', new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis('MU'),
      new ColorConfiguration('rgba(255,87,34,0.4)', 'rgba(255,87,34,1)')));

    this.configurations.set('ST', new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis('ST'),
      new ColorConfiguration('rgba(118,255,3,0.4)', 'rgba(118,255,3,1)')));

    this.configurations.set('RC', new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis('RC'),
      new ColorConfiguration('rgba(29,233,182,0.4)', 'rgba(29,233,182,1)')));

    this.configurations.set('CD', new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis('CD'),
      new ColorConfiguration('rgba(213,0,249,0.4)', 'rgba(213,0,249,1)')));

    this.configurations.set('AB', new ChartConfigurationData(
      this.exerciseGroupCodeConverter.getLabelOfThis('AB'),
      new ColorConfiguration('rgba(255,234,0,0.4)', 'rgba(255,234,0,1)')));
  }


  public static getInstance():ChartConfiguration {
    if (!this.instance) {
      this.instance = new ChartConfiguration();
    }
    return this.instance;
  }
}

//export const ChartConfiguration = {
//  echauffement: {
//    label: 'Échauffement',
//    colors: new ColorConfiguration('rgba(255,99,132,0.4)', 'rgba(255,99,132,1)'),
//    backgroundColor: this.colors.background,
//  },
//  musculation: {
//    label: 'Musculation',
//    colors: new ColorConfiguration('rgba(255,87,34,0.4)', 'rgba(255,87,34,1)')
//  },
//  abdominaux: {
//    label: 'Abdominaux',
//    colors: new ColorConfiguration('rgba(255,234,0,0.4)', 'rgba(255,234,0,1)')
//  },
//  etirements: {
//    label: 'Étirements',
//    colors: new ColorConfiguration('rgba(118,255,3,0.4)', 'rgba(118,255,3,1)')
//  },
//  cardio: {
//    label: 'Cardio',
//    colors: new ColorConfiguration('rgba(213,0,249,0.4)', 'rgba(213,0,249,1)')
//  },
//  recuperation: {
//    label: 'Récupération',
//    colors: new ColorConfiguration('rgba(29,233,182,0.4)', 'rgba(29,233,182,1)')
//  }
//};