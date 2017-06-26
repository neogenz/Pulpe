import {Component, Input, OnInit} from '@angular/core';
import {ExercisesGroup} from "../../_model/exercise/ExercisesGroup";
import {ExerciseGroupTypeFiltrable} from "../../shared/ExerciseGroupTypeFiltrable";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";

@Component({
  selector: 'pulpe-exercises-list',
  templateUrl: './exercises-list.component.html',
  styleUrls: ['./exercises-list.component.scss']
})
export class ExercisesListComponent extends ExerciseGroupTypeFiltrable implements OnInit {

  @Input() exercisesGroups: ExercisesGroup[];
  exercisesSizes: number = 0;
  exercises: AbstractExercise[] = [];

  constructor() {
    super();
  }

  ngOnInit() {
    this.exercisesGroups.forEach(exercisesGroup => {
      this.exercisesSizes += exercisesGroup.exercises.length;
      this.exercises = this.exercises.concat(exercisesGroup.exercises);
    });
  }

}
