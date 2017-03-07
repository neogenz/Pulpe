import { Component, OnInit } from '@angular/core';
import {Color} from "ng2-charts/index";

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {

    private primaryColor:any = 'rgba(255,87,34,1)';
    private darkPrimaryColor:any = 'rgba(230,74,25,1)';

    colorsOverride:Array<Color> = [{
        backgroundColor: 'rgba(255,87,34,0.5)',
        borderColor: this.primaryColor
        //hoverBackgroundColor: 'purple'
    }];

    public radarChartOptions:any = {
        responsive: true,
        legend: {
            display: false,
            labels: {
                fontColor: 'rgb(255, 255, 255)'
            }
        }
    };

    public barChartOptions:any = {
        scaleShowVerticalLines: false,
        responsive: true,
        legend: {
            display: true,
            labels: {
                fontColor: 'rgb(255, 255, 255)'
            }
        },
        scaleFontColor: 'white',
        tooltips: {
            mode: 'single',
        },
        scales: {
            xAxes: [{
                gridLines: {
                    display: false,
                    color: "#FFFFFF"
                },
                ticks: {
                    fontColor: "#fff", // this here
                },
            }],
            yAxes: [{
                display: false,
                gridLines: {
                    display: false,
                    color: "#FFFFFF"
                },
                ticks: {
                    fontColor: "#fff", // this here
                },
            }],
        }
    };


    public barChartLabels:string[] = ['Échauffement', 'Musculation', 'Abdominaux', 'Étirements', 'Cardio', 'Récup'];
    public barChartType:string = 'radar';
    public barChartLegend:boolean = true;


    public barChartData:any[] = [
        {
            data: [15, 60, 10, 5, 10, 5],
            backgroundColor: "rgba(179,181,198,0.2)",
            borderColor: "rgba(179,181,198,1)",
            pointBackgroundColor: "#fff",
            pointBorderColor: "#fff",
            pointHoverBackgroundColor: this.primaryColor,
            pointHoverBorderColor: this.primaryColor
        }
    ];

    // events
    public chartClicked(e:any):void {
        console.log(e);
    }

    public chartHovered(e:any):void {
        console.log(e);
    }

    public randomize():void {
        // Only Change 3 values
        let data = [
            Math.round(Math.random() * 100),
            59,
            80,
            (Math.random() * 100),
            56,
            (Math.random() * 100),
            40];
        let clone = JSON.parse(JSON.stringify(this.barChartData));
        clone[0].data = data;
        this.barChartData = clone;
        /**
         * (My guess), for Angular to recognize the change in the dataset
         * it has to change the dataset variable directly,
         * so one way around it, is to clone the data, change it and then
         * assign it;
         */
    }

    constructor() {
    }

    ngOnInit() {
    }

    exercises:Array<any> = [
        {
            name: 'Développé couché',
            others: [],
            workedMuscles: ['Biceps', 'Triceps'],
            series: 4,
            repetitions: 12,
            relaxTime: 1,
            endRelaxTime: 2,
            time: 4.30
        },
        {
            name: 'Poulie transversale',
            others: [],
            workedMuscles: ['Biceps', 'Triceps'],
            series: 4,
            repetitions: 12,
            relaxTime: 1,
            endRelaxTime: 2.3,
            time: 6.30
        },
        {
            name: 'Dips',
            others: [],
            workedMuscles: ['Biceps', 'Triceps'],
            series: 4,
            repetitions: 12,
            relaxTime: 1,
            endRelaxTime: 2.30,
            time: 6.0
        },
        {
            name: 'Développé assis',
            others: [],
            workedMuscles: ['Biceps', 'Triceps'],
            series: 4,
            repetitions: 12,
            relaxTime: 1,
            endRelaxTime: 2,
            time: 6.30
        },
        {
            name: 'Traction',
            others: [],
            workedMuscles: ['Biceps', 'Triceps'],
            series: 4,
            repetitions: 12,
            relaxTime: 1,
            endRelaxTime: 2,
            time: 5.30
        },
        {
            name: 'Butterfly',
            others: [],
            workedMuscles: ['Biceps', 'Triceps'],
            series: 4,
            repetitions: 12,
            relaxTime: 1,
            endRelaxTime: 2
            ,
            time: 6.0
        }
    ];

    goal:String = "Prise de masse";
}
