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

	openMachineFormDialog(idMachine: string) {
		let machine: Machine;
		if (idMachine) {
			machine = this.machines.find(m => m._id == idMachine);
		}
		const mode = !machine ? 'edit' : 'add';

		this.dialogService.addDialog(MachineFormDialogComponent, {
				machine: machine,
				mode: mode
			}, {backdropColor: 'rgba(0,0,0,0.5)'}
		).subscribe((machineSaved) => {
			if (machineSaved) {
				const indexFinded = this.machines.findIndex(m => m._id == machine._id);
				this.machines[indexFinded] = machineSaved;
			}
		});
	}
}
