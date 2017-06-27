import {Component, Input, OnInit} from '@angular/core';
import {ExercisesGroup} from "../../../_model/exercise/ExercisesGroup";
import {ExerciseGroupTypeFiltrable} from "../../../shared/ExerciseGroupTypeFiltrable";
import {AbstractExercise} from "../../../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeEnum} from "../../../_enums/ExerciseGroupTypeEnum";
import {DifficultyConverter} from "../../../shared/DifficultyConverter";

@Component({
  selector: 'pulpe-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss']
})
export class ExercisesListComponent extends ExerciseGroupTypeFiltrable implements OnInit {

  @Input() exercises: AbstractExercise[];
  @Input() filterArgs:string;
  exercisesSizes: number = 0;
  ExerciseGroupTypeEnum: any = ExerciseGroupTypeEnum;

  constructor(public difficultyConverter: DifficultyConverter) {
    super();
  }

  ngOnInit() {
    this.exercisesSizes = this.exercises.length;
  }

}
