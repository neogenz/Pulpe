import {AbstractExercise} from "./exercise/AbstractExercise";
import {ExerciseFactory} from "./exercise/ExerciseFactory";
import {ExerciseGroupTypeEnum} from "../_enums/ExerciseGroupTypeEnum";
import {SessionsService} from "../sessions/sessions.service";
import {ExerciseGroupCodeConverter} from "../shared/ExerciseGroupCodeConverter";

export class Session {
  objective: string;
  exercisesGroups: Map<string, AbstractExercise[]>;
  createdAt: Date;
  mainMusclesGroup: string[];
  doneCounter: boolean;
  needTraining: boolean;


  constructor() {
    this.exercisesGroups = new Map<string, AbstractExercise[]>();
    this.mainMusclesGroup = [];
  }

  public static of() {
    return new SessionBuilder();
  }

  public getNbExercises(): number {
    let totalLength = 0;
    this.exercisesGroups.forEach((exercisesForCurrentGroup: AbstractExercise[]) => {
      totalLength += exercisesForCurrentGroup.length;
    });
    return totalLength;
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

  exercisesGroups(exercisesGroups: Map<string, AbstractExercise[]>): SessionBuilder {
    this.me.exercisesGroups = exercisesGroups;
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

  doneCounter(doneCounter: boolean): SessionBuilder {
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