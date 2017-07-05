import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ProgramService} from "../../../member/program/program.service";
import {Program} from "../../../_model/Program";

@Injectable()
export class ProgramMemberResolver implements Resolve<any> {
	constructor(private programService: ProgramService, private slimLoadingBarService: SlimLoadingBarService) {
	}

	resolve(route: ActivatedRouteSnapshot): Observable<Program> | Promise<Program> | Program {
		const id: string = route.params['id'];
		this.slimLoadingBarService.start();
		return this.programService.findActiveByMemberId(id).flatMap((program) => {
			this.slimLoadingBarService.complete();
			return Observable.of(program);
		});
	}
}
