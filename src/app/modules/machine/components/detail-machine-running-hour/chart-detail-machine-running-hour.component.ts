import {
    Component,
    ViewChild,
    Input,
    OnChanges,
    SimpleChanges,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import { notNull } from 'src/app/core/helpers/object.helper';
import { DetailMachineRunningHour } from 'src/app/core/models/machine.model';

@Component({
    selector: 'ahm-chart-detail-machine-running-hour',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart-detail-machine-running-hour.component.html',
    styleUrls: ['./chart-detail-machine-running-hour.component.scss'],
})
export class ChartDetailMachineRunningHourComponent {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DetailMachineRunningHour;
    @Input() maximum: number;

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map(
            res => res.value
        );
        this.lineChartData.labels = this.data.data.map(res => res.label);

        // @ts-ignore
        this.lineChartOptions.plugins.annotation.annotations.maximum = {
            type: 'line',
            yMin: this.data.maximum == null ? this.maximum : this.data.maximum,
            yMax: this.data.maximum == null ? this.maximum : this.data.maximum,
            borderColor: '#DC3545',
            borderWidth: 1,
        };

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
