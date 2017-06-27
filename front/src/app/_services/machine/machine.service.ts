import {Injectable} from "@angular/core";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from '../../../environments/environment'
import {Machine} from "../../_model/Machine";
import {WorkedMuscle} from "../../_model/WorkedMuscle";
import {MuscleEnum} from "../../_enums/MuscleEnum";
import {MuscleConverter} from "../../shared/MuscleConverter";
import {AuthHttp} from "angular2-jwt";

@Injectable()
export class MachineService extends ObservableHelper {

  constructor(private http: AuthHttp, private localStorageService: LocalStorageService, private muscleConverter: MuscleConverter) {
    super();
  }

  public findAllByCoachAuthenticated(): Observable<Machine[]> {
    return this.http.get(`${environment.baseUrl()}/machines`)
      .map(response => {
          const data: any = this.extractDataOf(response);
          const machines = [];
          let workedMuscles: WorkedMuscle[];
          let muscleEnum: MuscleEnum.Name;

					data.machines.forEach(machine => {
						workedMuscles = machine.workedMuscles.map(muscle => {
							muscleEnum = this.muscleConverter.getEnumFromName(capitalizeFirstLetter(muscle.name));
							return WorkedMuscle.of()
								.name(muscleEnum)
								.intensityFromServer(muscle.intensity)
								.build();
						});
						machines.push(
							Machine.of()
								.id(machine._id)
								.name(machine.name)
								.comment(machine.comment)
								.workedMuscles(workedMuscles)
								.gym(machine.gym)
								.build()
						);

						workedMuscles = [];
					});

					return machines;
				}
			).catch(this.handleError);
	}

	public save(machine: Machine): Observable<Machine> {
		return this.http.post(`${environment.baseUrl()}/machines`, {
			machine: machine.serialize()
		})
			.map(response => {
					const data: any = this.extractDataOf(response);
					let workedMuscles: WorkedMuscle[];
					let muscleEnum: MuscleEnum.Name;
					workedMuscles = data.machine.workedMuscles.map(muscle => {
						muscleEnum = this.muscleConverter.getEnumFromName(capitalizeFirstLetter(muscle.name));
						return WorkedMuscle.of()
							.name(muscleEnum)
							.intensityFromServer(muscle.intensity)
							.build();
					});
					return Machine.of()
						.id(data.machine._id)
						.name(data.machine.name)
						.comment(data.machine.comment)
						.workedMuscles(workedMuscles)
						.gym(data.machine.gym)
						.build();
				}
			).catch(this.handleError);
	}

	public update(machine: Machine): Observable<Machine> {
		return this.http.put(`${environment.baseUrl()}/machines`, {
			machine: machine.serialize()
		})
			.map(response => {
					const data: any = this.extractDataOf(response);
					let workedMuscles: WorkedMuscle[];
					let muscleEnum: MuscleEnum.Name;
					workedMuscles = data.machine.workedMuscles.map(muscle => {
						muscleEnum = this.muscleConverter.getEnumFromName(capitalizeFirstLetter(muscle.name));
						return WorkedMuscle.of()
							.name(muscleEnum)
							.intensityFromServer(muscle.intensity)
							.build();
					});
					return Machine.of()
						.id(machine._id)
						.name(machine.name)
						.comment(machine.comment)
						.workedMuscles(workedMuscles)
						.gym(machine.gym)
						.build()

				}
			).catch(this.handleError);
	}

	public delete(machine: Machine): Observable<Machine> {
		return this.http.delete(`${environment.baseUrl()}/machines/${machine._id}`)
			.map(response => {
					const data: any = this.extractDataOf(response);
					let workedMuscles: WorkedMuscle[];
					let muscleEnum: MuscleEnum.Name;
					workedMuscles = data.machine.workedMuscles.map(muscle => {
						muscleEnum = this.muscleConverter.getEnumFromName(capitalizeFirstLetter(muscle.name));
						return WorkedMuscle.of()
							.name(muscleEnum)
							.intensityFromServer(muscle.intensity)
							.build();
					});
					return Machine.of()
						.id(machine._id)
						.name(machine.name)
						.comment(machine.comment)
						.workedMuscles(workedMuscles)
						.gym(machine.gym)
						.build()
				}
			).catch(this.handleError);
	}
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}