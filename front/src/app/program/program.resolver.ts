import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ProgramService} from "./program.service";
import {Program} from "../_model/Program";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";

@Injectable()
export class ProgramResolver implements Resolve<any> {
  constructor(private programService: ProgramService, private slimLoadingBarService: SlimLoadingBarService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Program> | Promise<Program> | Program {
    this.slimLoadingBarService.start();
    return this.programService.findActiveByAuthenticatedMemberId().flatMap((program) => {
      this.slimLoadingBarService.complete();
      return Observable.of(program);
    })
  }
}
