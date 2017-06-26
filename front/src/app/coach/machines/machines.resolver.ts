import {Observable} from 'rxjs/Observable';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {MachineService} from "../../_services/machine/machine.service";
import {Machine} from "../../_model/Machine";

@Injectable()
export class MachinesResolver implements Resolve<any> {
  constructor(private machineService: MachineService, private slimLoadingBarService: SlimLoadingBarService) {
  }

  resolve(route: ActivatedRouteSnapshot): Observable<Machine[]> | Promise<Machine[]> | Machine[] {
    this.slimLoadingBarService.start();
    return this.machineService.findAllByCoachAuthenticated().flatMap((machines) => {
      this.slimLoadingBarService.complete();
      return Observable.of(machines);
    });
  }
}
