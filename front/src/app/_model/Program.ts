import {AbstractExercise} from "./exercise/AbstractExercise";
import {ExerciseFactory} from "./exercise/ExerciseFactory";
import {ExerciseGroupTypeEnum} from "../_enums/ExerciseGroupTypeEnum";

export class Program {
  level: number = null;
  objective: string;
  exercises: Map<string, AbstractExercise[]>;
  createdAt: Date;

  constructor() {
    this.exercises = new Map<string, AbstractExercise[]>();
  }


  public initFromRawObject(rawInitObject: any) {
    if (rawInitObject.level === undefined || rawInitObject.level === null) {
      throw new Error('Level is not defined in raw json.');
    }
    if (!rawInitObject.exercisesGroup) {
      throw new Error('exercises is not defined in raw json.');
    }
    this.level = rawInitObject.level;
    let rawExercisesByCurrentGroup = [];
    this.objective = rawInitObject.objective;
    this.createdAt = new Date(rawInitObject.createdAt);

    for (let groupKey in rawInitObject.exercisesGroup) {
      this.exercises.set(groupKey, []);
      rawExercisesByCurrentGroup = rawInitObject.exercisesGroup[groupKey];

      rawExercisesByCurrentGroup.forEach((rawExercise) => {
        this.exercises.get(groupKey).push(ExerciseFactory.create(rawExercise.type, rawExercise));
      });
    }
    return this;
  }


  public initFromRawServerObject(rawProgramFromServer: any) {
    /*if (rawInitObject.level === undefined || rawInitObject.level === null) {
     throw new Error('Level is not defined in raw json.');
     }*/
    if (!rawProgramFromServer.sessions || !Array.isArray(rawProgramFromServer.sessions)) {
      throw new Error('sessions is not defined in raw json.');
    }

    //todo Fix this hardcode by getting value from server
    this.level = 0;
    this.objective = rawProgramFromServer.objective;
    this.createdAt = new Date(rawProgramFromServer.createdAt);
    const exercisesGroup: any = this.filterExercisesByType(rawProgramFromServer.sessions);
    this.exercises = this.createExercisesFrom(exercisesGroup);
    return this;
  }

  /**
   * Filter all exercises of all sessions by exercises
   * @param sessions
   */
  private filterExercisesByType(sessions): any {
    let exercisesGrouped = {};
    let enumValue: any = null;
    // const objValues = Object.keys(ExerciseGroupTypeEnum).map(k => ExerciseGroupTypeEnum[k]);
    // const names = objValues.filter(v => typeof v === "string") as string[];
    sessions.forEach(session => {
      session.exercises.forEach(exercise => {
        enumValue = ExerciseGroupTypeEnum[exercise.__t];
        if (!Array.isArray(exercisesGrouped[ExerciseGroupTypeEnum[enumValue]])) {
          exercisesGrouped[ExerciseGroupTypeEnum[enumValue]] = [];
        }
        exercisesGrouped[ExerciseGroupTypeEnum[enumValue]].push(exercise);
      });
    });
    return exercisesGrouped;
  }


  private createExercisesFrom(exercisesGroup: any): Map<string, AbstractExercise[]> {
    let exercises: Map<string, AbstractExercise[]> = new Map<string, AbstractExercise[]>();
    for (let groupKey in exercisesGroup) {
      exercises.set(groupKey, []);
      let rawExercisesByCurrentGroup = exercisesGroup[groupKey];
      rawExercisesByCurrentGroup.forEach((rawExercise) => {
        exercises.get(groupKey).push(ExerciseFactory.create(rawExercise.__t, rawExercise));
      });
    }
    return exercises;
  }


  public getNbExercises(): number {
    let totalLength = 0;
    this.exercises.forEach((exercisesForCurrentGroup: AbstractExercise[]) => {
      totalLength += exercisesForCurrentGroup.length;
    });
    return totalLength;
  }
}