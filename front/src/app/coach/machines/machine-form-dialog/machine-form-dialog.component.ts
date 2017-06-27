import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {FormBuilder, FormGroup, FormControl, Validators, FormArray} from "@angular/forms";
import {Machine} from "../../../_model/Machine";
import {Animations} from "../../../shared/Animations";
import {WorkedMuscle} from "../../../_model/WorkedMuscle";
import {ToastrService} from 'ngx-toastr';
import {MuscleConverter} from "../../../shared/MuscleConverter";
import {MachineService} from "../../../_services/machine/machine.service";
import {Observable} from "rxjs";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {AuthenticationService} from "../../../_services/authentication/authentication.service";
import {WorkedMuscleSelectable} from "../../../shared/form/select-worked-muscle/select-worked-muscle.component";
import {ModeDialogEnum} from "../../../_enums/ModeDialogEnum";


@Component({
	selector: 'pulpe-machine-form-dialog',
	templateUrl: 'machine-form-dialog.component.html',
	styleUrls: ['machine-form-dialog.component.scss'],
	animations: [Animations.fadeIn()]
})
export class MachineFormDialogComponent extends DialogComponent<IForm, Machine> implements IForm, OnInit, WorkedMuscleSelectable {
	machineRequest: Observable<Machine> = new Observable();
	machine: Machine;
	mode: ModeDialogEnum;
	machineForm: FormGroup;
	nameCtrl: FormControl;
	commentCtrl: FormControl;
	workedMusclesCtrl: FormArray;
	workedMuscles: string[];
	errorTranslations: any;
	titleConfirm: string;
	title: string;

	constructor(private machineService: MachineService, dialogService: DialogService,
							private auth: AuthenticationService,
							private slimLoadingBarService: SlimLoadingBarService,
							private muscleConverter: MuscleConverter,
							private fb: FormBuilder,
							private toastrService: ToastrService) {
		super(dialogService);
		this.errorTranslations = {
			workedMuscle: {
				alreadyExist: 'Ce muscle est déjà présent pour cette machine.'
			}
		}
	}

	ngOnInit() {
		if (!this.machine) {
			this.machine = Machine.of()
				.name('')
				.workedMuscles([])
				.build();
		}
		this.buildForm();
		this.machine.workedMuscles.forEach(muscle => this.addWorkedMuscle(muscle));
	}

	buildForm() {
		this.workedMuscles = this.muscleConverter.toLabelArray();
		this.workedMusclesCtrl = this.fb.array([], Validators.compose([Validators.required]));
		this.nameCtrl = this.fb.control(this.machine.name, Validators.required);
		this.commentCtrl = this.fb.control(this.machine.comment);
		this.machineForm = this.fb.group({
			name: this.nameCtrl,
			workedMuscle: this.workedMusclesCtrl,
			comment: this.commentCtrl
		});
	}

	addWorkedMuscle(workedMuscleToAdd: WorkedMuscle) {
		let isOnError = false;
		for (let i = 0; i < this.workedMusclesCtrl.value.length; i++) {
			if (this.workedMusclesCtrl.value[i].isSame(workedMuscleToAdd)) {
				this.toastrService.error(this.errorTranslations.workedMuscle.alreadyExist, 'Erreur');
				isOnError = true;
			}
		}
		if (!isOnError) {
			this.workedMusclesCtrl.push(this._initWorkedMuscleControl(workedMuscleToAdd));
		}
	}

	_initWorkedMuscleControl(workedMuscle: WorkedMuscle): FormControl {
		return this.fb.control(workedMuscle, Validators.required)
	}

	deleteWorkedMuscleAtThis(index: number): void {
		this.workedMusclesCtrl.removeAt(index);
	}

	confirm() {
		switch (this.mode) {
			case ModeDialogEnum.Add:
				this.add();
				break;
			case ModeDialogEnum.Edit:
				this.edit();
				break;
		}
	}

	add() {
		const authProfile = this.auth.getAuthenticationProfileInLocalStorage();
		const machine = Machine
			.of()
			.name(this.nameCtrl.value)
			.comment(this.commentCtrl.value)
			.workedMuscles(this.workedMusclesCtrl.value)
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
					this.toastrService.success('Une nouvelle machine a été ajoutée', 'Succès!');
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
		this.machine.comment = this.commentCtrl.value;
		this.machine.workedMuscles = this.workedMusclesCtrl.value;
		this.machineRequest = this.machineService.update(this.machine);
		this.slimLoadingBarService.start();
		this.machineRequest
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((machine) => {
					this.result = machine;
					this.toastrService.success('La machine a été mise à jour', 'Succès!');
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

enum MemberOpenMode{
	Add,
	Edit
}