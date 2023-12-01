import { Component, Input, ViewChild } from '@angular/core';
import { ChartConfiguration, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import Chart from 'chart.js/auto';
import Annotation from 'chartjs-plugin-annotation';
import { getGradient } from '../../../core/helpers/chart.helper';
import { MaintenancePreventiveChart } from '../../../core/models/maintenance-preventive.model';

@Component({
    selector: 'ahm-chart-maintenance',
    templateUrl: './chart-maintenance.component.html',
    styleUrls: ['./chart-maintenance.component.scss'],
})
export class ChartMaintenanceComponent {
    public lineChartType: ChartType = 'bar';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: MaintenancePreventiveChart[];
    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                backgroundColor: function (context) {
                    return getGradient(context, [
                        'rgba(39, 157, 157, 1)',
                        'rgba(39, 157, 157, .1)',
                    ]);
                },
            },
            {
                data: [],
                backgroundColor: function (context) {
                    return getGradient(context, [
                        'rgba(40, 110, 110, 1)',
                        'rgba(40, 110, 110, .1)',
                    ]);
                },
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
            padding: { left: -4, bottom: -5 },
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
                    dash: [4, 2],
                },
            },
            x: {
                ticks: {
                    padding: 10,
                },
            },
        },

        plugins: {
            datalabels: {
                display: true,
                align: 'top',
                color: 'white',
                anchor: 'end',
                offset: -3,
            },
            legend: { display: false },
            annotation: {
                annotations: {},
            },
        },
    };

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.map(d => d.plan);
        this.lineChartData.datasets[1].data = this.data.map(d => d.actual);
        this.lineChartData.labels = this.data.map(d => d.label);
        this.chart?.render();
    }
}
