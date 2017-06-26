import {Component, OnInit} from '@angular/core';
import {ExercisesGroup} from "../_model/exercise/ExercisesGroup";
import {Animations} from "../shared/Animations";
import {ActivatedRoute} from "@angular/router";
import {
	ExerciseFormConfigurable,
	ExerciseFormDialogComponent
} from "./exercise-form-dialog/exercise-form-dialog.component";
import {DialogService} from "ng2-bootstrap-modal";

@Component({
	selector: 'pulpe-exercises',
	templateUrl: './exercises.component.html',
	styleUrls: ['./exercises.component.scss'],
	animations: [Animations.fadeIn()]
})
export class ExercisesComponent implements OnInit {
	exercisesGroups: ExercisesGroup[];
	exercisesSizes: number = 0;
	exerciseFormConfiguration: ExerciseFormConfigurable;
	openableMode: any = ExerciseOpenMode;
	filterArgs: string;

	constructor(public route: ActivatedRoute, private dialogService: DialogService) {
		this.exerciseFormConfiguration = {
			title: ''
		};
	}

	ngOnInit() {
		this.exercisesGroups = this.route.snapshot.data['exercisesGroups'];
		this.exercisesGroups.forEach(exercisesGroup => {
			this.exercisesSizes += exercisesGroup.exercises.length
		});
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
			title: 'Ajouter un exercice'
		};
	}

	private _setExerciseFormConfigurationToEdit(): void {
		this.exerciseFormConfiguration = {
			title: 'Modifier un exercice'
		};
	}

	filterArgsChanged(filtersArgs: string) {
		this.filterArgs = null;
		if (filtersArgs !== '') {
			this.filterArgs = filtersArgs;
		}
	}

	private _openExerciseFormDialog() {
		this.dialogService.addDialog(ExerciseFormDialogComponent, {
			title: this.exerciseFormConfiguration.title
		}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).subscribe((machineSaved) => {
			// if (machineSaved) {
			//   if (this.openableMode === ExerciseOpenMode.Add) {
			//     this.machines.push(machineSaved);
			//   } else {
			//     const indexFinded = this.machines.findIndex(m => m._id == machine._id);
			//     this.machines[indexFinded] = machineSaved;
			//   }
			// }
		});
	}
}

enum ExerciseOpenMode{
	Add,
	Edit
}