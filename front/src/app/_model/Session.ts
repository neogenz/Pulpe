import { AbstractExercise } from "./exercise/AbstractExercise";
import { ExerciseGroupCodeConverter } from "../shared/ExerciseGroupCodeConverter";
import { ExercisesGroup } from "./exercise/ExercisesGroup";
import { ExerciseFactory } from "./exercise/ExerciseFactory";
import { ExerciseGroupTypeEnum } from "../_enums/ExerciseGroupTypeEnum";

//todo refacto to enum for objective and musclegroup ?
export class Session {
	id: string;
	objective: string;
	exercisesGroups: ExercisesGroup[];
	createdAt: Date;
	mainMusclesGroup: string[];
	doneCounter: number;
	needTraining: boolean;
	dayInWeek: string;


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

	public addOrReplaceOne(exercise: AbstractExercise): ExercisesGroup {
		for (let i = 0; i < this.exercisesGroups.length; i++) {
			if (this.exercisesGroups[i].groupType === ExerciseGroupTypeEnum[exercise.type]) {
				this.exercisesGroups[i].addOrReplaceOne(exercise);
				return this.exercisesGroups[i];
			}
		}
		this.exercisesGroups.push(new ExercisesGroup(ExerciseGroupTypeEnum[exercise.type], [exercise]));
	}

	public getAllExercises(): AbstractExercise[] {
		let exercises = [];
		this.exercisesGroups.forEach(eg => {
			exercises = exercises.concat(eg.exercises);
		});
		return exercises;
	}

	public removeOne(exercise: AbstractExercise): ExercisesGroup {
		for (let i = 0; i < this.exercisesGroups.length; i++) {
			if (this.exercisesGroups[i].groupType === ExerciseGroupTypeEnum[exercise.type]) {
				this.exercisesGroups[i].removeOne(exercise);
				return this.exercisesGroups[i];
			}
		}
		return null;
	}
}

class SessionBuilder {
	private me: Session;

	constructor() {
		this.me = new Session();
	}

	id(id: string): SessionBuilder {
		this.me.id = id;
		return this;
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

	dayInWeek(day: string): SessionBuilder {
		this.me.dayInWeek = day;
		return this;
	}

	build(): Session {
		return this.me;
	}
}