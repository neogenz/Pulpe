import {Injectable} from '@angular/core';
import {Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {LocalStorageService} from 'angular-2-local-storage';
import {environment} from '../../../environments/environment'
import {Program} from "../../_model/Program";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {Point} from "../../_model/Point";
import {Member} from "../../_model/Member";

@Injectable()
export class EvolutionService extends ObservableHelper {

	constructor(private _http: AuthHttp) {
		super();
	}

	findEvolutionBy(measurementName: string,): Observable<Point[]> {
		return this._http.get(`${environment.baseUrl()}/measurements/${measurementName}/evolution`)
			.map(res => {
				let data: any = this.extractDataOf(res);
				const evolution = data.evolution;
				const points = [];
				evolution.forEach((point) => {
					points.push(
						Point.of()
							.date(point.date)
							.value(point.value)
							.build()
					);
				});
				return points;
			})
			.catch(this.handleError);
	}

}
