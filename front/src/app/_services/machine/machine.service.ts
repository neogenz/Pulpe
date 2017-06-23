import {Injectable} from "@angular/core";
import {Http} from "@angular/http";
import {ObservableHelper} from "../../_helpers/ObservableHelper";
import {Observable} from "rxjs";
import {LocalStorageService} from "angular-2-local-storage";
import {environment} from '../../../environments/environment'
import {Machine} from "../../_model/Machine";
import {WorkedMuscles} from "../../_model/WorkedMuscles";
import {MuscleEnum} from "../../_enums/MuscleEnum";
import {MuscleConverter} from "../../shared/MuscleConverter";

@Injectable()
export class MachineService extends ObservableHelper {

	constructor(private http: Http, private localStorageService: LocalStorageService, private muscleConverter: MuscleConverter) {
		super();
	}

	public findAllByCoach(id: string): Observable<Machine[]> {
		return this.http.get(`${environment.baseUrl()}/machines/coachs/${id}`)
			.map(response => {
					const data: any = this.extractDataOf(response);
					const machines = [];
					let workedMuscles: WorkedMuscles[];
					let muscleEnum: MuscleEnum.Name;

					data.machines.forEach(machine => {
						workedMuscles = machine.workedMuscles.map(muscle => {
							muscleEnum = this.muscleConverter.getEnumFromName(capitalizeFirstLetter(muscle.name));
							return WorkedMuscles.of()
								.name(muscleEnum)
								.intensity(muscle.intensity)
								.build();
						});
						machines.push(
							Machine.of()
								.id(machine._id)
								.name(machine.name)
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
			machine: machine
		})
			.map(response => {
					const data: any = this.extractDataOf(response);

					return machine;
				}
			).catch(this.handleError);
	}

	public update(machine: Machine): Observable<Machine> {
		return this.http.put(`${environment.baseUrl()}/machines`, {
			machine: machine
		})
			.map(response => {
					const data: any = this.extractDataOf(response);

					return machine;
				}
			).catch(this.handleError);
	}
}

function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}