export interface IExerciseExecutableComponent {
  terminate(): void;
}

export interface IBodybuildingExerciseExecutableComponent extends IExerciseExecutableComponent {
  startNextSerie(): void;
  terminateCurrentSerie(): void;
}

export interface ICardioExerciseExecutableComponent extends IExerciseExecutableComponent {
  startNextTime(): void;
  terminateCurrentTime(): void;
}

export interface IOrganizedExerciseExecutableComponent extends IExerciseExecutableComponent {

}