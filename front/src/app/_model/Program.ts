import { AbstractExercise } from "./exercise/AbstractExercise";
import { ExerciseFactory } from "./exercise/ExerciseFactory";
import { ExerciseGroupTypeEnum } from "../_enums/ExerciseGroupTypeEnum";
import { Session } from "./Session";
import { SessionsService } from "../member/sessions/sessions.service";
import { Injectable } from "@angular/core";
import { ExercisesGroup } from "./exercise/ExercisesGroup";

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

  public findSessionOfThisExercise(exercise: AbstractExercise): Session {
    
    let matchExerciseSession: any = (session: Session) => {
      for (let i = 0; i < session.exercisesGroups.length; i++) {
        if (session.exercisesGroups[i].haveThis(exercise)) {
          return session;
        }
      }
      return null;
    };

    let session = this.sessions.find(matchExerciseSession);

    return session;
  }

  public addOrReplaceExerciseInThis(session: Session, exercise: AbstractExercise): Session {
    if(this.haveThis(exercise)){
      this.refreshOrderOfExercisesToUpdateInSession(session, exercise);
    }else{
      this.refreshOrderOfExercisesToAddInSession(session, exercise);
    }
    for (let i = 0; i < this.sessions.length; i++) {
      if (this.sessions[i].id === session.id) {
        this.sessions[i].addOrReplaceOne(exercise);
        return this.sessions[i];
      }
    }
    throw new Error(`The session focused (${session.id}) isn\'t present in the program`);
  }

  private refreshOrderOfExercisesToAddInSession(session:Session, exercise:AbstractExercise){
    session.refreshOrderOfExercisesToAddOne(exercise);
	}

  private refreshOrderOfExercisesToUpdateInSession(session:Session, exercise:AbstractExercise){
    session.refreshOrderOfExercisesToUpdateOne(exercise);
  }

  public removeExerciseInThis(session: Session, exercise: AbstractExercise) {
    for (let i = 0; i < this.sessions.length; i++) {
      if (this.sessions[i].id === session.id) {
        return this.sessions[i].removeOne(exercise);
      }
    }
    throw new Error(`The session focused (${session.id}) isn\'t present in the program`);
  }

  public haveThis(exercise:AbstractExercise):boolean{
    for(let i =0;i<this.sessions.length;i++){
      if(this.sessions[i].haveThis(exercise)){
        return true;
      }
    }
    return false;
  }

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
        .id(rawSession._id)
        .objective(rawSession.objective)
        .exercisesGroupsFromRaw(rawSession.exercisesGroups)
        .needTraining(rawSession.training)
        .doneCounter(rawSession.doneCounter)
        .createdAt(rawSession.createdAt)
        .mainMusclesGroup(rawSession.mainMusclesGroup)
        .dayInWeek(rawSession.dayInWeek)
        .build();
      this.me.sessions.push(session);
    });
    return this;
  }

  sessionsFromServer(rawSessions: any[]): ProgramBuilder {
    let session = null;
    rawSessions.forEach(rawSession => {
      session = Session.of()
        .id(rawSession._id)
        .objective(rawSession.objective)
        .exercisesGroupsFromServer(rawSession.exercises)
        .needTraining(rawSession.training)
        .doneCounter(rawSession.doneCounter)
        .createdAt(rawSession.createdAt)
        .mainMusclesGroup(rawSession.mainMusclesGroup)
        .dayInWeek(rawSession.dayInWeek)
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