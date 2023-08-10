import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import { getGradient } from "../../../../core/helpers/chart.helper";
import { DetailMachineProductionGraph } from "../../../../core/models/machine.model";

@Component({
    selector: 'ahm-chart-detail-machine-production-graph',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-detail-machine-production-graph.component.html',
    styleUrls: [ './chart-detail-machine-production-graph.component.scss' ],
})
export class ChartDetailMachineProductionGraphComponent implements OnChanges {
    public lineChartType: ChartType = 'bar';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DetailMachineProductionGraph;

    constructor() {
        Chart.register(Annotation)
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map((d) => d.value);
        this.lineChartData.labels = this.data.data.map((d) => d.label);
        this.chart?.update();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                backgroundColor: function (context) {
                    return getGradient(context, [ 'rgba(1, 119, 251, 1)', 'rgba(21, 22, 24)' ]);
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
