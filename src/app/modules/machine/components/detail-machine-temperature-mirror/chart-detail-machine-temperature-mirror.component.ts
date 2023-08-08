import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import { notNull } from "../../../../core/helpers/object.helper";

@Component({
  selector: 'ahm-chart-detail-machine-temperature-mirror',
  standalone: true,
  imports: [CommonModule, NgChartsModule],
  templateUrl: './chart-detail-machine-temperature-mirror.component.html',
  styleUrls: ['./chart-detail-machine-temperature-mirror.component.scss'],
})

export class ChartDetailMachineTemperatureMirrorComponent implements OnChanges {

  public lineChartType: ChartType = 'line';
  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

  constructor() {
    Chart.register(Annotation)
  }
  
  ngOnChanges() {

  }

  public lineChartData: ChartConfiguration['data'] = {
    datasets: [
      {
        data: [],
        borderColor: '#0177FB',
        fill: 'origin',
      },
    ],
    labels: []
  };

  public lineChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    elements: {
      line: {
        tension: 0.5,
      },
    },
    scales: {
      // We use this empty structure as a placeholder for dynamic theming.
      y: {
        position: 'left',
      },
      y1: {
        position: 'right',
        grid: {
          color: 'rgba(255,0,0,0.3)',
        },
        ticks: {
          color: 'red',
        },
      },
    },

    plugins: {
      legend: { display: true },
      annotation: {
        annotations: [
          {
            type: 'line',
            scaleID: 'x',
            value: 'March',
            borderColor: 'orange',
            borderWidth: 2,
            label: {
              display: true,
              position: 'center',
              color: 'orange',
              content: 'LineAnno',
              font: {
                weight: 'bold',
              },
            },
          },
        ],
      },
    },
  };

}