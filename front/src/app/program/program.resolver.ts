import { Observable } from 'rxjs/Observable';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import {ProgramService} from "./program.service";
import {Program} from "../model/Program";

@Injectable()
export class ProgramResolver implements Resolve<any> {
  constructor(private programService:ProgramService) {
  }

  resolve(route:ActivatedRouteSnapshot):Observable<Program> | Promise<Program> | Program {
    return this.programService.findBy(null);
  }
}
