import {Injectable} from '@angular/core';
import {AuthHttp} from "angular2-jwt/angular2-jwt";
import {ObservableHelper} from "../_helpers/ObservableHelper";
import {Observable} from "rxjs/Observable";
import {environment} from "../../environments/environment";

@Injectable()
export class DemoService extends ObservableHelper {

	constructor(private http: AuthHttp) {
		super()
	}

	generateDemoDataOnAuthenticatedCoachGym(): Observable<null> {
		return this.http.post(`${environment.baseUrl()}/context/coach/demo`, {}).catch(this.handleError);
	}

	generateDemoDataOnAuthenticatedMember(): Observable<null> {
		return this.http.post(`${environment.baseUrl()}/context/members/demo`, {}).catch(this.handleError);
	}
}
