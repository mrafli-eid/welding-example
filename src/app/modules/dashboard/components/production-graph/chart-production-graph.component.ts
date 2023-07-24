import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DashboardProductionGraph } from '../../../../core/models/dashboard.model';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import { getGradient } from "../../../../core/helpers/chart.helper";

@Component({
    selector: 'ahm-chart-production-graph',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-production-graph.component.html',
    styleUrls: [ './chart-production-graph.component.scss' ],
})
export class ChartProductionGraphComponent implements OnChanges {
    public lineChartType: ChartType = 'bar';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DashboardProductionGraph;

    constructor() {
        Chart.register(Annotation)
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map((d) => d.plan);
        this.lineChartData.datasets[1].data = this.data.data.map((d) => d.actual);
        this.lineChartData.labels = this.data.data.map((d) => d.label);
        this.chart?.update();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                backgroundColor: function (context) {
                    return getGradient(context, [ 'rgba(1, 119, 251, 1)', 'rgba(1, 119, 251, .3)' ]);
                }
            },
            {
                data: [],
                backgroundColor: function (context) {
                    return getGradient(context, [ 'rgba(40, 167, 69, 1)', 'rgba(40, 167, 69, .3)' ]);
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
                align: 'top',
                color: 'white',
                anchor: 'end',
                offset: -3
            },
            legend: { display: false },
            annotation: {
                annotations: {}
            },
        }
    };

}
