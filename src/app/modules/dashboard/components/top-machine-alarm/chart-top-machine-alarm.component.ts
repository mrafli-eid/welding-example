import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";
import { DashboardMachineAlarm } from "../../../../core/models/dashboard.model";
import Annotation from "chartjs-plugin-annotation";

@Component({
    selector: 'ahm-chart-top-machine-alarm',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-top-machine-alarm.component.html',
    styleUrls: [ './chart-top-machine-alarm.component.scss' ],
})
export class ChartTopMachineAlarmComponent implements OnChanges {
    public lineChartType: ChartType = 'bar';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DashboardMachineAlarm[];

    constructor() {
        Chart.register(Annotation)
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.map((d) => d.value);
        this.lineChartData.labels = this.data.map((d) => d.label);

        this.chart?.render();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                backgroundColor: '#DC3545',
                pointRadius: 4,
                fill: 'origin',
            },
        ],
        labels: []
    };

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        elements: {
            line: {
                tension: 0.5
            }
        },
        layout: {
            padding: { left: -4 }
        },
        scales: {
            y: {
                position: 'left',
                ticks: {
                    padding: 8,
                },
                border: {
                    color: '#333333'
                }
            },
            x: {
                ticks: {
                    stepSize: 1,
                    padding: 10,
                },
                border: {
                    color: '#333333',
                }
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
