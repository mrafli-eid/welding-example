import { Component } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { interval, take } from 'rxjs';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardMachineAlarm } from '../../../../core/models/dashboard.model';
import { DUMMY_TOP_MACHINE_ALARM } from './top-machine-alarm.dummy';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';

@Component({
    selector: 'ahm-top-machine-alarm',
    templateUrl: './top-machine-alarm.component.html',
    styleUrls: ['./top-machine-alarm.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class TopMachineAlarmComponent {
    untilDestroyed = untilDestroyed();

    dateFilter: DateFilter = getDefaultDateFilter();
    machineAlarms: DashboardMachineAlarm[] = DUMMY_TOP_MACHINE_ALARM;

    constructor(private dashboardService: DashboardService) {}

    ngOnInit() {
        this.getChartData();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.getChartData();
            });
    }

    getChartData(): void {
        this.dashboardService
            .getMachineAlarm(this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.machineAlarms = resp.data;
                    }
                },
                error: () => {},
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.getChartData();
    }
}
