import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Machine} from "../../../_model/Machine";
import {MachineService} from "../../../_services/machine/machine.service";
import {Animations} from "../../Animations";
import {ToastrService} from "ngx-toastr";

@Component({
  selector: 'pulpe-select-machines',
  templateUrl: './select-machines.component.html',
  styleUrls: ['./select-machines.component.scss'],
  animations: [Animations.fadeIn()]
})
export class SelectMachinesComponent implements OnInit {

  @Input()
  selectableMachines: Machine[];
  @Input()
  selectedMachines: Machine[];
  @Output() machineDeletedAtThisIndex: EventEmitter<number> = new EventEmitter<number>();
  @Output() machineAdded: EventEmitter<Machine> = new EventEmitter<Machine>();

  machineForm: FormGroup;
  machineSelectedCtrl: FormControl;
  machine: Machine;
  errorTranslations: any;

  constructor(private fb: FormBuilder, private machineService: MachineService, private toastrService: ToastrService) {
  }

  ngOnInit() {
    if (!Array.isArray(this.selectableMachines)) {
      this.machineService.findAllByCoachAuthenticated().subscribe((machines) => {
          this.selectableMachines = machines;
        },
        error => {
          console.error(error);
        });
    }
    if (!Array.isArray(this.selectedMachines)) {
      this.selectedMachines = [];
    }
    this.errorTranslations = {
      workedMuscle: {
        alreadyExist: 'Cette machine est déjà présente pour cet exercice.'
      }
    };
    this.machine = null;
    this.buildForm();
  }

  buildForm(): void {
    this.machineSelectedCtrl = this.fb.control(this.machine, Validators.required);
    this.machineForm = this.fb.group({
      machineSelected: this.machineSelectedCtrl
    });
  }

  add(): void {
    let isOnError = false;
    for (let i = 0; i < this.selectedMachines.length; i++) {
      if (this.selectedMachines[i].isSame(this.machineSelectedCtrl.value)) {
        this.toastrService.error(this.errorTranslations.workedMuscle.alreadyExist, 'Erreur');
        isOnError = true;
      }
    }
    if (!isOnError) {
      this.machineAdded.emit(this.machineSelectedCtrl.value);
    }
  }

  deleteAtThisIndex(index: number): void {
    this.machineDeletedAtThisIndex.emit(index);
  }
}

export interface UsedMachineSelectable{
  usedMachinesCtrl: FormArray;
  errorTranslations: any;

  _initUsedMachineControl(machine: Machine): FormControl;
  deleteUsedMachineAtThis(index: number): void;
  addUsedMachine(machineToAdd: Machine): void;
}
