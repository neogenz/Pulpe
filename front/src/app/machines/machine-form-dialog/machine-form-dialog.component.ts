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


@Component({
	selector: 'pulpe-machine-form-dialog',
	templateUrl: 'machine-form-dialog.component.html',
	styleUrls: ['machine-form-dialog.component.css'],
	animations: [Animations.fadeIn()]
})
export class MachineFormDialogComponent extends DialogComponent<MachineForm, Machine> implements MachineForm, OnInit {
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
	titleConfirm: String;
	title: String;

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
		if (!this.machine) {
			this.machine = Machine.of()
				.name('')
				.workedMuscles([])
				.build();
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

		if (!this.machine.workedMuscles) {
			this.machine.workedMuscles = [];
		}

		let isOnError = false;
		this.machine.workedMuscles.forEach(m => {
			if (m.name === workedMuscle.name && m.intensity === workedMuscle.intensity) {
				this.toastrService.error(this.errorTranslations.workedMuscle.alreadyExist, 'Erreur');
				isOnError = true;
			}
		});

		if (!isOnError) {
			this.machine.workedMuscles.push(workedMuscle);
		}
	}

	deleteThis(workedMuscle: WorkedMuscles) {
		this.machine.workedMuscles = this.machine.workedMuscles.filter(m => {
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
		const authProfile = this.auth.getAuthenticationProfileInLocalStorage();
		debugger;
		const machine = Machine
			.of()
			.name(this.nameCtrl.value)
			.workedMuscles(this.machine.workedMuscles)
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
					this.close();
				},
				(errorMsg) => {
					console.error(errorMsg);
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
	}

	edit() {
		debugger;
		this.machine.name = this.nameCtrl.value;
		this.machineRequest = this.machineService.update(this.machine);
		this.slimLoadingBarService.start();
		this.machineRequest
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((machine) => {
					this.result = machine;
					this.close();
				},
				(errorMsg) => {
					console.error(errorMsg);
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
	}
}

export interface MachineForm {
	machine: any;
	mode: any;
	title: any;
	titleConfirm: any;
}