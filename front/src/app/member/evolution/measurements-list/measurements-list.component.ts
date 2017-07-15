import {Component, OnInit, Input, EventEmitter, Output} from '@angular/core';
import {Measurement} from "../../../_model/Measurement";
import {DialogService} from "ng2-bootstrap-modal";
import {MeasurementsAddDialogComponent} from '../measurements-add-dialog/measurements-add-dialog.component';
import {Animations} from "../../../shared/Animations";
import {MeasurementEnum} from "../../../_enums/MeasurementEnum";
import {Member} from "../../../_model/Member";
import {MeasurementConverter} from "../../../shared/MeasurementConverter";

@Component({
  selector: 'pulpe-measurements-list',
  templateUrl: 'measurements-list.component.html',
  styleUrls: ['measurements-list.component.scss'],
  animations: [Animations.fadeIn()]
})
export class MeasurementsListComponent implements OnInit {
  @Input() member: Member;
  @Output() measurementsAdded = new EventEmitter<Measurement[]>();
  public MeasurementEnum:any = MeasurementEnum;

  constructor(private dialogService: DialogService,
              public measurementConverter: MeasurementConverter) {
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
