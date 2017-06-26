import {Component, OnInit} from '@angular/core';
import {Machine} from "../../_model/Machine";
import {DialogService} from "ng2-bootstrap-modal";
import {ActivatedRoute} from "@angular/router";
import {Animations} from "../../shared/Animations";
import {MachineFormDialogComponent} from "./machine-form-dialog/machine-form-dialog.component";
import {MuscleConverter} from "../../shared/MuscleConverter";
import {DeleteDialogComponent} from "../../shared/dialogs/delete-dialog/delete-dialog.component";
import {Observable} from "rxjs";
import {MachineService} from "../../_services/machine/machine.service";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {AuthenticationProfile} from "../../_model/AuthenticationProfile";

@Component({
	selector: 'pulpe-machines',
	templateUrl: 'machines.component.html',
	styleUrls: ['machines.component.scss'],
	animations: [Animations.fadeIn()]
})
export class MachinesComponent implements OnInit {
	machineRequest: Observable<Machine> = new Observable();
	private machines: Machine[];
	filterArgs: string;

	constructor(private route: ActivatedRoute,
							private dialogService: DialogService,
							private slimLoadingBarService: SlimLoadingBarService,
							private muscleConverter: MuscleConverter,
							private toastrService: ToastrService,
							private machineService: MachineService) {
	}

	ngOnInit() {
		this.machines = this.route.snapshot.data['machines'];
		this.filterArgs = '';
	}

	filterArgsChanged(filtersArgs: string) {
		this.filterArgs = null;
		if (filtersArgs !== '') {
			this.filterArgs = filtersArgs;
		}
	}

	openDeleteDialog(machine) {
		const title = `Supression d'une machine`;
		const description = `Souhaitez-vous vraiment supprimer la machine : ${machine.name} ?`;
		this.dialogService.addDialog(DeleteDialogComponent, {
			id: machine._id, title: title, description: description
		}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe((id) => {
			if (id) {
				this.machineRequest = this.machineService.delete(machine);
				this.slimLoadingBarService.start();
				this.machineRequest.finally(() => {
					this.slimLoadingBarService.complete();
				})
					.subscribe((machine) => {
							this.toastrService.success('La machine a été supprimée.', 'Succès!');
							this.machines = this.machines.filter(m => m._id !== machine._id);
						},
						(errorMsg) => {
							console.error(errorMsg);
							this.toastrService.error(errorMsg, 'Erreur');
						}
					);
			}
		});
	}

	openMachineFormDialog(machine: Machine) {
		const mode = machine === undefined ? 'add' : 'edit';
		let title: string;
		let titleConfirm: string;
		if (mode === 'add') {
			title = `Ajout d'une machine`;
			titleConfirm = 'Ajouter';
		} else {
			title = `Edition d'une machine`;
			titleConfirm = 'Editer';
		}
		this.dialogService.addDialog(MachineFormDialogComponent, {
			machine: machine, mode: mode, title: title, titleConfirm: titleConfirm
		}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe((machineSaved) => {
			if (machineSaved) {
				if (mode === 'add') {
					this.machines.push(machineSaved);
				} else {
					const indexFinded = this.machines.findIndex(m => m._id == machine._id);
					this.machines[indexFinded] = machineSaved;
				}
			}
		});
	}
}
