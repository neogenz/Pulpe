//todo refactor this view by ngClass and get class by intensity
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkedMuscle} from "../../../_model/WorkedMuscle";
import {DifficultyEnum} from "../../../_enums/DifficultyEnum";
import {Animations} from "../../Animations";
import {FormGroup} from "@angular/forms";

@Component({
  selector: 'pulpe-chips-removable-worked-muscle',
  templateUrl: './chips-removable-worked-muscle.component.html',
  styleUrls: ['./chips-removable-worked-muscle.component.scss'],
  animations: [Animations.fadeIn()]
})
export class ChipsRemovableWorkedMuscleComponent implements OnInit {

  @Input() workedMuscles: WorkedMuscle[];
  @Output() workedMuscleDeletedAtThisIndex = new EventEmitter<number>();

  difficultyEnum: any = DifficultyEnum;

  constructor() {
  }

  ngOnInit() {
  }

  deleteAt(index: number) {
    this.workedMuscleDeletedAtThisIndex.emit(index);
  }

}
