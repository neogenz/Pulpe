import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SessionsService} from "./sessions.service";
import {Session} from "../_model/Session";

@Injectable()
export class SessionsResolver implements Resolve<any> {
    constructor(private sessionsService: SessionsService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Session> | Promise<Session> | Session {
        return this.sessionsService.findBy(null);
    }
}