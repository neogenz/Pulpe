import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {Member} from "../_model/Member";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from '../../environments/environment'
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {Point} from "../_model/Point";
import {AuthHttp} from "angular2-jwt/angular2-jwt";

@Injectable()
export class MemberService extends ObservableHelper {

	constructor(private http: AuthHttp, private localStorageService: LocalStorageService) {
		super();
	}

	public findAllByAuthenticatedCoach(): Observable<Member[]> {
		return this.http.get(`${environment.baseUrl()}/coachs/members`)
			.map(response => {
				const data: any = this.extractDataOf(response);
				const members = [];
				data.members.forEach(member => {
					members.push(
						Member.of()
							.id(member._id)
							.lastName(member.lastName)
							.firstName(member.firstName)
							.measurements(member.measurements)
							.objective(member.objective)
							.gender(member.gender)
							.sessionFrequency(member.sessionFrequency)
							.gym(member.gym)
							.email(member.email)
							.createdAt(member.createdAt.toLocaleString())
							.birthDate(member.birthDate.toLocaleString())
							.build()
					);
				});
				return members;
			}).catch(this.handleError);
	}

	public findById(id: string): Observable<Member> {
		return this.http.get(`${environment.baseUrl()}/members/${id}`)
			.map(response => {
				const data: any = this.extractDataOf(response);
				return Member.of()
					.id(data.member._id)
					.lastName(data.member.lastName)
					.firstName(data.member.firstName)
					.measurements(data.member.measurements)
					.objective(data.member.objective)
					.gender(data.member.gender)
					.sessionFrequency(data.member.sessionFrequency)
					.gym(data.member.gym)
					.email(data.member.email)
					.createdAt(data.member.createdAt.toLocaleString())
					.birthDate(data.member.birthDate.toLocaleString())
					.build();
			}).catch(this.handleError);
	}

	public addMeasurementsOnAuthenticatedMember(measurements: any): Observable<Member | string> {
		return this.http.put(`${environment.baseUrl()}/members/measurements`, {
			measurements: measurements
		}).map(response => {
			const data: any = this.extractDataOf(response);
			return Member.of()
				.id(data.member._id)
				.lastName(data.member.lastName)
				.firstName(data.member.firstName)
				.measurements(data.member.measurements)
				.objective(data.member.objective)
				.gender(data.member.gender)
				.sessionFrequency(data.member.sessionFrequency)
				.gym(data.member.gym)
				.email(data.member.email)
				.createdAt(data.member.createdAt.toLocaleString())
				.birthDate(data.member.birthDate.toLocaleString())
				.build();
		}).catch(this.handleError);
	}

	public update(member: Member): Observable<Member> {
		return this.http.put(`${environment.baseUrl()}/members`, {
			member: member
		}).map(response => {
			const data: any = this.extractDataOf(response);
			return Member.of()
				.id(data.member._id)
				.lastName(data.member.lastName)
				.firstName(data.member.firstName)
				.measurements(data.member.measurements)
				.objective(data.member.objective)
				.gender(data.member.gender)
				.sessionFrequency(data.member.sessionFrequency)
				.gym(data.member.gym)
				.email(data.member.email)
				.createdAt(data.member.createdAt.toLocaleString())
				.birthDate(data.member.birthDate.toLocaleString())
				.build();
		}).catch(this.handleError);
	}

	public create(member: Member): Observable<Member> {
		return this.http.post(`${environment.baseUrl()}/members`, {
			member: member
		}).map(response => {
			const data: any = this.extractDataOf(response);
			return Member.of()
				.id(data.member._id)
				.lastName(data.member.lastName)
				.firstName(data.member.firstName)
				.measurements(data.member.measurements)
				.objective(data.member.objective)
				.gender(data.member.gender)
				.sessionFrequency(data.member.sessionFrequency)
				.gym(data.member.gym)
				.email(data.member.email)
				.createdAt(data.member.createdAt.toLocaleString())
				.birthDate(data.member.birthDate.toLocaleString())
				.build();
		}).catch(this.handleError);
	}

	public findEfficientPrevisions(): Observable<Point[]> {
		return this.http.get(`${environment.baseUrl()}/efficientPrevisions/members`)
			.map(response => {
				const data: any = this.extractDataOf(response);
				const efficientPrevisions = data.efficientsPrevisions;
				const points = [];
				efficientPrevisions.forEach((prevision) => {
					points.push(
						Point.of()
							.date(prevision.date)
							.value(prevision.value)
							.build()
					);
				});
				return points;
			})
			.catch(this.handleError);
	}
}