import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from "rxjs/Observable";
import {LocalStorageService} from "angular-2-local-storage/dist/index";
import {tokenNotExpired} from "angular2-jwt/angular2-jwt";
import {JwtHelper} from "angular2-jwt/angular2-jwt";
import {IAuthenticationService} from "./IAuthenticationService";
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {environment} from "../../../environments/environment";
import { ObjectiveConveter } from "../../shared/ObjectiveConverter";
import { ObjectiveEnum } from "../../_enums/ObjectiveEnum";

@Injectable()
export class AuthenticationService extends ObservableHelper implements IAuthenticationService {

	constructor(private http: Http, private localStorageService: LocalStorageService, private objectiveConveter:ObjectiveConveter) {
		super();
	}

	public signin(login: string, password: string): Observable<AuthenticationProfile | string> {
		return this.http.post(`${environment.baseUrl()}/signin`, {
			email: login,
			password: password
		}).map(response => {
			const data: any = this.extractDataOf(response);
			const rawProfile = this.jwtHelper.decodeToken(data.token);
			const token: string = data.token;
			this.localStorageService.set('token', token);
			
		
			return AuthenticationProfile.of().token(data.token)
				.login(rawProfile.email)
				.id(rawProfile._id)
				.profileCompleted(rawProfile.profileCompleted)
				.firstName(rawProfile.firstName)
				.isCoach(data.isCoach)
				.gym(rawProfile.gym)
				.lastName(rawProfile.lastName)
				.password(password)
				.birhtdate(new Date(rawProfile.birthDate))
				.gender(rawProfile.gender)
				.frequency(rawProfile.sessionFrequency)
				.objective(this.objectiveConveter.getEnumFromName(rawProfile.objective))
				.build();
		}).catch(this.handleError);
	}

	public signup(firstName: string, lastName: string, login: string, password: string, isCoach: boolean): Observable<AuthenticationProfile | string> {
		return this.http.post(`${environment.baseUrl()}/signup`, {
			email: login,
			password: password,
			lastname: lastName,
			firstname: firstName,
			isCoach: isCoach
		}).map(response => {
			const data: any = this.extractDataOf(response);
			const rawProfile = this.jwtHelper.decodeToken(data.token);
			this.localStorageService.set('token', data.token);
			return AuthenticationProfile.of().token(data.token)
				.login(rawProfile.email)
				.id(rawProfile._id)
				.profileCompleted(rawProfile.profileCompleted)
				.firstName(rawProfile.firstName)
				.isCoach(isCoach)
				.lastName(rawProfile.lastName)
				.password(password)
				.build();
		})
			.catch(this.handleError);
	}

	public signout(): void {
		this.localStorageService.remove('token');
		this.localStorageService.remove('program');
	}

	public authenticated(): boolean {
		return tokenNotExpired();
	}

	public getAuthenticationProfileInLocalStorage(): AuthenticationProfile {
		let profileInLocalStorage: string = this.localStorageService.get<string>('profile');
		if (profileInLocalStorage) {
			let profile: AuthenticationProfile = JSON.parse(profileInLocalStorage);
			return AuthenticationProfile.of().token(profile.token)
				.login(profile.login)
				.id(profile.id)
				.profileCompleted(profile.profileCompleted)
				.firstName(profile.firstName)
				.isCoach(profile.isCoach)
				.gym(profile.gym)
				.lastName(profile.lastName)
				.password(profile.password)
				.birhtdate(new Date(profile.birhtdate))
				.gender(profile.gender)
				.frequency(profile.frequency)
				.objective(profile.objective as ObjectiveEnum)
				.build();
		}
		return null;
	}
}