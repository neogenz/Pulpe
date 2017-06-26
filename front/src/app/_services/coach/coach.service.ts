import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {Coach} from "../../_model/Coach";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from '../../../environments/environment'

@Injectable()
export class CoachService extends ObservableHelper {

	constructor(private http: Http, private localStorageService: LocalStorageService) {
		super();
	}

	public findById(id: string): Observable<Coach | string> {
		return this.http.get(`${environment.baseUrl()}/coachs/${id}`)
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
}