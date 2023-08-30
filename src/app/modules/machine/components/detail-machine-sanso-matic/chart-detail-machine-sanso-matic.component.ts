import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { notNull } from '../../../../core/helpers/object.helper';
import { DetailMachineSansoMatic } from 'src/app/core/models/machine.model';

@Component({
    selector: 'ahm-chart-detail-machine-sanso-matic',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart-detail-machine-sanso-matic.component.html',
    styleUrls: ['./chart-detail-machine-sanso-matic.component.scss'],
})
export class ChartDetailMachineSansoMaticComponent {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DetailMachineSansoMatic;
    @Input() minimum: number;
    @Input() medium: number;
    @Input() maximum: number;

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data_sanso_matic_a.map(
            (d) => d.value
        );
        this.lineChartData.datasets[1].data = this.data.data_sanso_matic_b.map(
            (d) => d.value
        );
        this.lineChartData.labels = this.data.data_label.map((d) => d.label);

        const minimum = this.data.minimum;
        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.minimum = {
            type: 'line',
            yMin: minimum == null ? this.minimum : minimum,
            yMax: minimum == null ? this.minimum : minimum,
            borderColor: '#28A745',
            borderWidth: 1,
        };

        const medium = this.data.medium;
        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.medium = {
            type: 'line',
            yMin: medium == null ? this.medium : medium,
            yMax: medium == null ? this.medium : medium,
            borderColor: '#F1BE42',
            borderWidth: 1,
        };

        const maximum = this.data.maximum;
        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.maximum = {
            type: 'line',
            yMin: maximum == null ? this.maximum : maximum,
            yMax: maximum == null ? this.maximum : maximum,
            borderColor: '#DC3545',
            borderWidth: 1,
        };
        this.chart?.update();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                borderColor: '#0177FB',
                fill: 'origin',
            },
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
                    // dash: [ 4, 2 ]
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
