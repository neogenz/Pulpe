import {ChangeDetectionStrategy, Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ExerciseGroupTypeFiltrable} from "../../../shared/ExerciseGroupTypeFiltrable";
import {AbstractExercise} from "../../../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../../_enums/ExerciseGroupTypeEnum";
import {DifficultyConverter} from "../../../shared/DifficultyConverter";

@Component({
  selector: 'pulpe-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush //http://blog.angular-university.io/how-does-angular-2-change-detection-really-work/
})
export class ExercisesListComponent extends ExerciseGroupTypeFiltrable implements OnInit {

  @Input() exercises: AbstractExercise[];
  @Input() displayOrder:boolean = false;
  @Output() editClick: EventEmitter<AbstractExercise> = new EventEmitter<AbstractExercise>();
  @Output() removeClick: EventEmitter<AbstractExercise> = new EventEmitter<AbstractExercise>();
  ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;

  constructor(public difficultyConverter: DifficultyConverter) {
    super();
  }

  ngOnInit() {
  }

  openExerciseFormDialogToEdit(exercise: AbstractExercise): void {
    this.editClick.emit(exercise);
  }

  deleteThis(exercise: AbstractExercise): void {
    this.removeClick.emit(exercise);
  }

}
