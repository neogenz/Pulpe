import {Component, OnInit, ViewContainerRef, OnDestroy} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Machine} from "../../_model/Machine";
import {Animations} from "../../shared/Animations";
import {WorkedMuscles} from "../../_model/WorkedMuscles";
import {ToastrService} from 'ngx-toastr';
import {MuscleConverter} from "../../shared/MuscleConverter";
import {MachineService} from "../../_services/machine/machine.service";
import {Observable} from "rxjs";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {AuthenticationService} from "../../_services/authentication/authentication.service";
import {MuscleEnum} from "../../_enums/MuscleEnum";


@Component({
	selector: 'pulpe-machine-form-dialog',
	templateUrl: 'machine-form-dialog.component.html',
	styleUrls: ['machine-form-dialog.component.css'],
	animations: [Animations.fadeIn()]
})
export class MachineFormDialogComponent extends DialogComponent<IForm, Machine> implements IForm, OnInit {
	machineRequest: Observable<Machine> = new Observable();
	machine: Machine;
	mode: string;
	machineForm: FormGroup;
	workedMuscleForm: FormGroup;
	nameCtrl: FormControl;
	workedMuscleCtrl: FormControl;
	intensityCtrl: FormControl;
	workedMuscles: string[];
	errorTranslations: any;
	titleConfirm: string;
	title: string;
	workedMusclesTmp: WorkedMuscles[];

	constructor(private machineService: MachineService, dialogService: DialogService, private auth: AuthenticationService, private slimLoadingBarService: SlimLoadingBarService, private muscleConverter: MuscleConverter, private fb: FormBuilder, private route: ActivatedRoute, private toastrService: ToastrService) {
		super(dialogService);
		this.errorTranslations = {
			workedMuscle: {
				alreadyExist: 'Ce muscle est déjà présent pour cette machine.'
			}
		}
	}

	ngOnInit() {
		this.buildForm();
	}

	buildForm() {
		this.workedMusclesTmp = [];
		if (!this.machine) {
			this.machine = Machine.of()
				.name('')
				.build();
		} else {
			this.machine.workedMuscles.forEach(m => {
				this.workedMusclesTmp.push(m);
			});
		}

		this.workedMuscles = this.muscleConverter.toLabelArray();
		this.nameCtrl = this.fb.control(this.machine.name, Validators.required);
		this.machineForm = this.fb.group({
			name: this.nameCtrl
		});

		this.workedMuscleCtrl = new FormControl();
		this.intensityCtrl = this.fb.control('easy', Validators.required);
		this.workedMuscleForm = this.fb.group({
			workedMuscleName: this.workedMuscleCtrl,
			intensity: this.intensityCtrl
		});
	}

	addWorkedMuscle() {
		const muscleName = this.muscleConverter.getNameFrom(this.workedMuscleCtrl.value);
		const workedMuscle = WorkedMuscles.of()
			.name(muscleName)
			.intensity(this.intensityCtrl.value)
			.build();

		let isOnError = false;
		this.workedMusclesTmp.forEach(m => {
			if (m.name === workedMuscle.name && m.intensity === workedMuscle.intensity) {
				this.toastrService.error(this.errorTranslations.workedMuscle.alreadyExist, 'Erreur');
				isOnError = true;
			}
		});

		if (!isOnError) {
			this.workedMusclesTmp.push(workedMuscle);
		}
	}

	deleteThis(workedMuscle: WorkedMuscles) {
		this.workedMusclesTmp = this.workedMusclesTmp.filter(m => {
			if (m.name === workedMuscle.name && m.intensity === workedMuscle.intensity) {
				return (m.name === workedMuscle.name && m.intensity !== workedMuscle.intensity);
			}
			return true;
		});
	}

	confirm() {
		if (this.mode === 'add') {
			this.add();
		} else {
			this.edit();
		}
	}

	add() {
		this.workedMusclesTmp.forEach((m) => {
			m.name = MuscleEnum.Name[this.muscleConverter.getEnumFromValue(m.name)];
		});
		const authProfile = this.auth.getAuthenticationProfileInLocalStorage();
		const machine = Machine
			.of()
			.name(this.nameCtrl.value)
			.workedMuscles(this.workedMusclesTmp)
			.gym(authProfile.gym)
			.build();

		this.machineRequest = this.machineService.save(machine);
		this.slimLoadingBarService.start();
		this.machineRequest
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((machine) => {
					this.result = machine;
					this.toastrService.success('Une nouvelle machine a été ajouté', 'Succès!');
					this.close();
				},
				(errorMsg) => {
					console.error(errorMsg);
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
	}

	edit() {
		this.machine.name = this.nameCtrl.value;
		this.workedMusclesTmp.forEach((m) => {
			m.name = MuscleEnum.Name[this.muscleConverter.getEnumFromValue(m.name)];
		});
		this.machine.workedMuscles = this.workedMusclesTmp;
		this.machineRequest = this.machineService.update(this.machine);
		this.slimLoadingBarService.start();
		this.machineRequest
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((machine) => {
					this.result = machine;
					this.toastrService.success('La machine a été mis à jour', 'Succès!');
					this.close();
				},
				(errorMsg) => {
					console.error(errorMsg);
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
	}
}

export interface IForm {
	machine: any;
	mode: any;
	title: any;
	titleConfirm: any;
}