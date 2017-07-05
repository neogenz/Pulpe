import {Component, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {Animations} from "../../../shared/Animations";
import {ActivatedRoute} from "@angular/router";
import {Program} from "../../../_model/Program";
import {AbstractExercise} from "../../../_model/exercise/AbstractExercise";
import {FilterExercisesPipe} from "../../exercises/filter-exercises.pipe";
import {DialogService} from "ng2-bootstrap-modal";
import {ExerciseService} from "../../exercises/exercise.service";
import {ToastrService} from "ngx-toastr";
import {ExerciseOpenMode} from "../../exercises/exercises.component";
import {DeleteDialogComponent} from "../../../shared/dialogs/delete-dialog/delete-dialog.component";
import {Observable} from "rxjs/Observable";
import {Member} from "../../../_model/Member";
import {
	ExerciseFormConfigurable,
	ExerciseProgramFormDialogComponent
} from "./exercise-program-form-dialog/exercise-program-form-dialog.component";

@Component({
	selector: 'pulpe-program-member',
	templateUrl: './program-member.component.html',
	styleUrls: ['./program-member.component.scss'],
	animations: [Animations.fadeIn()],
	providers: [FilterExercisesPipe]
})
export class ProgramMemberComponent implements OnInit {
	public program: Program;
	public member: Member;
	public exercises: AbstractExercise[];
	public filteredExercises: AbstractExercise[];
	public filterArgs: string;
	public openableMode: any = ExerciseOpenMode;
	public exerciseFormConfiguration: ExerciseFormConfigurable;
	public pageTitle: string;

	constructor(public route: ActivatedRoute,
							private dialogService: DialogService,
							private exerciseService: ExerciseService,
							private toastrService: ToastrService,
							private filterExercises: FilterExercisesPipe) {
		this.exercises = [];
	}

	ngOnInit() {
		this.program = this.route.snapshot.data['program'];
		this.member = this.route.snapshot.data['member'];

		this.pageTitle = `Programme de l\'adhérent : ${this.member.lastName} ${this.member.firstName}`;
		this.program.sessions.forEach((session) => {
			session.exercisesGroups.forEach((exerciseGroup) => {
				exerciseGroup.exercises.forEach((exercise) => {
					this.exercises.push(exercise);
				});
			});
		});
		this.filteredExercises = this.exercises;
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

	private _openExerciseFormDialog() {
		this.dialogService.addDialog(ExerciseProgramFormDialogComponent, this.exerciseFormConfiguration, {
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
				this.doFilterExercises(this.filterArgs);
			}
		});
	}

	public deleteExercise(exercise: AbstractExercise) {
		this.dialogService.addDialog(DeleteDialogComponent, {
			id: exercise.id,
			title: 'Confirmation',
			description: `Êtes vous sur de vouloir supprimer l'exercice ${exercise.name} ?`
		}, {
			backdropColor: 'rgba(0,0,0,0.5)'
		}).flatMap((confirmed) => {
			if (confirmed) {
				return this.exerciseService.deleteThis(exercise);
			}
			return Observable.of(null);
		}).subscribe(deleted => {
			if (deleted) {
				this.toastrService.success('Suppression effectuée.', 'Succès!');
				this.exercises = this.exercises.filter(exercise => exercise.id !== deleted.id);
				this.doFilterExercises(this.filterArgs);
			}
		}, (errorMsg) => {
			console.error(errorMsg);
			this.toastrService.error(errorMsg, 'Erreur');
		})
	}

	private _setExerciseFormConfigurationToAdd(): void {
		this.exerciseFormConfiguration = {
			title: 'Ajouter un exercice',
			exercise: null,
			mode: ExerciseOpenMode.Add,
			sessions: this.program.sessions
		};
	}

	private _setExerciseFormConfigurationToEdit(exercise: AbstractExercise): void {
		this.exerciseFormConfiguration = {
			title: 'Modifier un exercice',
			exercise: exercise,
			mode: ExerciseOpenMode.Edit,
			sessions: this.program.sessions
		};
	}

	doFilterExercises(filtersArgs: string) {
		this.filterArgs = null;
		if (filtersArgs !== '') {
			this.filterArgs = filtersArgs;
			this.filteredExercises = this.filterExercises.transform(this.exercises, filtersArgs);
		} else {
			this.filteredExercises = this.exercises;
		}
	}

	doFilterSession(filteredExercises: AbstractExercise[]) {
		this.exercises = [];
		filteredExercises.forEach((exercise) => {
			this.exercises.push(exercise);
		});
		this.filteredExercises = this.exercises;
	}
}