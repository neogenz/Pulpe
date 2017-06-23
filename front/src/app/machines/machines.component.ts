import {Component, OnInit} from '@angular/core';
import {Machine} from "../_model/Machine";
import {DialogService} from "ng2-bootstrap-modal";
import {ActivatedRoute} from "@angular/router";
import {Animations} from "../shared/Animations";
import {MachineFormDialogComponent} from "./machine-form-dialog/machine-form-dialog.component";
import {Gym} from "../_model/Gym";
import {AuthenticationService} from "../_services/authentication/authentication.service";
import {AuthenticationProfile} from "../_model/AuthenticationProfile";

@Component({
	selector: 'pulpe-machines',
	templateUrl: './machines.component.html',
	styleUrls: ['./machines.component.css'],
	animations: [Animations.fadeIn()]
})
export class MachinesComponent implements OnInit {
	private authenticationProfile: AuthenticationProfile;
	private machines: Machine[];
	filterArgs: string;

	constructor(private route: ActivatedRoute, private dialogService: DialogService) {
	}

	ngOnInit() {
		this.machines = this.route.snapshot.data['machines'];
		this.filterArgs = '';
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
