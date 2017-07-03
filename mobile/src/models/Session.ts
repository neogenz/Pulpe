import { AbstractExercise } from "./exercise/AbstractExercise";
import { ExerciseGroupCodeConverter } from "../shared/converters/ExerciseGroupCodeConverter";
import { ExercisesGroup } from "./exercise/ExercisesGroup";
import { ExerciseFactory } from "./exercise/ExerciseFactory";

//todo refacto to enum for objective and musclegroup ?
export class Session {
  objective: string;
  exercisesGroups: ExercisesGroup[];
  createdAt: Date;
  mainMusclesGroup: string[];
  doneCounter: number;
  needTraining: boolean;


  constructor() {
    this.exercisesGroups = [];
    this.mainMusclesGroup = [];
  }

  public static of() {
    return new SessionBuilder();
  }

  public getNbExercises(): number {
    let totalLength = 0;
    this.exercisesGroups.forEach((group: ExercisesGroup) => {
      totalLength += group.exercises.length;
    });
    return totalLength;
  }

  public getExercisesByType(typeOfExercises: string): AbstractExercise[] {
    for (let i = 0; i < this.exercisesGroups.length; i++) {
      if (this.exercisesGroups[i].groupType === typeOfExercises) {
        return this.exercisesGroups[i].exercises;
      }
    }
  }

  public getExercises(): AbstractExercise[] {
    let exercises: AbstractExercise[] = [];
    this.exercisesGroups.forEach(eg => {
      exercises = eg.exercises.concat(exercises);
    });
    return exercises;
  }
}

class SessionBuilder {
  private me: Session;

  constructor() {
    this.me = new Session();
  }

  objective(objective: string): SessionBuilder {
    this.me.objective = objective;
    return this;
  }

  exercisesGroups(exercisesGroups: ExercisesGroup[]): SessionBuilder {
    this.me.exercisesGroups = exercisesGroups;
    return this;
  }

  exercisesGroupsFromRaw(objects: any[]): SessionBuilder {
    let exercises: AbstractExercise[] = [];
    objects.forEach(rawExercisesGroup => {
      exercises = [];
      rawExercisesGroup.exercises.forEach(exercise => {
        exercises.push(ExerciseFactory.create(exercise.type, exercise));
      });
      this.me.exercisesGroups.push(new ExercisesGroup(rawExercisesGroup.groupType, exercises));
    });
    return this;
  }

  exercisesGroupsFromServer(rawExercises: Object[]): SessionBuilder {
    this.me.exercisesGroups = ExerciseGroupCodeConverter.createExercisesGroupsFrom(rawExercises);
    return this;
  }

  createdAt(createdAt: Date): SessionBuilder {
    if (typeof createdAt === 'string') {
      this.me.createdAt = new Date(createdAt);
    } else {
      this.me.createdAt = createdAt;
    }
    return this;
  }

  mainMusclesGroup(mainMusclesGroup: string[]): SessionBuilder {
    this.me.mainMusclesGroup = mainMusclesGroup;
    return this;
  }

  doneCounter(doneCounter: number): SessionBuilder {
    this.me.doneCounter = doneCounter;
    return this;
  }

  needTraining(needTraining: boolean): SessionBuilder {
    this.me.needTraining = needTraining;
    return this;
  }

  build(): Session {
    return this.me;
  }
}