import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {Session} from "../../_model/Session";
import {Animations} from "../../shared/Animations";
import {MuscleConverter} from "../../shared/MuscleConverter";

@Component({
	selector: 'pulpe-sessions',
	templateUrl: 'sessions.component.html',
	styleUrls: ['sessions.component.scss'],
	animations: [Animations.fadeIn()]
})
export class SessionsComponent implements OnInit {
	public session: Session;
	public musclesMostWorked: string[] = [];

	constructor(private muscleConverter: MuscleConverter,
							private route: ActivatedRoute) {
	}


	ngOnInit() {
		this.session = this.route.snapshot.data['sessions'];
		this.session.mainMusclesGroup.forEach((m) => {
			this.musclesMostWorked.push(this.muscleConverter.getFrom(m));
		});
	}
}
