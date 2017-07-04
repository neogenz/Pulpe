import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Coach} from "../../_model/Coach";
import {CoachService} from "../../_services/coach.service";

@Injectable()
export class ProfileCoachResolver implements Resolve<any> {
	constructor(private coachService: CoachService, private slimLoadingBarService: SlimLoadingBarService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<Coach> | Promise<Coach> | Coach {
		return this.coachService.findAuthenticated();
	}
}
