import {Component, OnInit} from '@angular/core';
import {Program} from "../../_model/Program";
import {Member} from "../../_model/Member";
import {ActivatedRoute} from "@angular/router";
import {Animations} from "../../shared/Animations";
import {Point} from "../../_model/Point";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {MemberService} from "../../_services/member/member.service";

@Component({
	selector: 'pulpe-evolution',
	templateUrl: 'evolution.component.html',
	styleUrls: ['evolution.component.scss'],
	animations: [Animations.fadeIn()]
})
export class EvolutionComponent implements OnInit {
	memberRequest: Observable<Point[]> = new Observable();
	member: Member;
	previsionsPoints: Point[];

	constructor(private route: ActivatedRoute,
							private slimLoadingBarService: SlimLoadingBarService,
							private toastrService: ToastrService,
							private memberService: MemberService) {
	}

	ngOnInit() {
		this.member = this.route.snapshot.data['member'];
		this.previsionsPoints = this.route.snapshot.data['efficientPrevisions'];
	}

	findPrevisionsPoints() {
		this.memberRequest = this.memberService.findEfficientPrevisions(this.member._id);
		this.slimLoadingBarService.start();
		this.memberRequest
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((previsionsPoints) => {
					debugger;
					this.previsionsPoints = previsionsPoints;
				},
				(errorMsg) => {
					console.error(errorMsg);
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
	}
}
