import {
  Component, OnInit, Input, ViewChild, AfterViewInit, OnChanges, SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import {ChartConfiguration} from "../../../shared/ChartConfiguration";
import {BaseChartDirective} from "ng2-charts/index";
import {Session} from "../../../_model/Session";

@Component({
  selector: 'pulpe-exercises-repartition-graph',
  templateUrl: './exercises-repartition-graph.component.html',
  styleUrls: ['./exercises-repartition-graph.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ExercisesRepartitionGraphComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild(BaseChartDirective) chartDirective = null;
  @Input() session: Session;

  private initialized = false;
  public chartColors: any[] = [];
  public chartLabels: string[] = [];
  public chartType: string = 'bar';
  public chartLegends: boolean = true;
  public chartData: any[] = [{
    label: '% de la séance',
    data: [],
    borderWidth: 1
  }];
  public chartOptions: any = {
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
    this.initialized = true;
    this.chartColors = this.buildChartColorsFromThis(this.session);
    this.chartLabels = this.buildChartLabelsFromThis(this.session);
    this.chartData[0].data = this.buildChartDataFromThis(this.session);
  }


  ngAfterViewInit(): void {
    this.chartDirective.updateChartData(this.chartData);
    this.chartDirective.chart.update();
  }


  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) {
      this.chartColors = this.buildChartColorsFromThis(this.session);
      this.chartLabels = this.buildChartLabelsFromThis(this.session);
      this.chartData[0].data = this.buildChartDataFromThis(this.session);
      this.chartDirective.updateChartData(this.chartData);
      this.chartDirective.chart.update();
    }

  }

  private buildChartColorsFromThis(session: Session): any[] {
    let chartColor: any = {
      backgroundColor: [],
      borderColor: []
    };
    let currentChartConf = null;
    let chartColors = [];

    session.exercisesGroups.forEach(exercisesGroup => {
      currentChartConf = ChartConfiguration.getInstance().configurations.get(exercisesGroup.groupType);
      chartColor.backgroundColor.push(currentChartConf.colors.background);
      chartColor.borderColor.push(currentChartConf.colors.border);
    });

    chartColors.push(chartColor);

    return chartColors;
  }


  private buildChartLabelsFromThis(session: Session): string[] {
    let chartLabels: string[] = [];
    let currentChartConf = null;

    session.exercisesGroups.forEach(exercisesGroup => {
      currentChartConf = ChartConfiguration.getInstance().configurations.get(exercisesGroup.groupType);
      chartLabels.push(currentChartConf.label);
    });

    return chartLabels;
  }


  private buildChartDataFromThis(session: Session): any[] {
    let nbExercises = session.getNbExercises();
    let newData: number[] = [];

    session.exercisesGroups.forEach(exercisesGroup => {
      newData.push(exercisesGroup.exercises.length * 100 / nbExercises);
    });

    return newData;
  }


  // events
  public chartClicked(e: any): void {
    console.log(e);
  }


  public chartHovered(e: any): void {
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
