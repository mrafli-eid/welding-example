import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import { DetailMachineActivityMachine } from "../../../../core/models/machine.model";

@Component({
    selector: 'ahm-chart-detail-machine-activity-machine',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-detail-machine-activity-machine.component.html',
    styleUrls: [ './chart-detail-machine-activity-machine.component.scss' ],
})
export class ChartDetailMachineActivityMachineComponent implements OnChanges {
    public lineChartType: ChartType = 'bar';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DetailMachineActivityMachine[];

    constructor() {
        Chart.register(Annotation)
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.map((d) => d.value_run);
        this.lineChartData.datasets[1].data = this.data.map((d) => d.value_idle);
        this.lineChartData.datasets[2].data = this.data.map((d) => d.value_stop);
        this.lineChartData.labels = this.data.map((d) => d.label);

        this.chart?.update();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                backgroundColor: '#28A745',
                fill: 'origin',
                stack: 'a',
            },
            {
                data: [],
                backgroundColor: '#E3C053',
                fill: 'origin',
                stack: 'a',
            },
            {
                data: [],
                backgroundColor: '#DC3545',
                fill: 'origin',
                stack: 'a',
                borderRadius: {
                    topLeft: 3,
                    topRight: 3
                }
            },
        ],
        labels: []
    };

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0.5
            }
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
            datalabels: {
                display: true,
                align: 'center',
                font: {
                    size: 12,
                    weight: 300,
                }
            },
            legend: { display: false },
            annotation: {
                annotations: {}
            },
        }
    };
}
