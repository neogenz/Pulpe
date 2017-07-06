import {Component, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
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
import {HeaderListSessionsComponent} from "./header-list-sessions/header-list-sessions.component";
import {Session} from "../../../_model/Session";
import {ExerciseGroupCode} from "../../../shared/ExerciseGroupCodeConverter";
import {ExerciseGroupTypeEnum} from "../../../_enums/ExerciseGroupTypeEnum";
import {ExercisesGroup} from "../../../_model/exercise/ExercisesGroup";

@Component({
	selector: 'pulpe-program-member',
	templateUrl: './program-member.component.html',
	styleUrls: ['./program-member.component.scss'],
	animations: [Animations.fadeIn()],
	providers: [FilterExercisesPipe]
})
export class ProgramMemberComponent implements OnInit {
	@ViewChild(HeaderListSessionsComponent)
	private headerlistComponent: HeaderListSessionsComponent;

	public program: Program;
	public member: Member;
	public exercises: AbstractExercise[];
	public filteredExercises: AbstractExercise[];
	public filterArgs: string;
	public openableMode: any = ExerciseOpenMode;
	public exerciseFormConfiguration: ExerciseFormConfigurable;
	public pageTitle: string;
	public focusedSession: Session;

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
		this.focusedSession = null;
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
		}).subscribe((result) => {
			if (result.exercise) {
				if (this.exerciseFormConfiguration.mode == ExerciseOpenMode.Add) {

					if (this.focusedSession && this.focusedSession.id === result.session.id) {
						let eg = this.focusedSession.exercisesGroups.find(eg => eg.groupType === ExerciseGroupTypeEnum[result.exercise.type]);
						if (!eg) {
							this.focusedSession.exercisesGroups.push(new ExercisesGroup(ExerciseGroupTypeEnum[result.exercise.type], [result.exercise]))
						}
						eg.addOne(result.exercise);
						this.filteredExercises.push(result.exercise);
						this.doFilterSession({exercises: this.filteredExercises, session: this.focusedSession});
					} else {
						for (let i = 0; i < this.program.sessions.length; i++) {
							if (this.program.sessions[i].id === result.session.id) {
								let eg = this.program.sessions[i].exercisesGroups.find(eg => eg.groupType === ExerciseGroupTypeEnum[result.exercise.type]);
								if (!eg) {
									this.program.sessions[i].exercisesGroups.push(new ExercisesGroup(ExerciseGroupTypeEnum[result.exercise.type], [result.exercise]))
								}
								eg.addOne(result.exercise);
							}
						}
					}

				} else {
					const indexFinded = this.exercises.findIndex(e => e.id == result.exercise.id);
					const newExercisesArray = this.exercises.slice(0);
					newExercisesArray[indexFinded] = result.exercise;
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

	doFilterSession(sessionAndExercises: any) {
		this.exercises = [];
		this.focusedSession = sessionAndExercises.session;
		sessionAndExercises.exercises.forEach((exercise) => {
			this.exercises.push(exercise);
		});
		this.filteredExercises = this.exercises;
	}
}