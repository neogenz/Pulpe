import {Component, Input, EventEmitter, OnInit, Output} from '@angular/core';
import {Session} from "../../../../_model/Session";
import {MdSelectChange} from "@angular/material";
import {AbstractExercise} from "../../../../_model/exercise/AbstractExercise";

@Component({
	selector: 'pulpe-header-list-sessions',
	templateUrl: './header-list-sessions.component.html',
	styleUrls: ['./header-list-sessions.component.scss']
})
export class HeaderListSessionsComponent implements OnInit {
	@Output() filterArgs = new EventEmitter<string>();
	@Output() filteredExercises = new EventEmitter<any>();
	@Input() nbElements: number;
	@Input() title: string;
	@Input() sessions: Session[];
	@Input() icon: string;
	@Input() placeHolderTitle: string;
	exercises: AbstractExercise[];
	focusedSession: Session;
	searchInput: string;

	constructor() {
	}

	ngOnInit() {
	}

	change() {
		this.filterArgs.emit(this.searchInput);
	}

	private refreshConfigBy(session: Session) {
		this.exercises = [];
		session.exercisesGroups.forEach((exerciseGroup) => {
			exerciseGroup.exercises.forEach((exercise) => {
				this.exercises.push(exercise);
			});
		});
	}

	public focusedSessionChanged(newValue: MdSelectChange): void {
		this.refreshConfigBy(newValue.value);
		this.filteredExercises.emit({exercises:this.exercises,session:this.focusedSession});
	}

}
