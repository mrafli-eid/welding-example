import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import Annotation from "chartjs-plugin-annotation";
import { ChartConfiguration, ChartType } from "chart.js";
import { DashboardCycleTime } from "../../../../core/models/dashboard.model";
import { notNull } from "../../../../core/helpers/object.helper";

@Component({
    selector: 'ahm-chart-cycle-time',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-cycle-time.component.html',
    styleUrls: [ './chart-cycle-time.component.scss' ],
})
export class ChartCycleTimeComponent implements OnChanges {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DashboardCycleTime;
    @Input() maximum = 4;
    @Input() minimum = 3;

    constructor() {
        Chart.register(Annotation)
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map((d) => d.value);
        this.lineChartData.labels = this.data.data.map((d) => d.label);

        if (notNull(this.maximum)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.maximum = {
                type: 'line',
                yMin: this.maximum,
                yMax: this.maximum,
                borderColor: '#DC3545',
            }
        }

        if (notNull(this.minimum)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.minimum = {
                type: 'line',
                yMin: this.minimum,
                yMax: this.minimum,
                borderColor: '#28A745',
            }
        }

        this.chart?.render();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                pointRadius: 4,
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
