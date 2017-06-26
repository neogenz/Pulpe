import {Component, OnInit, Input} from '@angular/core';
import {Coach} from "../../../_model/Coach";

@Component({
	selector: 'pulpe-profile-infos-coach',
	templateUrl: 'profile-infos-coach.component.html',
	styleUrls: ['profile-infos-coach.component.scss']
})
export class ProfileInfosCoachComponent implements OnInit {
	@Input() coach: Coach;

	constructor() {
	}

	ngOnInit() {
	}

}
