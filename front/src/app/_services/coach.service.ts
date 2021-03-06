import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {Coach} from "../_model/Coach";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from '../../environments/environment'
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class CoachService extends ObservableHelper {

	constructor(private http: AuthHttp, private localStorageService: LocalStorageService) {
		super();
	}

	public findAuthenticated(): Observable<Coach | string> {
		return this.http.get(`${environment.baseUrl()}/coachs`)
			.map(response => {
				const data: any = this.extractDataOf(response);
				return Coach.of()
					.id(data.coach._id)
					.lastName(data.coach.lastName)
					.firstName(data.coach.firstName)
					.city(data.coach.city)
					.createdAt(data.coach.createdAt)
					.email(data.coach.email)
					.address(data.coach.address)
					.birthDate(data.coach.birthDate)
					.gym(data.coach.gym)
					.gender(data.coach.gender)
					.profileCompleted(data.coach.profileIsCompleted)
					.build();
			}).catch(this.handleError);
	}

	public update(coach: Coach): Observable<Coach> {
		return this.http.put(`${environment.baseUrl()}/coachs`, {
			coach: coach
		}).map(response => {
			const data: any = this.extractDataOf(response);
			return Coach.of()
				.id(data.coach._id)
				.lastName(data.coach.lastName)
				.firstName(data.coach.firstName)
				.gender(data.coach.gender)
				.gym(data.coach.gym)
				.email(data.coach.email)
				.profileCompleted(data.coach.profileIsCompleted)
				.createdAt(data.coach.createdAt.toLocaleString())
				.birthDate(data.coach.birthDate.toLocaleString())
				.build();
		}).catch(this.handleError);
	}
}