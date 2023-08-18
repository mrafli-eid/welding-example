import { Component, ViewChild, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { notNull } from 'src/app/core/helpers/object.helper';
import { DetailMachineDewPoint } from 'src/app/core/models/machine.model';

@Component({
  selector: 'ahm-chart-detail-machine-dew-point',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-detail-machine-dew-point.component.html',
  styleUrls: ['./chart-detail-machine-dew-point.component.scss']
})
export class ChartDetailMachineDewPointComponent {
  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  @Input() data: DetailMachineDewPoint;
  @Input() maximum: number;
  
  constructor() {
    Chart.register(Annotation);
  }

  ngOnChanges() {
    this.lineChartData.datasets[0].data = this.data.data.map((res) => res.value);
    this.lineChartData.labels = this.data.data.map((res) => res.label);

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
  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        borderColor: '#28A745',
        fill: 'origin',
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
              padding: 10,
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
