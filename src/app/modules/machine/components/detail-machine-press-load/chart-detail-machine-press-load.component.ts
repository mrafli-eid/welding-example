import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import { DetailMachinePressLoad } from "../../../../core/models/machine.model";

@Component({
    selector: 'ahm-chart-detail-machine-press-load',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-detail-machine-press-load.component.html',
    styleUrls: [ './chart-detail-machine-press-load.component.scss' ],
})
export class ChartDetailMachinePressLoadComponent implements OnChanges {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DetailMachinePressLoad[];

    constructor() {
        Chart.register(Annotation)
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.map((d) => d.value_mmr);
        this.lineChartData.datasets[1].data = this.data.map((d) => d.value_smir);
        this.lineChartData.labels = this.data.map((d) => d.label);
        this.chart?.update();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                borderColor: '#28A745'
            },
            {
                data: [],
                borderColor: '#0177FB'
            },
        ],
        labels: []
    };

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        elements: {
            line: {
                tension: 0.5
            }
        },
        layout: {
            padding: { left: -4, bottom: -5 }
        },
        scales: {
            y: {
                stacked: false,
                position: 'left',
                ticks: {
                    padding: 8,
                },
                grid: {
                    color: '#333333',
                },
                border: {
                    dash: [ 4, 2 ]
                },
            },
            x: {
                stacked: false,
                ticks: {
                    padding: 10,
                },
            }
        },

        plugins: {
            datalabels: { display: false },
            legend: { display: false },
            annotation: {
                annotations: {}
            },
        }
    };

}
