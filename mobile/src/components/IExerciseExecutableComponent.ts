export interface IExerciseExecutableComponent {
  terminate(): void;
}

export interface IBodybuildingExerciseExecutableComponent extends IExerciseExecutableComponent {
  startNextSerie(): void;
  terminateCurrentSerie(): void;
}

export interface IOrganizedExerciseExecutableComponent extends IExerciseExecutableComponent {

}