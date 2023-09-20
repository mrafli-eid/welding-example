import { Component } from '@angular/core';
import { ChartDatasets } from '../../../../core/models/chart.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { DashboardMachineActivity } from "../../../../core/models/dashboard.model";
import { DashboardService } from "../../../../core/services/dashboard.service";
import { interval, take } from "rxjs";
import { DUMMY_MACHINE_ACTIVITY } from "./machine-activity.dummy";
import { ChartMachineActivityComponent } from "./chart-machine-activity.component";
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";
import { untilDestroyed } from "../../../../core/helpers/rxjs.helper";

@Component({
    selector: 'ahm-machine-activity',
    templateUrl: './machine-activity.component.html',
    styleUrls: [ './machine-activity.component.scss' ],
    host: {
        'class': 'dashboard-card justify-content-between',
    },
})
export class MachineActivityComponent {
    untilDestroyed = untilDestroyed();
    dateFilter: DateFilter = getDefaultDateFilter();
    machineActivity: DashboardMachineActivity = DUMMY_MACHINE_ACTIVITY;
    chartDatasets: ChartDatasets = this.convertToDatasets(DUMMY_MACHINE_ACTIVITY);

    constructor(private dashboardService: DashboardService,) {
        ChartMachineActivityComponent.machineActivity = DUMMY_MACHINE_ACTIVITY;
    }

    ngOnInit() {
        this.getChartData();
        interval(60 * 1000 * 2)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.getChartData();
            });
    }

    getChartData(): void {
        this.dashboardService.getMachineActivity(this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if (resp.success) {
                        this.machineActivity = resp.data;
                        ChartMachineActivityComponent.machineActivity = resp.data;
                        this.chartDatasets = this.convertToDatasets(resp.data);
                    }
                },
                error: () => {
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.getChartData();
    }

    convertToDatasets(machineActivity: DashboardMachineActivity): ChartDatasets {
        const chartDatasets: ChartDatasets = [];

        for (let y = 0; y < machineActivity?.machine_list[0]?.data.length; y++) {
            const data: number[] = [];
            const backgroundColor: string[] = [];
            chartDatasets.push({ data, backgroundColor });
        }

        machineActivity.machine_list.forEach((machine, x) => {
            machine.data.forEach((data, y) => {
                const d = data;

                let backgroundColor = 'rgba(140, 137, 180, 0.5)';
                if (d === 0) {
                    backgroundColor = '#DC3545';
                } else if (d === 1) {
                    backgroundColor = '#F1BE42';
                } else if (d === 2) {
                    backgroundColor = '#28A745';
                }

                chartDatasets[y].data.push(1);
                chartDatasets[y].backgroundColor.push(backgroundColor);
            });
        });


        return chartDatasets;
    }
}
