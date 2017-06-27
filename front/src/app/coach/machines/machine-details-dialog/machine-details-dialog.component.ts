import { Component, OnInit } from '@angular/core';
import {DialogService, DialogComponent} from "ng2-bootstrap-modal";
import {Machine} from "../../../_model/Machine";

@Component({
  selector: 'pulpe-machine-details-dialog',
  templateUrl: 'machine-details-dialog.component.html',
  styleUrls: ['machine-details-dialog.component.scss']
})
export class MachineDetailsDialogComponent extends DialogComponent<IDetails, null> implements IDetails, OnInit {
  machine: Machine;

  constructor(dialogService: DialogService) {
    super(dialogService);
  }

  ngOnInit() {
  }

}

export interface IDetails {
  machine: Machine;
}