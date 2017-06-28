import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Animations} from "../../../shared/Animations";
import {MemberService} from "../../../_services/member/member.service";
import {Member} from "../../../_model/Member";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {Point} from "../../../_model/Point";
import {BaseChartDirective} from "ng2-charts";

@Component({
	selector: 'pulpe-efficient-line-graph',
	templateUrl: 'efficient-line-graph.component.html',
	styleUrls: ['efficient-line-graph.component.scss'],
	animations: [Animations.fadeIn()]
})
export class EfficientLineGraphComponent implements OnInit, OnChanges, AfterViewInit {
	@ViewChild(BaseChartDirective) chartDirective = null;

	@Input() member: Member;
	@Input() previsionsPoints: Point[];
	private initialized = false;
	public lineChartLabels: Array<any>;
	public lineChartType: string;
	public pieChartType: string;
	public pieChartLabels: string[];
	public pieChartData: number[];
	public lineChartData: Array<any>;
	public lineChartOptions: any;

	constructor() {
	}

	ngOnInit() {
		this.initialized = true;
		this.lineChartOptions = this.getLineChartOptions();
		this.lineChartType = 'line';
		this.pieChartType = 'pie';
		this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
		this.lineChartLabels = [];
		this.lineChartData = [];
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.initialized) {
			this.lineChartData = [];
			this.lineChartLabels = [];
			this.previsionsPoints.forEach((point) => {
				this.lineChartData.push(point.percentage);
				this.lineChartLabels.push(point.date);
			});
			this.chartDirective.updateChartData(this.lineChartData);
			this.chartDirective.chart.update();
		}
	}

	ngAfterViewInit(): void {
		this.previsionsPoints.forEach((point) => {
			this.lineChartData.push(point.percentage);
			this.lineChartLabels.push(point.date);
		});
		this.chartDirective.updateChartData(this.lineChartData);
		this.chartDirective.chart.update();
	}

	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	getLineChartOptions() {
		return {
			responsive: true,
			maintainAspectRatio: false,
			legend: {
				display: false,
				labels: {
					fontColor: 'white'
				}
			},
			scales: {
				xAxes: [{
					display: true,
					gridLines: {
						display: false,
						color: "#FFFFFF"
					},
					fontColor: "#fff",
					ticks: {
						fontColor: "#fff", // this here
					},
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Pourcentage',
						fontColor: 'white'
					},
					display: true,
					gridLines: {
						color: "rgba(255,255,255,0.3)"
					},
					ticks: {
						max: 100,
						min: 0,
						fontColor: "#fff", // this here
					},
				}],
			}
		};
	}
}
