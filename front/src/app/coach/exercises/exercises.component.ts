import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {ExercisesGroup} from "../../_model/exercise/ExercisesGroup";
import {Animations} from "../../shared/Animations";
import {ActivatedRoute} from "@angular/router";
import {
  ExerciseFormConfigurable,
  ExerciseFormDialogComponent
} from "./exercise-form-dialog/exercise-form-dialog.component";
import {DialogService} from "ng2-bootstrap-modal";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";

@Component({
  selector: 'pulpe-exercises',
  templateUrl: './exercises.component.html',
  styleUrls: ['./exercises.component.scss'],
  animations: [Animations.fadeIn()]
})
export class ExercisesComponent implements OnInit {

  exercises: AbstractExercise[];
  exerciseFormConfiguration: ExerciseFormConfigurable;
  openableMode: any = ExerciseOpenMode;
  filterArgs: string;

  constructor(public route: ActivatedRoute, private dialogService: DialogService, private cdRef: ChangeDetectorRef) {
    this.exercises = [];
  }

  ngOnInit() {
    const exercisesGroups: ExercisesGroup[] = this.route.snapshot.data['exercisesGroups'];
    exercisesGroups.forEach(exercisesGroup => {
      this.exercises = this.exercises.concat(exercisesGroup.exercises);
    });
  }


  public openExerciseFormDialogOnMode(mode: ExerciseOpenMode, exercise?: AbstractExercise) {
    switch (mode) {
      case ExerciseOpenMode.Add:
        this._setExerciseFormConfigurationToAdd();
        break;
      case ExerciseOpenMode.Edit:
        this._setExerciseFormConfigurationToEdit(exercise);
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

  private _setExerciseFormConfigurationToEdit(exercise: AbstractExercise): void {
    this.exerciseFormConfiguration = {
      title: 'Modifier un exercice',
      exercise: exercise,
      mode: ExerciseOpenMode.Edit
    };
  }


  private _openExerciseFormDialog() {
    this.dialogService.addDialog(ExerciseFormDialogComponent, this.exerciseFormConfiguration, {
      backdropColor: 'rgba(0,0,0,0.5)'
    }).subscribe((exerciseAdded) => {
      if (exerciseAdded) {
        if (this.exerciseFormConfiguration.mode == ExerciseOpenMode.Add) {
          const newExercisesArray = this.exercises.slice(0);
          newExercisesArray.push(exerciseAdded);
          this.exercises = newExercisesArray;
        } else {
          const indexFinded = this.exercises.findIndex(e => e.id == exerciseAdded.id);
          const newExercisesArray = this.exercises.slice(0);
          newExercisesArray[indexFinded] = exerciseAdded;
          this.exercises = newExercisesArray;
        }
      }
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