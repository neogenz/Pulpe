import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ProgramService} from "../../../member/program/program.service";
import {Program} from "../../../_model/Program";
import {MemberService} from "../../../_services/member.service";
import {Member} from "../../../_model/Member";

@Injectable()
export class MemberResolver implements Resolve<any> {
	constructor(private memberService: MemberService, private slimLoadingBarService: SlimLoadingBarService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<Member> | Promise<Member> | Member {
		const id: string = route.params['id'];
		return this.memberService.findById(id);
	}
}
