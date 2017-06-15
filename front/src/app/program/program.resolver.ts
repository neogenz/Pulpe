import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {ProgramService} from "./program.service";
import {Program} from "../_model/Program";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {AuthenticationService} from "../_services/authentication/authentication.service";

@Injectable()
export class ProgramResolver implements Resolve<any> {
  constructor(private programService: ProgramService, private authService: AuthenticationService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Program> | Promise<Program> | Program {
    const profile: AuthenticationProfile = this.authService.getAuthenticationProfileInLocalStorage();
    return this.programService.findBy(profile.id);
  }
}
