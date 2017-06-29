/**
 * Created by maximedesogus on 24/06/2017.
 */
import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {HomeCoachService} from "./home-coach.service";
import {Dashboard} from "../../_model/Dashboard";

@Injectable()
export class HomeCoachResolver implements Resolve<any> {
	constructor(private homeCoachService: HomeCoachService, private slimLoadingBarService: SlimLoadingBarService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<Dashboard> | Promise<Dashboard> | Dashboard {
		return this.homeCoachService.findStatistiques();
	}
}
