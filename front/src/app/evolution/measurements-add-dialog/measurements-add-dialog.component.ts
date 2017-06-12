import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";

@Component({
  selector: 'pulpe-measurements-add-dialog',
  templateUrl: 'measurements-add-dialog.component.html',
  styleUrls: ['measurements-add-dialog.component.css']
})
export class MeasurementsAddDialogComponent extends DialogComponent<MeasurementAdd, boolean> implements MeasurementAdd, OnInit {
  title: string;
  message: string;
  measurementsList: any;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  confirm() {
    // we set dialog result as true on click on confirm button,
    // then we can get dialog result from caller code
    this.result = true;
    this.close();
  }

  ngOnInit(): void {
  }
}


export interface MeasurementAdd {
  title: string;
  message: string;
  measurementsList: any;
}