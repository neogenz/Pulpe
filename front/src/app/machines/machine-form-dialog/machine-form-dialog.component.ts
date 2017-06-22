import {Component, OnInit} from '@angular/core';
import {DialogComponent, DialogService} from "ng2-bootstrap-modal";
import {FormBuilder, FormGroup, FormControl, Validators} from "@angular/forms";
import {ActivatedRoute} from "@angular/router";
import {Machine} from "../../_model/Machine";
import {Animations} from "../../shared/Animations";

@Component({
  selector: 'pulpe-machine-form-dialog',
  templateUrl: 'machine-form-dialog.component.html',
  styleUrls: ['machine-form-dialog.component.css'],
  animations: [Animations.fadeIn()]
})
export class MachineFormDialogComponent extends DialogComponent<MachineForm, Machine> implements MachineForm, OnInit {
  machine: Machine;
  mode: string;
  machineForm: FormGroup;
  nameCtrl: FormControl;

  constructor(dialogService: DialogService, private fb: FormBuilder, private route: ActivatedRoute) {
    super(dialogService);
  }

  ngOnInit() {
    if (!this.machine) {
      this.machine = Machine.of()
        .name('')
        .workedMuscles([])
        .build();
    }
    this.nameCtrl = this.fb.control(this.machine.name, Validators.required);
    this.machineForm = this.fb.group({
      name: this.nameCtrl
    });
  }

  add() {

  }

  edit() {

  }
}

export interface MachineForm {
  machine: any;
  mode: any;
}