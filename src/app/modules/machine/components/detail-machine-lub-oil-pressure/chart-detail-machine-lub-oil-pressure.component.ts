import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";
import Annotation from "chartjs-plugin-annotation";
import { notNull } from "../../../../core/helpers/object.helper";
import { DetailMachineLubOilPressure } from "../../../../core/models/machine.model";

@Component({
    selector: 'ahm-chart-detail-machine-lub-oil-pressure',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-detail-machine-lub-oil-pressure.component.html',
    styleUrls: [ './chart-detail-machine-lub-oil-pressure.component.scss' ],
})
export class ChartDetailMachineLubOilPressureComponent {
    public lineChartType: ChartType = 'line';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: DetailMachineLubOilPressure[];
    @Input() maximum: number;
    @Input() minimum: number;
    @Input() lowerLimit: number;
    @Input() upperLimit: number;

    constructor() {
        Chart.register(Annotation)
    }

    ngOnChanges() {
        this.lineChartData.datasets[0].data = this.data.map((d) => d.value);
        this.lineChartData.labels = this.data.map((d) => d.label);

        if (notNull(this.maximum)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.maximum = {
                type: 'line',
                yMin: this.maximum,
                yMax: this.maximum,
                borderColor: '#DC3545',
                borderWidth: 1,
            }
        }

        if (notNull(this.minimum)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.minimum = {
                type: 'line',
                yMin: this.minimum,
                yMax: this.minimum,
                borderColor: '#28A745',
                borderWidth: 1,
            }
        }

        if (notNull(this.lowerLimit)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.lowerLimit = {
                type: 'line',
                yMin: this.lowerLimit,
                yMax: this.lowerLimit,
                borderColor: '#28A745',
                borderDash: [ 5, 5 ],
                borderWidth: 1,
            }
        }

        if (notNull(this.upperLimit)) {
            // @ts-ignore
            this.lineChartOptions.plugins.annotation.annotations.upperLimit = {
                type: 'line',
                yMin: this.upperLimit,
                yMax: this.upperLimit,
                borderDash: [ 5, 5 ],
                borderColor: '#F1BE42',
                borderWidth: 1,
            }
        }

        this.chart?.update();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [
            {
                data: [],
                borderColor: '#0177FB',
                fill: 'origin',
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
