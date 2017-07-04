import {Injectable} from '@angular/core';
import {AuthenticationService} from "../../_services/authentication/authentication.service";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";
import {Measurement} from "../../_model/Measurement";
import {Observable} from "rxjs/Observable";
import {MeasurementEnumService} from "../../_services/measurement-enum.service";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Http, Response, Headers, RequestOptions} from '@angular/http';
import * as moment from "moment/moment";
import {environment} from "../../../environments/environment";
import { AuthHttp } from "angular2-jwt/angular2-jwt";

@Injectable()
export class ProfileService extends ObservableHelper {

	constructor(private authService: AuthenticationService, private measurementEnumService: MeasurementEnumService, private http: AuthHttp) {
		super();
	}

	public profileIsCompleted(): boolean {
		const profile: AuthenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
		if (profile) {
			return profile.profileCompleted;
		}
		return false;
	}


	public profileIsCoach(): boolean {
		const profile: AuthenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
		if (profile) {
			return profile.isCoach;
		}
		return false;
	}

	public completeMemberProfile(gymId: string, size: Measurement, weight: Measurement, frequency: number, birthdate: Date, objective: string, gender: string): Observable<AuthenticationProfile|string> {
		const url = `${environment.baseUrl()}/members/profile/complete`;
		const body = {
			measurements: [
				{
					name: this.measurementEnumService.getCodeFromName(size.name),
					unit: this.measurementEnumService.getCodeFromUnit(size.unit),
					value: size.value
				},
				{
					name: this.measurementEnumService.getCodeFromName(weight.name),
					unit: this.measurementEnumService.getCodeFromUnit(weight.unit),
					value: weight.value
				}
			],
			gymId: gymId,
			sessionFrequency: frequency,
			birthDate: moment(birthdate).format('YYYY-MM-DD'),
			objective: objective,
			gender: gender
		};
		return this.http.post(url, body).map(response => {
			const data: any = this.extractDataOf(response);
			const profile: AuthenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
			profile.profileCompleted = true;
			profile.gym = data.member.gym;
			return profile;
		})
			.catch(this.handleError);
	}

	public completeCoachProfile(gymId: string, nameGym: string, addressGym: string, cityGym: string, birthdate: Date, gender: string): Observable<AuthenticationProfile|string> {
		const url = `${environment.baseUrl()}/coachs/profile/complete`;
		const body = {
			birthDate: moment(birthdate).format('YYYY-MM-DD'),
			gender: gender,
			gym: {
				id: gymId,
				name: nameGym,
				address: addressGym,
				city: cityGym
			}
		};
		return this.http.post(url, body).map(response => {
			const data: any = this.extractDataOf(response);
			const profile: AuthenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
			profile.profileCompleted = true;
			profile.gym = data.coach.gym;
			return profile;
		})
			.catch(this.handleError);
	}

}
