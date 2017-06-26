import {Component, OnInit} from '@angular/core';
import {Animations} from "../../../shared/Animations";

@Component({
    selector: 'pulpe-efficient-line-graph',
    templateUrl: 'efficient-line-graph.component.html',
    styleUrls: ['efficient-line-graph.component.scss'],
    animations: [Animations.fadeIn()]
})
export class EfficientLineGraphComponent implements OnInit {
    public lineChartLabels: Array<any>;
    public lineChartType: string;
    public pieChartType: string;
    public pieChartLabels: string[];
    public pieChartData: number[];
    public lineChartData: Array<any>;

    public randomizeType(): void {
        this.lineChartType = this.lineChartType === 'line' ? 'bar' : 'line';
        this.pieChartType = this.pieChartType === 'doughnut' ? 'pie' : 'doughnut';
    }

    public lineChartOptions: any = {
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

    constructor() {
    }

    ngOnInit() {
        this.lineChartLabels = ['January', 'February', 'March', 'April', 'May', 'June', 'July'];
        this.lineChartType = 'line';
        this.pieChartType = 'pie';
        this.pieChartLabels = ['Download Sales', 'In-Store Sales', 'Mail Sales'];
        //this.pieChartData = [300, 500, 100];
        this.lineChartData = [
            [65, 59, 80, 81, 56, 55, 40]
        ];
    }

    public chartClicked(e: any): void {
        console.log(e);
    }

    public chartHovered(e: any): void {
        console.log(e);
    }
}
