//todo refactor this view by ngClass and get class by intensity
import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {WorkedMuscle} from "../../../_model/WorkedMuscle";
import {DifficultyEnum} from "../../../_enums/DifficultyEnum";
import {Animations} from "../../Animations";

@Component({
  selector: 'pulpe-chips-removable-worked-muscle',
  templateUrl: './chips-removable-worked-muscle.component.html',
  styleUrls: ['./chips-removable-worked-muscle.component.scss'],
  animations: [Animations.fadeIn()]
})
export class ChipsRemovableWorkedMuscleComponent implements OnInit {

  @Input() workedMuscles: WorkedMuscle[];
  @Output() workedMuscleDeleted = new EventEmitter<WorkedMuscle>();

  difficultyEnum: any = DifficultyEnum;

  constructor() {
  }

  ngOnInit() {
  }

  deleteThis(workedMuscle: WorkedMuscle) {
    this.workedMuscleDeleted.emit(workedMuscle);
  }

}
