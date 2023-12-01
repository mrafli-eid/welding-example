import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BaseChartDirective, NgChartsModule } from 'ng2-charts';
import { ChartConfiguration, ChartType } from 'chart.js';
import Annotation from 'chartjs-plugin-annotation';
import Chart from 'chart.js/auto';
import { getGradient } from '../../../../core/helpers/chart.helper';
import { DetailMachineAlarm } from '../../../../core/models/machine.model';
import { DUMMY_DETAIL_MACHINE_ALARM } from './detail-machine-alarm.dummy';

@Component({
    selector: 'ahm-chart-detail-machine-alarm',
    standalone: true,
    imports: [CommonModule, NgChartsModule],
    templateUrl: './chart-detail-machine-alarm.component.html',
    styleUrls: ['./chart-detail-machine-alarm.component.scss'],
})
export class ChartDetailMachineAlarmComponent implements OnChanges {
    @Input() data: DetailMachineAlarm = DUMMY_DETAIL_MACHINE_ALARM;

    constructor() {
        Chart.register(Annotation);
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.data.map(d => d.value);
        this.lineChartData.labels = this.data.data.map(d => d.label);
        this.chart?.render();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                pointRadius: 4,
                backgroundColor: function (context) {
                    return getGradient(context, [
                        'rgba(229,57,53)',
                        'rgba(21, 22, 24)',
                    ]);
                },
                fill: 'origin',
                datalabels: {
                    display: true,
                    align: 'top',
                    color: 'white',
                    anchor: 'end',
                    offset: -3,
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
        scales: {
            y: {
                position: 'left',
                grid: {
                    color: '#333333',
                },
                border: {
                    dash: [4, 2],
                },
            },
        },

        plugins: {
            legend: { display: false },
            annotation: {
                annotations: [],
            },
        },
    };

    public lineChartType: ChartType = 'bar';

    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
}
