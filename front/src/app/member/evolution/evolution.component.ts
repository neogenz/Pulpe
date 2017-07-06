import {Component, OnInit} from '@angular/core';
import {Member} from "../../_model/Member";
import {ActivatedRoute} from "@angular/router";
import {Animations} from "../../shared/Animations";
import {Point} from "../../_model/Point";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {MemberService} from "../../_services/member.service";
import {MeasurementConverter} from "../../shared/MeasurementConverter";
import {EvolutionService} from "./evolution.service";
import {environment} from "../../../environments/environment";
import {DemoService} from "../../_services/demo.service";
import {HomeCoachService} from "../../coach/home-coach/home-coach.service";

@Component({
	selector: 'pulpe-evolution',
	templateUrl: 'evolution.component.html',
	styleUrls: ['evolution.component.scss'],
	animations: [Animations.fadeIn()],
	providers: [DemoService]
})
export class EvolutionComponent implements OnInit {
	memberRequest: Observable<Point[]> = new Observable();
	measurementRequest: Observable<Point[]> = new Observable();
	member: Member;
	previsionsPoints: Point[];
	evolutionMeasurementPoints: Point[];
	measurementsLabel: string[];
	focusedMeasurement: string;
	demo: boolean = environment.demo;

	constructor(private route: ActivatedRoute,
							private slimLoadingBarService: SlimLoadingBarService,
							private toastrService: ToastrService,
							private memberService: MemberService,
							private evolutionService: EvolutionService,
							private measurementConverter: MeasurementConverter,
							private demoService: DemoService) {
	}

	ngOnInit() {
		this.member = this.route.snapshot.data['member'];
		this.previsionsPoints = this.route.snapshot.data['efficientPrevisions'];
		this.measurementsLabel = this.measurementConverter.toLabelArray();
	}

	findPrevisionsPoints() {
		if (this.member.createdAt) {
			this.memberRequest = this.memberService.findEfficientPrevisions();
			this.slimLoadingBarService.start();
			this.memberRequest
				.finally(() => {
					this.slimLoadingBarService.complete();
				})
				.subscribe((previsionsPoints) => {
						this.previsionsPoints = previsionsPoints;

						// In order to destroy measurementGraphComponent
						this.focusedMeasurement = null;
						this.evolutionMeasurementPoints = null;
					},
					(errorMsg) => {
						console.error(errorMsg);
						this.toastrService.error(errorMsg, 'Erreur');
					}
				);
		}
	}

	findEvolutionOfMeasurement() {
		let measurementName: string;
		measurementName = this.measurementConverter.getNameFrom(this.focusedMeasurement);
		this.measurementRequest = this.evolutionService.findEvolutionBy(measurementName);
		this.slimLoadingBarService.start();
		this.measurementRequest
			.finally(() => {
				this.slimLoadingBarService.complete();
			})
			.subscribe((evolutionMeasurementPoints) => {
					this.evolutionMeasurementPoints = evolutionMeasurementPoints;
				},
				(errorMsg) => {
					console.error(errorMsg);
					this.toastrService.error(errorMsg, 'Erreur');
				}
			);
		// In order to destroy measurementGraphComponent
		this.evolutionMeasurementPoints = null;
	}

	populateDemoData(): void {
		this.slimLoadingBarService.start();
		this.demoService.generateDemoDataOnAuthenticatedMember()
			.flatMap(() => {
				return this.memberService.findById(this.member._id);
			}).finally(() => {
		}).subscribe(member => {
			this.member = member;
			this.findPrevisionsPoints();
		}, error => {
		});
	}
}
