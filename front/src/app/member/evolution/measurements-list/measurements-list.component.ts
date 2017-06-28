import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Measurement} from "../../../_model/Measurement";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {MeasurementsAddDialogComponent} from '../measurements-add-dialog/measurements-add-dialog.component';
import {Animations} from "../../../shared/Animations";
import {Observable} from "rxjs/Observable";
import {Point} from "../../../_model/Point";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {MemberService} from "../../../_services/member/member.service";
import {Member} from "../../../_model/Member";

@Component({
	selector: 'pulpe-measurements-list',
	templateUrl: 'measurements-list.component.html',
	styleUrls: ['measurements-list.component.scss'],
	animations: [Animations.fadeIn()]
})
export class MeasurementsListComponent implements OnInit {
	@Input() member: Member;
	@Output() measurementsAdded = new EventEmitter<Measurement[]>();

	constructor(private dialogService: DialogService,
							private slimLoadingBarService: SlimLoadingBarService,
							private toastrService: ToastrService,
							private memberService: MemberService) {
	}

	ngOnInit() {
	}

	openDialogAddMeasurement() {
		this.dialogService.addDialog(MeasurementsAddDialogComponent, {measurements: this.member.measurements}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe((measurements) => {
			if (measurements) {
				this.member.measurements = measurements;
				this.measurementsAdded.emit(measurements);
			}
		});
	}
}
