import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChartData } from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";

@Component({
    selector: 'ahm-chart-time-machine-detail',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-time-machine-detail.component.html',
    styleUrls: [ './chart-time-machine-detail.component.scss' ],
})
export class ChartTimeMachineDetailComponent implements OnChanges {
    @ViewChild(BaseChartDirective) chart: BaseChartDirective | undefined;
    public pieChartType: ChartType = 'pie';

    @Input() data: any;

    ngOnChanges(): void {
        this.pieChartData.datasets[0].data = this.data.map(row => row.value);
        this.pieChartData.datasets[0].backgroundColor = this.data.map(row => row.color);

        this.chart?.update();
    }


    public pieChartData: ChartData<'pie', number[], string | string[]> = {
        datasets: [
            {
                data: [],
                backgroundColor: [],
                borderWidth: 1,
                borderColor: 'white'
            }
        ]
    };

    public pieChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: true,
        layout: {
            padding: { top: 0 }
        },
        hover: {
            mode: null
        },
        plugins: {
            legend: {
                display: true,
                position: 'top',
            },
            tooltip: {
                enabled: false,
            },
            datalabels: {
                display: true,
                align: 'center',
                font: {
                    size: 12,
                    weight: 600,
                },
                color: '#FFF',
                formatter: function (value, context) {
                    return value + '%';
                },
            },
        }
    };

}
