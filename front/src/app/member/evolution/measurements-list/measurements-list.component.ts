import {Component, OnInit, Input} from '@angular/core';
import {Measurement} from "../../../_model/Measurement";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {MeasurementsAddDialogComponent} from '../measurements-add-dialog/measurements-add-dialog.component';
import {Animations} from "../../../shared/Animations";

@Component({
  selector: 'pulpe-measurements-list',
  templateUrl: 'measurements-list.component.html',
  styleUrls: ['measurements-list.component.css'],
  animations: [Animations.fadeIn()]
})
export class MeasurementsListComponent implements OnInit {
  @Input() measurements: Measurement[];
  measurementsList: any;

  constructor(private dialogService: DialogService) {
  }

  ngOnInit() {
    this.measurementsList = [
      {value: 'WEIGHT', name: 'Poids'},
      {value: 'HIP', name: 'Tour de Hanche'},
      {value: 'WAIST', name: 'Tour de taille'},
      {value: 'CHEST', name: 'Tour de poitrine'},
      {value: 'SHOULDERS', name: 'Epaules'},
      {value: 'RIGHTARM', name: 'Bras droit'},
      {value: 'LEFTARM', name: 'Bras gauche'},
      {value: 'RIGHTCALF', name: 'Mollet droite'},
      {value: 'LEFTCALF', name: 'Mollet gauche'},
      {value: 'RIGHTTHIGH', name: 'Cuisse droite'},
      {value: 'LEFTTHIGH', name: 'Cuisse gauche'},
    ];
  }

  openDialogAddMeasurement() {
    this.dialogService.addDialog(MeasurementsAddDialogComponent, {measurements: this.measurements}, {
      backdropColor: 'rgba(0,0,0,0.5)'
    }).subscribe((measurements) => {
      if (measurements) {
        this.measurements = measurements;
      }
    });
  }
}
