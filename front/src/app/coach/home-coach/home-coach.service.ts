import {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt";
import {environment} from "../../../environments/environment";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {ExerciseGroupCodeConverter} from "../../shared/ExerciseGroupCodeConverter";
import {Observable} from "rxjs/Observable";
import {ExercisesGroup} from "../../_model/exercise/ExercisesGroup";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {ExerciseFactory} from "../../_model/exercise/ExerciseFactory";
import {Dashboard} from "../../_model/Dashboard";

@Injectable()
export class HomeCoachService extends ObservableHelper {

	constructor(private _http: AuthHttp) {
		super();
	}

	public findStatistiques(): Observable<Dashboard> {
		return this._http.get(`${environment.baseUrl()}/gyms/stats`)
			.map(res => {
				let data: any = this.extractDataOf(res);
				return Dashboard.of()
					.nbExercises(data.nbExercises)
					.nbMachines(data.nbMachines)
					.nbMembers(data.nbMembers)
					.build();
			})
			.catch(this.handleError);
	}
}
