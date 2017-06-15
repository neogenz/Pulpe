import { Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges } from '@angular/core';
import {Program} from "../../_model/Program";
import {AbstractExercise} from "../../_model/exercise/AbstractExercise";
import {ChartConfiguration} from "../../shared/ChartConfiguration";
import {BaseChartDirective} from "ng2-charts/index";

@Component({
  selector: 'pulpe-exercises-repartition-graph',
  templateUrl: './exercises-repartition-graph.component.html',
  styleUrls: ['./exercises-repartition-graph.component.css']
})
export class ExercisesRepartitionGraphComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(BaseChartDirective) chartDirective = null;
  @Input() program:Program;

  public chartColors:any[] = [];
  public chartLabels:string[] = [];
  public chartType:string = 'bar';
  public chartLegends:boolean = true;
  public chartData:any[] = [{
    label: '% du programme',
    data: [],
    borderWidth: 1
  }];
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
    debugger;
    this.chartColors = this.buildChartColorsFromThis(this.program);
    this.chartLabels = this.buildChartLabelsFromThis(this.program);
    this.chartData[0].data = this.buildChartDataFromThis(this.program);
  }


  ngAfterViewInit():void {
    this.chartDirective.updateChartData(this.chartData);
    this.chartDirective.chart.update();
  }


  ngOnChanges(changes:SimpleChanges):void {
  }

  private buildChartColorsFromThis(program:Program):any[] {
    let chartColor:any = {
      backgroundColor: [],
      borderColor: []
    };
    let currentChartConf = null;
    let chartColors = [];

    program.exercises.forEach((value:AbstractExercise[], key:string) => {
      currentChartConf = ChartConfiguration.getInstance().configurations.get(key);
      chartColor.backgroundColor.push(currentChartConf.colors.background);
      chartColor.borderColor.push(currentChartConf.colors.border);
    });

    chartColors.push(chartColor);

    return chartColors;
  }


  private buildChartLabelsFromThis(program:Program):string[] {
    let chartLabels:string[] = [];
    let currentChartConf = null;

    program.exercises.forEach((value:AbstractExercise[], key:string) => {
      currentChartConf = ChartConfiguration.getInstance().configurations.get(key);
      chartLabels.push(currentChartConf.label);
    });

    return chartLabels;
  }


  private buildChartDataFromThis(program:Program):any[] {
    let nbExercises = program.getNbExercises();
    let newData:number[] = [];

    program.exercises.forEach((exercisesForCurrentGroup:AbstractExercise[]) => {
      newData.push(exercisesForCurrentGroup.length * 100 / nbExercises);
    });

    return newData;
  }


  // events
  public chartClicked(e:any):void {
    console.log(e);
  }


  public chartHovered(e:any):void {
    console.log(e);
  }

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

}
