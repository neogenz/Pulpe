import {Component, OnInit, ViewChild, trigger, state, transition, style, animate} from '@angular/core';
import {ProgramService} from "./program.service";
import {ActivatedRoute} from '@angular/router';
import {Program} from "../../_model/Program";
import {ExerciseGroupCodeConverter} from "../../shared/ExerciseGroupCodeConverter";
import {ExerciseGroupCode} from "../../shared/ExerciseGroupCodeConverter";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {Animations} from "../../shared/Animations";
import {Session} from "../../_model/Session";
import {SessionsService} from "../sessions/sessions.service";
import {MdSelectChange, MdTabChangeEvent, MdTabGroup} from "@angular/material";
import {LocalStorageService} from "angular-2-local-storage";
import {ExercisesGroup} from "../../_model/exercise/ExercisesGroup";
import {ObjectiveEnum} from "../../_enums/ObjectiveEnum";

@Component({
	selector: 'pulpe-program',
	templateUrl: './program.component.html',
	styleUrls: ['./program.component.scss'],
	animations: [Animations.fadeIn()]
})
export class ProgramComponent implements OnInit {
	@ViewChild(MdTabGroup) exercisesGroupTab: MdTabGroup;

	public createdAt: string;
	public totalTimeOfFocusedSession: string;
	public program: Program;
	public exerciseGroupLabels: ExerciseGroupCode[] = [];
	public focusedSession: Session;
	public focusedExercisesGroup: ExercisesGroup;
	public objectivesEnumProperties: any = {};

	constructor(private programService: ProgramService,
							private exerciseGroupCodeConverter: ExerciseGroupCodeConverter,
							private route: ActivatedRoute,
							private localStorageService: LocalStorageService,
							private sessionService: SessionsService) {
		this.objectivesEnumProperties[ObjectiveEnum[ObjectiveEnum.MassGainer]] = {
			pictureLink: '../../assets/img/exercise-types/strength-64.png'
		};
		this.objectivesEnumProperties[ObjectiveEnum[ObjectiveEnum.GeneralForm]] = {
			pictureLink: '../../assets/img/exercise-types/stationary-bike-64.png'
		};
		this.objectivesEnumProperties[ObjectiveEnum[ObjectiveEnum.WeightLoss]] = {
			pictureLink: '../../assets/img/exercise-types/weight-64.png'
		};
	}


	ngOnInit() {
		this.program = this.route.snapshot.data['program'];
		this.focusedSession = this.program.sessions[0];
		this.refreshConfigBy(this.focusedSession);
	}


	//todo replace by momentjs
	private convertNumberToStrHour(time: number): string {
		let strHour;
		let nbOfHours = Math.floor(time / 60);
		let nbOfMinutes = 0;
		if ((time / 60) % 1 !== 0) {
			nbOfMinutes = time % 60;
		}
		strHour = `${nbOfHours > 9 ? nbOfHours : '0' + nbOfHours }H${nbOfMinutes > 9 ? nbOfMinutes : '0' + nbOfMinutes }`;
		return strHour;
	}

	private refreshConfigBy(session: Session) {
		this.totalTimeOfFocusedSession = this.convertNumberToStrHour(this.sessionService.getTotalTimeOf(session));
		this.exerciseGroupLabels = this.exerciseGroupCodeConverter.convertThis(session.exercisesGroups);
		this.createdAt = session.createdAt.toLocaleDateString();
		this.focusedExercisesGroup = session.exercisesGroups[0];
		this.exercisesGroupTab.selectedIndex = 0;
	}

	public focusedSessionChanged(newValue: MdSelectChange): void {
		this.refreshConfigBy(newValue.value);
	}

	public refreshFocusedExercisesGroupBy(change: MdTabChangeEvent): void {
		this.focusedExercisesGroup = this.focusedSession.exercisesGroups[change.index];
	}

	public refreshProgramByExercise(exercise: AbstractExercise): void {
		let indexFinded;
		indexFinded = this.focusedExercisesGroup.exercises.findIndex(e => e.id == exercise.id);
		this.focusedExercisesGroup.exercises[indexFinded] = exercise;
		this.totalTimeOfFocusedSession = this.convertNumberToStrHour(this.sessionService.getTotalTimeOf(this.focusedSession));
		this.localStorageService.set('program', JSON.stringify(this.program));
	}
}
