import {AbstractExercise} from "./exercise/AbstractExercise";
import {ExerciseFactory} from "./exercise/ExerciseFactory";

export class Session {
    goal:string;
    exercises:Map<string, AbstractExercise[]>;
    createdAt:Date;

    constructor() {
        this.exercises = new Map<string, AbstractExercise[]>();
    }

    public initFromRawObject(rawInitObject:any) {
        if (!rawInitObject.exercisesGroup) {
            throw new Error('exercises is not defined in raw json.');
        }
        let rawExercisesByCurrentGroup = [];
        this.goal = rawInitObject.goal;
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
}