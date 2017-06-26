import {Component, OnInit} from '@angular/core';
import {Machine} from "../_model/Machine";
import {DialogService} from "ng2-bootstrap-modal";
import {ActivatedRoute} from "@angular/router";
import {Animations} from "../shared/Animations";
import {MachineFormDialogComponent} from "./machine-form-dialog/machine-form-dialog.component";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";
import {MuscleConverter} from "../shared/MuscleConverter";
import {DeleteDialogComponent} from "../shared/dialogs/delete-dialog/delete-dialog.component";

@Component({
	selector: 'pulpe-machines',
	templateUrl: './machines.component.html',
	styleUrls: ['./machines.component.scss'],
	animations: [Animations.fadeIn()]
})
export class MachinesComponent implements OnInit {
	private authenticationProfile: AuthenticationProfile;
	private machines: Machine[];
	filterArgs: string;

	constructor(private route: ActivatedRoute, private dialogService: DialogService, private muscleConverter: MuscleConverter) {
	}

	ngOnInit() {
		this.machines = this.route.snapshot.data['machines'];
		this.filterArgs = '';
	}

	openDeleteDialog(machine) {
		const title = `Supression d'une machine`;
		const description = `Souhaitez-vous vraiment supprimer la machine : ${machine.name} ?`;
		this.dialogService.addDialog(DeleteDialogComponent, {
			id: machine._id, title: title, description: description
		}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe((id) => {

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
