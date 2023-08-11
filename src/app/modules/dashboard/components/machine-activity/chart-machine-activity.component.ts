import { Component, Input, OnChanges, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import Chart from 'chart.js/auto';
import { BaseChartDirective, NgChartsModule } from "ng2-charts";
import { ChartConfiguration, ChartType } from "chart.js";
import { DashboardMachineActivity } from "../../../../core/models/dashboard.model";
import Annotation from "chartjs-plugin-annotation";
import { ChartDatasets } from "../../../../core/models/chart.model";

@Component({
    selector: 'ahm-chart-machine-activity',
    standalone: true,
    imports: [ CommonModule, NgChartsModule ],
    templateUrl: './chart-machine-activity.component.html',
    styleUrls: [ './chart-machine-activity.component.scss' ],
})
export class ChartMachineActivityComponent implements OnChanges {
    public lineChartType: ChartType = 'bar';
    @ViewChild(BaseChartDirective) chart?: BaseChartDirective;

    @Input() data: ChartDatasets;
    @Input() static machineActivity: DashboardMachineActivity;

    constructor() {
        Chart.register(Annotation)
    }

    ngOnChanges() {
        this.lineChartData.datasets = this.data;
        this.lineChartData.labels = ChartMachineActivityComponent.machineActivity.machine_list.map((m) => m.machine_name);

        this.chart?.update();
    }

    public lineChartData: ChartConfiguration['data'] = {
        datasets: [],
        labels: []
    };

    public lineChartOptions: ChartConfiguration['options'] = {
        responsive: true,
        maintainAspectRatio: false,
        indexAxis: 'y',
        elements: {
            line: {
                tension: 0.5
            }
        },
        layout: {
            padding: { left: 0, top: 0 }
        },
        hover: {
            mode: null
        },
        scales: {
            y: {
                stacked: true,
                position: 'left',
                ticks: {
                    padding: 8,
                },
                grid: {
                    display: false
                },
            },
            x: {
                stacked: true,
                ticks: {
                    display: false,
                    stepSize: 1,
                },
            }
        },
        plugins: {
            datalabels: { display: false },
            legend: { display: false },
            annotation: {
                annotations: {}
            },
        },
    };

    customScale = {
        id: 'customScale',
        beforeDatasetsDraw(chart: Chart, args: any, options: any) {
            const { ctx, chartArea: { top, bottom, left, right, width, height }, scales: { x, y } } = chart;
            if (!chart?.chartArea) {
                return;
            }

            ctx.save();
            ctx.font = '8px Inter';
            ctx.fillStyle = '#FFF';

            x.ticks.forEach((tick, index) => {
                if (x.ticks.length > 30) {
                    if (index % 30 === 0) {
                        ctx.fillText(ChartMachineActivityComponent.machineActivity.label[index], x.getPixelForValue(tick.value) + 5, bottom + 5);
                    }
                } else if (x.ticks.length > 20) {
                    if (index % 20 === 0) {
                        ctx.fillText(ChartMachineActivityComponent.machineActivity.label[index], x.getPixelForValue(tick.value) + 5, bottom + 5);
                    }
                } else if (x.ticks.length > 10) {
                    if (index % 10 === 0) {
                        ctx.fillText(ChartMachineActivityComponent.machineActivity.label[index], x.getPixelForValue(tick.value) + 5, bottom + 5);
                    }
                } else {
                    ctx.fillText(ChartMachineActivityComponent.machineActivity.label[index], x.getPixelForValue(tick.value) + 5, bottom + 5);
                }
            });
            ctx.restore();
        }
    }
}
