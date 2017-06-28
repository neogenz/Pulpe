import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {Program} from "../../_model/Program";
import {Member} from "../../_model/Member";
import {MemberService} from "../../_services/member/member.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {Point} from "../../_model/Point";

@Injectable()
export class EvolutionResolver implements Resolve<any> {
    constructor(private memberService: MemberService, private slimLoadingBarService: SlimLoadingBarService) {
    }

    resolve(route: ActivatedRouteSnapshot): Observable<Point[]> | Promise<Point[]> | Point[] {
        return this.memberService.findEfficientPrevisions(route.params['id']);
    }
}
