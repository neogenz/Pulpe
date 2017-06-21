import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {Member} from "../../_model/Member";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from '../../../environments/environment'
import {Machine} from "../../_model/Machine";

@Injectable()
export class MachineService extends ObservableHelper {

  constructor(private http: Http, private localStorageService: LocalStorageService) {
    super();
  }

  public findAllByCoach(id: string): Observable<Machine[]> {
    return this.http.get(`${environment.baseUrl()}/machines/coachs/${id}`)
      .map(response => {
        const data: any = this.extractDataOf(response);
        const machines = [];
        data.members.forEach(machine => {
          machines.push(
            Machine.of()
              .id(machine._id)
              .name(machine.name)
              .build()
          );
        });
        return machines;
      }).catch(this.handleError);
  }

}