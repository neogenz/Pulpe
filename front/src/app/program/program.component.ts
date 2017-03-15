import { Component, OnInit } from '@angular/core';
import {Color} from "ng2-charts/index";
import { ColorConfiguration } from "./ColorConfiguration";

@Component({
    selector: 'app-program',
    templateUrl: './program.component.html',
    styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {


    private primaryColor:any = 'rgba(255,87,34,1)';
    private darkPrimaryColor:any = 'rgba(230,74,25,1)';
    private accentColor:any = 'rgba(3,169,244,1)';

    private dataConfigurations:any = {
        echauffement: {
            label: 'Échauffement',
            colors: new ColorConfiguration('rgba(255,99,132,0.4)', 'rgba(255,99,132,1)')
        },
        musculation: {
            label: 'Musculation',
            colors: new ColorConfiguration('rgba(255,87,34,0.4)', 'rgba(255,87,34,1)')
        },
        abdominaux: {
            label: 'Abdominaux',
            colors: new ColorConfiguration('rgba(255,234,0,0.4)', 'rgba(255,234,0,1)')
        },
        etirements: {
            label: 'Étirements',
            colors: new ColorConfiguration('rgba(118,255,3,0.4)', 'rgba(118,255,3,1)')
        },
        cardio: {
            label: 'Cardio',
            colors: new ColorConfiguration('rgba(213,0,249,0.4)', 'rgba(213,0,249,1)')
        },
        recuperation: {
            label: 'Récupération',
            colors: new ColorConfiguration('rgba(29,233,182,0.4)', 'rgba(29,233,182,1)')
        }
    };

    private chartColors = [
        {
            backgroundColor: [
                this.dataConfigurations.echauffement.colors.background,
                this.dataConfigurations.musculation.colors.background,
                this.dataConfigurations.abdominaux.colors.background,
                this.dataConfigurations.etirements.colors.background,
                this.dataConfigurations.cardio.colors.background,
                this.dataConfigurations.recuperation.colors.background
            ],
            borderColor: [
                this.dataConfigurations.echauffement.colors.border,
                this.dataConfigurations.musculation.colors.border,
                this.dataConfigurations.abdominaux.colors.border,
                this.dataConfigurations.etirements.colors.border,
                this.dataConfigurations.cardio.colors.border,
                this.dataConfigurations.recuperation.colors.border
            ]
        }
    ];

    //public radarChartOptions:any = {
    //    responsive: true,
    //    legend: {
    //        display: false,
    //        labels: {
    //            fontColor: 'rgb(255, 255, 255)'
    //        }
    //    }
    //};

    //Radar data :
    //pointBackgroundColor: "#fff",
    //pointBorderColor: "#fff",
    //pointHoverBackgroundColor: this.primaryColor,
    //pointHoverBorderColor: this.primaryColor

    public chartOptions:any = {
        responsive: true,
        maintainAspectRatio: false,
        legend: {
            display: false,
            labels: {
                fontColor: 'white'
            }
        },
        //tooltips:{
        //    mode: 'index',
        //    callbacks: {
        //        // Use the footer callback to display the sum of the items showing in the tooltip
        //        footer: function(tooltipItems, data) {
        //            var sum = 0;
        //            tooltipItems.forEach(function(tooltipItem) {
        //                sum += data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index];
        //            });
        //            return 'Sum: ' + sum;
        //        },
        //    },
        //},
        scales: {

            xAxes: [{
                display: false,
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
                    fontColor: "#fff", // this here
                },
            }],
        }
    };
    public chartLabels:string[] = [
        this.dataConfigurations.echauffement.label,
        this.dataConfigurations.musculation.label,
        this.dataConfigurations.abdominaux.label,
        this.dataConfigurations.etirements.label,
        this.dataConfigurations.cardio.label,
        this.dataConfigurations.recuperation.label,
    ];
    public chartType:string = 'bar';
    public chartLegends:boolean = true;
    public chartData:any[] = [
        {
            label: 'test',
            data: [15, 60, 10, 5, 10, 5],
            borderWidth: 1
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
        let clone = JSON.parse(JSON.stringify(this.chartData));
        clone[0].data = data;
        this.chartData = clone;
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
