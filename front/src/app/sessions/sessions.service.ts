import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable}     from 'rxjs/Observable';
import {Member} from "../model/Member";
import {environment} from '../../environments/environment'
import {Session} from "../model/Session";

@Injectable()
export class SessionsService {

    constructor(private _http: Http) {
    }

    /**
     * Find sessions of a member
     * @param {Member} member
     * @returns {Observable<Session>}
     */
    findBy(member: Member): Observable<Session> {
        return this._http.get(environment.baseUrl() + '/assets/stubs/sessions.json')
            .map(res => {
                let data: any = this.extractData(res);
                return new Session().initFromRawObject(data.massGainers[0]);
            })
            .catch(this.handleError);
    }

    private extractData(res: Response) {
        let body = res.json();
        return body || {};
    }

    private handleError(error: any) {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        return Observable.throw(errMsg);
    }
}
