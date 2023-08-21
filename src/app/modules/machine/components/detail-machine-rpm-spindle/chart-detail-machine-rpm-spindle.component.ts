import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { notNull } from 'src/app/core/helpers/object.helper';
import { DetailMachineRpmSpindle } from 'src/app/core/models/machine.model';

@Component({
    selector: 'ahm-chart-detail-machine-rpm-spindle',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart-detail-machine-rpm-spindle.component.html',
    styleUrls: ['./chart-detail-machine-rpm-spindle.component.scss'],
})
export class ChartDetailMachineRpmSpindleComponent  {
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() data: DetailMachineRpmSpindle;
  @Input() maximum: number;
  
  constructor() {
    Chart.register(Annotation);
  }

  ngOnChanges() {
      this.lineChartData.datasets[0].data = this.data.data_rpm_a.map((res) => res.value);
      this.lineChartData.datasets[1].data = this.data.data_rpm_b.map((res) => res.value);
      // this.lineChartData.datasets[1].data = this.data.maximum;
      this.lineChartData.labels = this.data.data_label.map((res) => res.label);

      const maximum = this.data.maximum;
      if (notNull(maximum || this.maximum)) {
          // @ts-ignore
          this.lineChartOptions.plugins.annotation.annotations.maximum = {
              type: 'line',
              yMin: this.maximum,
              yMax: this.maximum,
              borderColor: '#DC3545',
              borderWidth: 1,
          }
      }

      this.chart?.update();
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        borderColor: '#22C55E',
        fill: 'origin',
        pointRadius: 0,
      },
      {
        data: [],
        borderColor: '#0177FB',
        fill: 'origin',
        pointRadius: 0,
      },
    ],
    labels: [],
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false, 
    elements: {
      line: {
        tension: 0.5,
      },
    },
    layout: {
        padding: { left: -4, bottom: -5 }
    },
    scales: {
      y: {
          position: 'left',
          ticks: {
              padding: 8,
              stepSize: 25,
          },
          grid: {
              color: '#333333',
          },
          border: {
              dash: [ 4, 2 ]
          },
      },
      x: {
          ticks: {
              padding: 5,
          },
      }
  },

    plugins: {
      datalabels: { display: false },
      legend: { display: false },
      annotation: {
          annotations: {}
      },
  }
  };

}
