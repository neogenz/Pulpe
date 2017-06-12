import {Component, OnInit, Input} from '@angular/core';
import {Measurement} from "../../_model/Measurement";
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {MeasurementsAddDialogComponent} from '../../evolution/measurements-add-dialog/measurements-add-dialog.component';

@Component({
  selector: 'pulpe-measurements-list',
  templateUrl: 'measurements-list.component.html',
  styleUrls: ['measurements-list.component.css']
})
export class MeasurementsListComponent implements OnInit {
  @Input() measurements: Measurement[];
  selectedValue: string;
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
    let disposable = this.dialogService.addDialog(MeasurementsAddDialogComponent, {
        measurementsList: this.measurementsList
      }
    ).subscribe((isConfirmed) => {
      //We get dialog result
      if (isConfirmed) {
        console.log('accepted');
      }
      else {
        console.log('declined');
      }
    });
  }
}
