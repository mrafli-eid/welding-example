import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { DashboardOilLevel } from '../../../../core/models/dashboard.model';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { notNull } from '../../../../core/helpers/object.helper';

@Component({
    selector: 'ahm-chart-oil-level',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart-oil-level.component.html',
    styleUrls: ['./chart-oil-level.component.scss'],
})
export class ChartOilLevelComponent implements OnChanges {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DashboardOilLevel;
    @Input() maximum = 4;
    @Input() minimum = 3;
    @Input() warning;

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map(d => d.value);
        this.lineChartData.labels = this.data.data.map(d => d.label);

        if (notNull(this.maximum)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.maximum = {
                type: 'line',
                yMin: this.maximum,
                yMax: this.maximum,
                borderColor: '#DC3545',
            };
        }

        if (notNull(this.minimum)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.minimum = {
                type: 'line',
                yMin: this.minimum,
                yMax: this.minimum,
                borderColor: '#28A745',
            };
        }

        if (notNull(this.warning)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.warning = {
                type: 'line',
                yMin: this.warning,
                yMax: this.warning,
                borderColor: '#F1BE42',
            };
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
            datalabels: { display: false },
            legend: { display: false },
            annotation: {
                annotations: {},
            },
        },
    };
}
