import {AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {Animations} from "../../../shared/Animations";
import {MemberService} from "../../../_services/member/member.service";
import {Member} from "../../../_model/Member";
import {Observable} from "rxjs/Observable";
import {SlimLoadingBarService} from "ng2-slim-loading-bar";
import {ToastrService} from "ngx-toastr";
import {Point} from "../../../_model/Point";
import {BaseChartDirective} from "ng2-charts";
import {Session} from "../../../_model/Session";

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
  public chartType: string = 'line';
  public lineChartData: Array<any> = [{
    data: []
  }];
  public lineChartOptions: any;

  constructor() {
  }

  ngOnInit() {
    this.initialized = true;
    this.lineChartOptions = this.getLineChartOptions();
    this.lineChartLabels = this.buildChartLabelsFromThis(this.previsionsPoints);
    this.lineChartData[0].data = this.buildChartDataFromThis(this.previsionsPoints);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (this.initialized) {
      let labels = this.buildChartLabelsFromThis(this.previsionsPoints);
      let data = this.buildChartDataFromThis(this.previsionsPoints);
      this.lineChartData[0].data = data;
      this.lineChartLabels = labels;
      this.chartDirective.chart.update();
    }
  }

  ngAfterViewInit(): void {
    this.chartDirective.updateChartData(this.lineChartData);
    this.chartDirective.chart.update();
  }

  public chartClicked(e: any): void {
    console.log(e);
  }

  public chartHovered(e: any): void {
    console.log(e);
  }

  buildChartLabelsFromThis(points: Point []): string[] {
    let chartLabels: string[] = [];
    points.forEach(p => chartLabels.push(p.date));
    return chartLabels;
  }

  buildChartDataFromThis(points: Point[]): number[] {
    let newData: number[] = [];

    points.forEach(p => {
      newData.push(p.percentage);
    });

    return newData;
  }

  getLineChartOptions(): any {
    return {
      // responsive: true,
      // maintainAspectRatio: false,
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
