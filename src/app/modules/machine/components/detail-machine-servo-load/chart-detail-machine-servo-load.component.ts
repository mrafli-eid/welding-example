import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { notNull } from '../../../../core/helpers/object.helper';
import { DetailMachineServoLoad } from 'src/app/core/models/machine.model';

@Component({
    selector: 'ahm-chart-detail-machine-servo-load',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart-detail-machine-servo-load.component.html',
    styleUrls: ['./chart-detail-machine-servo-load.component.scss'],
})
export class ChartDetailMachineServoLoadComponent {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DetailMachineServoLoad;
    @Input() standard: number;
    @Input() warning: number;
    @Input() breakdown: number;

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map(
            (d) => d.value
        );
        this.lineChartData.labels = this.data.data.map((d) => d.label);

        console.log(this.data.minimum);
        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.minimum = {
            type: 'line',
            yMin: this.data.minimum == null ? this.standard : this.data.minimum,
            yMax: this.data.minimum == null ? this.standard : this.data.minimum,
            borderColor: '#28A745',
            borderWidth: 1,
        };

        console.log(this.data.medium);
        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.warning = {
            type: 'line',
            yMin: this.data.medium == null ? this.warning : this.data.medium,
            yMax: this.data.medium == null ? this.warning : this.data.medium,
            borderColor: '#F1BE42',
            borderWidth: 1,
        };

        console.log(this.data.maximum);
        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.breakdown = {
            type: 'line',
            yMin: this.data.maximum == null ? this.breakdown : this.data.maximum,
            yMax: this.data.maximum == null ? this.breakdown : this.data.maximum,
            borderColor: '#DC3545',
            borderWidth: 1,
        };
        this.chart?.render();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
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
