import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DashboardGrafikMtbf } from '../../../../../core/models/dashboard.model';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { notNull } from '../../../../../core/helpers/object.helper';

@Component({
    selector: 'ahm-chart-maintenance-indicator-graph-mtbf',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart-maintenance-indicator-graph-mtbf.component.html',
    styleUrls: ['./chart-maintenance-indicator-graph-mtbf.component.scss'],
})
export class ChartMaintenanceIndicatorGraphMTBFComponent implements OnChanges {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DashboardGrafikMtbf;
    @Input() target;
    @Input() dataType = 'value';

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map(
            d => d[this.dataType]
        );
        this.lineChartData.labels = this.data.data.map(d => d.label);

        if (notNull(this.target)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.minimum = {
                type: 'line',
                yMin: this.target,
                yMax: this.target,
                borderColor: 'rgba(241, 190, 66, 0.7)',
                borderWidth: 4,
            };
        }
        this.chart?.render();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                pointRadius: 4,
                borderColor: '#16A086',
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
            padding: { top: 0, left: -4 },
        },
        scales: {
            y: {
                position: 'left',
                ticks: {
                    padding: 8,
                    font: {
                        size: 11,
                    },
                },
                grid: {
                    color: '#333333',
                },
                border: {
                    dash: [4, 2],
                },
            },
            x: {
                ticks: {
                    padding: 10,
                    font: {
                        size: 10,
                    },
                },
            },
        },

        plugins: {
            datalabels: { display: false },
            legend: { display: false },
            annotation: {
                annotations: {},
            },
        },
    };
}
