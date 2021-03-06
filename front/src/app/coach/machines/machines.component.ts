import { Component, OnInit, ViewChildren, OnChanges, SimpleChanges, ChangeDetectorRef } from '@angular/core';
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
import {ModeDialogEnum} from "../../_enums/ModeDialogEnum";
import {MachineDetailsDialogComponent} from "./machine-details-dialog/machine-details-dialog.component";
import { FilterMachines } from "./machines.filter.pipe";

@Component({
	selector: 'pulpe-machines',
	templateUrl: 'machines.component.html',
	styleUrls: ['machines.component.scss'],
	animations: [Animations.fadeIn()],
	providers:[FilterMachines]
})
export class MachinesComponent implements OnInit {
	machineRequest: Observable<Machine> = new Observable();
	machines: Machine[];
	filteredMachines: Machine[];
	filterArgs: string;

	constructor(private route: ActivatedRoute,
							private dialogService: DialogService,
							private slimLoadingBarService: SlimLoadingBarService,
							private muscleConverter: MuscleConverter,
							private toastrService: ToastrService,
							private machineService: MachineService,
							private cdRef:ChangeDetectorRef,
							private filterMachines:FilterMachines
							) {
	}

	ngOnInit() {
		this.machines = this.route.snapshot.data['machines'];
		this.filterArgs = '';
		this.filteredMachines = this.machines;
	}

	doFilterMachines(filtersArgs: string) {
		this.filterArgs = null;
		if (filtersArgs !== '') {
			this.filterArgs = filtersArgs;
			this.filteredMachines = this.filterMachines.transform(this.machines, filtersArgs);
		}else{
			this.filteredMachines = this.machines;
		}
	}

	openDetailsDialog(machine: Machine) {
		this.dialogService.addDialog(MachineDetailsDialogComponent, {machine: machine}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe(() => {
		});
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
							this.doFilterMachines(this.filterArgs);
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
		const mode = machine === undefined ? ModeDialogEnum.Add : ModeDialogEnum.Edit;
		let title: string;
		let titleConfirm: string;
		switch (mode) {
			case ModeDialogEnum.Add:
				title = `Ajout d'une machine`;
				titleConfirm = 'Ajouter';
				break;
			case ModeDialogEnum.Edit:
				title = `Edition d'une machine`;
				titleConfirm = 'Editer';
				break;
		}

		this.dialogService.addDialog(MachineFormDialogComponent, {
			machine: machine, mode: mode, title: title, titleConfirm: titleConfirm
		}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe((machineSaved) => {
			if (machineSaved) {
				if (mode === ModeDialogEnum.Add) {
					this.machines.push(machineSaved);
				} else {
					const indexFinded = this.machines.findIndex(m => m._id == machine._id);
					this.machines[indexFinded] = machineSaved;
				}
				this.doFilterMachines(this.filterArgs);
			}
		});
	}
}