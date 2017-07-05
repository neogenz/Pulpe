import {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {environment} from "../../../environments/environment";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {ExerciseGroupCodeConverter} from "../../shared/ExerciseGroupCodeConverter";
import {Observable} from "rxjs/Observable";
import {ExercisesGroup} from "../../_model/exercise/ExercisesGroup";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {ExerciseFactory} from "../../_model/exercise/ExerciseFactory";

@Injectable()
export class ExerciseService extends ObservableHelper {

	constructor(private _http: AuthHttp) {
		super();
	}

	public findAllByGymOfAuthenticatedCoach(): Observable<ExercisesGroup[]> {
		return this._http.get(`${environment.baseUrl()}/exercises`)
			.map(res => {
				let data: any = this.extractDataOf(res);
				return ExerciseGroupCodeConverter.createExercisesGroupsFrom(data);
			})
			.catch(this.handleError);
	}

	public save(exercise: AbstractExercise): Observable<AbstractExercise> {
		return this._http.post(`${environment.baseUrl()}/exercises`, {
			exercise: exercise.serialize()
		})
			.map(res => {
				let data: any = this.extractDataOf(res);
				return ExerciseFactory.create(data.__t, data);
			})
			.catch(this.handleError);
	}

	public updateReference(exercise: AbstractExercise): Observable<AbstractExercise> {
		return this._http.put(`${environment.baseUrl()}/exercises/reference`, {
			exercise: exercise.serialize()
		})
			.map(res => {
				let data: any = this.extractDataOf(res);
				return ExerciseFactory.create(data.__t, data);
			})
			.catch(this.handleError);
	}

	public update(exercise: AbstractExercise): Observable<AbstractExercise> {
		return this._http.put(`${environment.baseUrl()}/exercises/${exercise.id}`, {
			exercise: exercise.serialize()
		})
			.map(res => {
				let data: any = this.extractDataOf(res);
				return ExerciseFactory.create(data.__t, data);
			})
			.catch(this.handleError);
	}

	public updateOneOfMember(exercise: AbstractExercise): Observable<AbstractExercise> {
		return this._http.put(`${environment.baseUrl()}/members/programs/exercises`, {
			exercise: exercise.serialize()
		})
			.map(res => {
				let data: any = this.extractDataOf(res);
				return ExerciseFactory.create(data.__t, data);
			})
			.catch(this.handleError);
	}

	/**
	 *
	 * @param exercise
	 * @returns {Observable<R|AbstractExercise>} deleted
	 */
	public deleteThis(exercise: AbstractExercise): Observable<AbstractExercise> {
		return this._http.delete(`${environment.baseUrl()}/exercises/${exercise.id}`)
			.map(res => {
				const data: any = this.extractDataOf(res);
				return ExerciseFactory.create(data.__t, data);
			})
			.catch(this.handleError);
	}
}
