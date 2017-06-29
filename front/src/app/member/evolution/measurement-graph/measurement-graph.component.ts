import {AfterViewInit, Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {BaseChartDirective} from "ng2-charts";
import {Point} from "../../../_model/Point";
import {Animations} from "../../../shared/Animations";

@Component({
	selector: 'pulpe-measurement-graph',
	templateUrl: './measurement-graph.component.html',
	styleUrls: ['./measurement-graph.component.scss'],
	animations: [Animations.fadeIn()]
})
export class MeasurementGraphComponent implements OnInit, OnChanges, AfterViewInit {
	@ViewChild(BaseChartDirective) chartDirective = null;

	@Input() evolutionMeasurementPoints: Point[];
	@Input() measurementName: string;
	public backgroundColor: string;
	private initialized = false;
	public lineChartLabels: Array<any>;
	public chartType: string = 'line';
	public lineChartData: Array<any> = [{
		data: []
	}];
	public lineChartOptions: any;

	constructor() {
	}

	ngOnInit() {
		this.initialized = true;
		if (this.evolutionMeasurementPoints && this.evolutionMeasurementPoints.length > 0) {
			this.backgroundColor = this.getBackgroundColor();
			this.lineChartOptions = this.getLineChartOptions();
			this.lineChartLabels = this.buildChartLabelsFromThis(this.evolutionMeasurementPoints);
			this.lineChartData[0].data = this.buildChartDataFromThis(this.evolutionMeasurementPoints);
		}
	}

	ngOnChanges(changes: SimpleChanges): void {
		if (this.initialized) {
			if (this.evolutionMeasurementPoints && this.evolutionMeasurementPoints.length > 0) {
				this.chartDirective = null;
				this.backgroundColor = this.getBackgroundColor();
				this.lineChartOptions = this.getLineChartOptions();
				const labels = this.buildChartLabelsFromThis(this.evolutionMeasurementPoints);
				const data = this.buildChartDataFromThis(this.evolutionMeasurementPoints);
				this.lineChartData[0].data = data;
				this.lineChartLabels = labels;
				this.chartDirective.chart.update();
			}
		}
	}

	ngAfterViewInit(): void {
		if (this.evolutionMeasurementPoints && this.evolutionMeasurementPoints.length > 0) {
			this.chartDirective.updateChartData(this.lineChartData);
			this.chartDirective.chart.update();
		}
	}


	buildChartLabelsFromThis(points: Point []): string[] {
		let chartLabels: string[] = [];
		points.forEach(p => chartLabels.push(p.date));
		return chartLabels;
	}

	buildChartDataFromThis(points: Point[]): number[] {
		let newData: number[] = [];

		points.forEach(p => {
			newData.push(p.value);
		});

		return newData;
	}

	public chartClicked(e: any): void {
		console.log(e);
	}

	public chartHovered(e: any): void {
		console.log(e);
	}

	public getBackgroundColor() {
		const rand = Math.floor(Math.random() * 2) + 1;
		if (rand === 1) {
			return 'bg-card-blue';
		} else {
			return 'bg-card-orange';
		}
	}


	public getLineChartOptions() {
		const pointValues = [];
		this.evolutionMeasurementPoints.forEach((point) => {
			pointValues.push(point.value);
		});

		const minTick = Math.min.apply(null, pointValues);
		const maxTick = Math.max.apply(null, pointValues);

		return {
			responsive: true,
			//maintainAspectRatio: true,
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
					}
				}],
				yAxes: [{
					scaleLabel: {
						display: true,
						labelString: 'Valeur',
						fontColor: 'white'
					},
					display: true,
					gridLines: {
						color: "rgba(255,255,255,0.3)"
					},
					ticks: {
						max: maxTick,
						min: minTick,
						fontColor: "#fff", // this here
					},
				}],
			}
		};
	}
}

