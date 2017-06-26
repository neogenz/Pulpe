import {Component, OnInit, Input, AfterContentInit} from '@angular/core';
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {ExerciseGroupTypeFiltrable} from "../../shared/ExerciseGroupTypeFiltrable";
import {DifficultyConverter} from "../../shared/DifficultyConverter";

@Component({
  selector: 'pulpe-exercise-preview',
  templateUrl: './exercise-preview.component.html',
  styleUrls: ['./exercise-preview.component.css']
})
export class ExercisePreviewComponent extends ExerciseGroupTypeFiltrable implements OnInit {

  public difficultyConverter:DifficultyConverter;

  constructor() {
    super();
    this.difficultyConverter = new DifficultyConverter();
  }

  ngOnInit() {
  }


  @Input() exercise: AbstractExercise;
  @Input() exercisesGroupRawCode: string;
}
