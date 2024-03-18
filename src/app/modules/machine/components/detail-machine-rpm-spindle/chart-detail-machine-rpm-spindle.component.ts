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
import { DetailMachineAmpereAndVoltage, DetailMachineRpmSpindle } from 'src/app/core/models/machine.model';

@Component({
    selector: 'ahm-chart-detail-machine-rpm-spindle',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart-detail-machine-rpm-spindle.component.html',
    styleUrls: ['./chart-detail-machine-rpm-spindle.component.scss'],
})
export class ChartDetailMachineRpmSpindleComponent {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DetailMachineAmpereAndVoltage;
    @Input() maximum: number;

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.first_data.map(
            res => res.value
        );
        this.lineChartData.datasets[1].data = this.data.second_data.map(
            res => res.value
        );
        // this.lineChartData.datasets[1].data = this.data.maximum;
        this.lineChartData.labels = this.data.data_label.map(res => res.label);

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
                borderColor: '#22C55E',
                fill: 'origin',
                pointRadius: 4,
            },
            {
                data: [],
                borderColor: '#16A086',
                fill: 'origin',
                pointRadius: 4,
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
                    stepSize: 25,
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
                    padding: 5,
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
