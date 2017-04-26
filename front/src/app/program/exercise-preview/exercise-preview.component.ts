import { Component, OnInit, Input } from '@angular/core';
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {MassGainerExercise} from '../../_model/exercise/MassGainerExercise';
import {CardioExercise} from "../../_model/exercise/CardioExercise";
import {OrganizedExercise} from "../../_model/exercise/OrganizedExercise";
import {StretchingExercise} from "../../_model/exercise/StretchingExercise";
import {DifficultyConverter} from "../../shared/DifficultyConverter";

@Component({
  selector: 'pulpe-exercise-preview',
  templateUrl: './exercise-preview.component.html',
  styleUrls: ['./exercise-preview.component.css']
})
export class ExercisePreviewComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {
    console.log(this.exerciseGroupRawCode);
  }

  @Input() exercise:AbstractExercise;
  @Input() exerciseGroupRawCode:string;

  public isMassGainer(exercise:AbstractExercise):boolean {
    return exercise instanceof MassGainerExercise;
  }

  public isCardio(exercise:AbstractExercise):boolean {
    return exercise instanceof CardioExercise;
  }

  public isOrganized(exercise:AbstractExercise):boolean {
    return exercise instanceof OrganizedExercise;
  }

  public isStretching(exercise:AbstractExercise):boolean {
    return exercise instanceof StretchingExercise;
  }
}
