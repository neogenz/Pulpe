import { Component, OnInit, ViewChild } from '@angular/core';
import {Color} from "ng2-charts/index";
import { ColorConfiguration } from "./ColorConfiguration";
import {ProgramService} from "./program.service";
import { Observable }     from 'rxjs/Observable';
import {Program} from "../model/Program";
import {ExerciseGroupCodeConverter} from "../shared/ExerciseGroupCodeConverter";
import {ExerciseGroupCode} from "../shared/ExerciseGroupCodeConverter";
import {ChartConfiguration} from "../shared/ChartConfiguration";
import {AbstractExercise} from "../model/exercise/AbstractExercise";
import {BaseChartDirective} from "ng2-charts/index";

@Component({
  selector: 'pulpe-program',
  templateUrl: './program.component.html',
  styleUrls: ['./program.component.css']
})
export class ProgramComponent implements OnInit {
  @ViewChild(BaseChartDirective) chartDirective = null;

  public program:Program;
  public exerciseGroupLabelsDictionary:ExerciseGroupCode[] = [];
  public chartColors:any[] = [];
  public chartLabels:string[] = [];
  public chartType:string = 'bar';
  public chartLegends:boolean = true;
  public chartData:any[] = [{
    label: '% du programme',
    data: [34, 43],
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
  //private dataConfigurations:any;

  constructor(private programService:ProgramService, private exerciseGroupCodeConverter:ExerciseGroupCodeConverter) {
  }


  ngOnInit() {
    this.program = new Program();
    this.programService.findBy(null)
      .subscribe(program => {
        debugger;
        this.program = program;
        this.program.goal = 'Prise de masse'; //todo : Goal must be setted by find method from the json value
        this.exerciseGroupLabelsDictionary = this.exerciseGroupCodeConverter.convertThis(this.program.exercises);
        this.chartColors = this.buildChartColorsFromThis(this.program);
        this.chartLabels = this.buildChartLabelsFromThis(this.program);
        this.chartData[0].data = this.buildChartDataFromThis(this.program);
        this.chartDirective.updateChartData(this.chartData);
        this.chartDirective.chart.update();
      });
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
}
