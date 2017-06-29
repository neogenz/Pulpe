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
import {MeasurementConverter} from "../../shared/MeasurementConverter";
import {EvolutionService} from "./evolution.service";

@Component({
	selector: 'pulpe-evolution',
	templateUrl: 'evolution.component.html',
	styleUrls: ['evolution.component.scss'],
	animations: [Animations.fadeIn()]
})
export class EvolutionComponent implements OnInit {

	memberRequest: Observable<Point[]> = new Observable();
	measurementRequest: Observable<Point[]> = new Observable();
	member: Member;
	previsionsPoints: Point[];
	evolutionMeasurementPoints: Point[];
	measurementsLabel: string[];
	focusedMeasurement: string;

	constructor(private route: ActivatedRoute,
							private slimLoadingBarService: SlimLoadingBarService,
							private toastrService: ToastrService,
							private memberService: MemberService,
							private evolutionService: EvolutionService,
							private measurementConverter: MeasurementConverter) {
	}

	ngOnInit() {
		this.member = this.route.snapshot.data['member'];
		this.previsionsPoints = this.route.snapshot.data['efficientPrevisions'];
		this.measurementsLabel = this.measurementConverter.toLabelArray();
	}

  findPrevisionsPoints() {
    if (this.member.createdAt) {
      this.memberRequest = this.memberService.findEfficientPrevisions(this.member._id);
      this.slimLoadingBarService.start();
      this.memberRequest
        .finally(() => {
          this.slimLoadingBarService.complete();
        })
        .subscribe((previsionsPoints) => {
            this.previsionsPoints = previsionsPoints;
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
}
