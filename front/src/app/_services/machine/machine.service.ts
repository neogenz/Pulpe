import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {Member} from "../../_model/Member";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from '../../../environments/environment'
import {Machine} from "../../_model/Machine";
import {WorkedMuscles} from "../../_model/WorkedMuscles";

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

          data.machines.forEach(machine => {
            let workedMuscles = [];
            machine.workedMuscles.forEach(muscle => {
              workedMuscles.push(
                WorkedMuscles.of()
                  .name(muscle.name)
                  .intensity(muscle.intensity)
                  .build()
              )
            });

            machines.push(
              Machine.of()
                .id(machine._id)
                .name(machine.name)
                .workedMuscles(workedMuscles)
                .build()
            );

            workedMuscles = [];
          });

          debugger;
          return machines;
        }
      ).catch(this

        .
        handleError
      );
  }

}