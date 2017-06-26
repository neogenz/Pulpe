import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {DialogService} from "ng2-bootstrap-modal";
import {Coach} from "../../_model/Coach";
import {Animations} from "../../shared/Animations";

@Component({
	selector: 'pulpe-profile-coach',
	templateUrl: 'profile-coach.component.html',
	styleUrls: ['profile-coach.component.scss'],
	animations: [Animations.fadeIn()]
})
export class ProfileCoachComponent implements OnInit {
	private coach: Coach;

	constructor(private route: ActivatedRoute, private dialogService: DialogService) {
	}

	ngOnInit() {
		this.coach = this.route.snapshot.data['profile'];
	}

}