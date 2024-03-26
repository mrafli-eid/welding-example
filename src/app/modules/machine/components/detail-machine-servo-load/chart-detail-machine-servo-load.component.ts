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
    @Input() average: number;

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map(d => d.value);
        this.lineChartData.labels = this.data.data.map(d => d.label);

        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.minimum = {
            type: 'line',
            yMin: this.data.minimum == null ? this.standard : this.data.minimum,
            yMax: this.data.minimum == null ? this.standard : this.data.minimum,
            borderColor: '#28A745',
            borderWidth: 1,
        };
        

        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.medium = {
            type: 'line',
            yMin: this.data.medium == null ? this.warning : this.data.medium,
            yMax: this.data.medium == null ? this.warning : this.data.medium,
            borderColor: '#F1BE42',
            borderWidth: 1,
        };

        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.maximum = {
            type: 'line',
            yMin:
                this.data.maximum == null ? this.breakdown : this.data.maximum,
            yMax:
                this.data.maximum == null ? this.breakdown : this.data.maximum,
            borderColor: '#DC3545',
            borderWidth: 1,
        };

        // @ts-ignore
        // this.lineChartOptions.plugins.annotation.annotations.average = {
        //     type: 'line',
        //     yMin:
        //         this.data.average == null ? this.average : this.data.average,
        //     yMax:
        //         this.data.average == null ? this.average : this.data.average,
        //     borderColor: '#3443eb',
        //     borderWidth: 1,
        // };
        
        this.chart?.render();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                pointRadius: 4,
                borderColor: '#16A086',
                fill: 'start',
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
