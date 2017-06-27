import {Component, OnInit} from '@angular/core';
import {ExercisesGroup} from "../../_model/exercise/ExercisesGroup";
import {Animations} from "../../shared/Animations";
import {ActivatedRoute} from "@angular/router";
import {
  ExerciseFormConfigurable,
  ExerciseFormDialogComponent
} from "./exercise-form-dialog/exercise-form-dialog.component";
import {DialogService} from "ng2-bootstrap-modal";
import {ExerciseGroupTypeEnum} from "../../_enums/ExerciseGroupTypeEnum";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";

@Component({
  selector: 'pulpe-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  animations: [Animations.fadeIn()]
})
export class ExercisesComponent implements OnInit {

  exercises: AbstractExercise[];
  exercisesSizes: number = 0;
  exerciseFormConfiguration: ExerciseFormConfigurable;
  openableMode: any = ExerciseOpenMode;
  filterArgs: string;

  constructor(public route: ActivatedRoute, private dialogService: DialogService) {
    this.exercises = [];
  }

  ngOnInit() {
    const exercisesGroups:ExercisesGroup[] = this.route.snapshot.data['exercisesGroups'];
    exercisesGroups.forEach(exercisesGroup => {
      this.exercises = this.exercises.concat(exercisesGroup.exercises);
    });
    this.exercisesSizes = this.exercises.length;
  }


  public openExerciseFormDialogOnMode(mode: ExerciseOpenMode) {
    switch (mode) {
      case ExerciseOpenMode.Add:
        this._setExerciseFormConfigurationToAdd();
        break;
      case ExerciseOpenMode.Edit:
        this._setExerciseFormConfigurationToEdit();
        break;
      default:
        throw new Error('Open mode to exercise form is unknown.');
    }
    this._openExerciseFormDialog();
  }

  private _setExerciseFormConfigurationToAdd(): void {
    this.exerciseFormConfiguration = {
      title: 'Ajouter un exercice',
      exercise: null,
      mode: ExerciseOpenMode.Add
    };
  }

  private _setExerciseFormConfigurationToEdit(): void {
    this.exerciseFormConfiguration = {
      title: 'Modifier un exercice',
      exercise: null,
      mode: ExerciseOpenMode.Edit
    };
  }


  private _openExerciseFormDialog() {
    this.dialogService.addDialog(ExerciseFormDialogComponent, this.exerciseFormConfiguration, {
      backdropColor: 'rgba(0,0,0,0.5)'
    }).subscribe((exerciseAdded) => {
      this.exercises.push(exerciseAdded);
    });
  }

  filterArgsChanged(filtersArgs: string) {
    this.filterArgs = null;
    if (filtersArgs !== '') {
      this.filterArgs = filtersArgs;
    }
  }
}

export enum ExerciseOpenMode{
  Add,
  Edit
}