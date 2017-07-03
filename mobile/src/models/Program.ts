import { AbstractExercise } from "./exercise/AbstractExercise";
import { ExerciseFactory } from "./exercise/ExerciseFactory";
import { ExerciseGroupTypeEnum } from "../enums/ExerciseGroupTypeEnum";
import { Session } from "./Session";
import { SessionService } from "../providers/sessions";
import { Injectable } from "@angular/core";

export class Program {
  level: number = null;
  objective: string;
  //exercisesGroups: Map<string, AbstractExercise[]>;
  sessions: Session[];
  isActive: boolean;
  createdAt: Date;

  constructor() {
    // this.exercisesGroups = new Map<string, AbstractExercise[]>();
    this.sessions = [];
  }


  // public initFromRawObject(rawInitObject: any) {
  //   if (rawInitObject.level === undefined || rawInitObject.level === null) {
  //     throw new Error('Level is not defined in raw json.');
  //   }
  //   if (!rawInitObject.exercisesGroup) {
  //     throw new Error('exercises is not defined in raw json.');
  //   }
  //   this.level = rawInitObject.level;
  //   let rawExercisesByCurrentGroup = [];
  //   this.objective = rawInitObject.objective;
  //   this.createdAt = new Date(rawInitObject.createdAt);
  //
  //   for (let groupKey in rawInitObject.exercisesGroup) {
  //     this.exercisesGroups.set(groupKey, []);
  //     rawExercisesByCurrentGroup = rawInitObject.exercisesGroup[groupKey];
  //
  //     rawExercisesByCurrentGroup.forEach((rawExercise) => {
  //       this.exercisesGroups.get(groupKey).push(ExerciseFactory.create(rawExercise.type, rawExercise));
  //     });
  //   }
  //   return this;
  // }

  //
  // public initFromRawServerObject(rawProgramFromServer: any) {
  //   /*if (rawInitObject.level === undefined || rawInitObject.level === null) {
  //    throw new Error('Level is not defined in raw json.');
  //    }*/
  //   if (!rawProgramFromServer.sessions || !Array.isArray(rawProgramFromServer.sessions)) {
  //     throw new Error('sessions is not defined in raw json.');
  //   }
  //
  //   //todo Fix this hardcode by getting value from server
  //   this.level = 0;
  //   this.objective = rawProgramFromServer.objective;
  //   this.createdAt = new Date(rawProgramFromServer.createdAt);
  //   const exercisesGroup: any = this.filterExercisesByTypeFrom(rawProgramFromServer.sessions);
  //   this.exercisesGroups = this.createExercisesFrom(exercisesGroup);
  //   this.sessions = this.fromRawSessionsToSessions(rawProgramFromServer.sessions);
  //   return this;
  // }


  public static of(): ProgramBuilder {
    return new ProgramBuilder()
  }
}

class ProgramBuilder {
  private me: Program;

  constructor() {
    this.me = new Program();
  }

  level(level: number): ProgramBuilder {
    this.me.level = level;
    return this;
  }

  objective(objective: string): ProgramBuilder {
    this.me.objective = objective;
    return this;
  }

  sessions(sessions: Session[]): ProgramBuilder {
    this.me.sessions = sessions;
    return this;
  }

  sessionsFromRaw(objects: any[]): ProgramBuilder {
    let session = null;
    objects.forEach(rawSession => {
      session = Session.of()
        .objective(rawSession.objective)
        .exercisesGroupsFromRaw(rawSession.exercisesGroups)
        .needTraining(rawSession.training)
        .doneCounter(rawSession.doneCounter)
        .createdAt(rawSession.createdAt)
        .mainMusclesGroup(rawSession.mainMusclesGroup)
        .build();
      this.me.sessions.push(session);
    });
    return this;
  }

  sessionsFromServer(rawSessions: any[]): ProgramBuilder {
    let session = null;
    rawSessions.forEach(rawSession => {
      session = Session.of()
        .objective(rawSession.objective)
        .exercisesGroupsFromServer(rawSession.exercises)
        .needTraining(rawSession.training)
        .doneCounter(rawSession.doneCounter)
        .createdAt(rawSession.createdAt)
        .mainMusclesGroup(rawSession.mainMusclesGroup)
        .build();
      this.me.sessions.push(session);
    });
    return this;
  }

  createdAt(createdAt: Date): ProgramBuilder {
    if (typeof createdAt === 'string') {
      this.me.createdAt = new Date(createdAt);
    } else {
      this.me.createdAt = createdAt;
    }

    return this;
  }

  build(): Program {
    return this.me;
  }
}