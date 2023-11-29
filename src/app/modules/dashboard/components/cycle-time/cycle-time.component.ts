import { Component, Input, OnInit } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { interval, take } from 'rxjs';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardOilLevel } from '../../../../core/models/dashboard.model';
import { DUMMY_DASHBOARD_CYCLE_TIME } from './cycle-time.dummy';
import { Machine } from '../../../../core/models/layout-machine.model';
import { untilDestroyed } from '../../../../core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';

@Component({
    selector: 'ahm-cycle-time',
    templateUrl: './cycle-time.component.html',
    styleUrls: ['./cycle-time.component.scss'],
    host: {
        class: 'dashboard-card justify-content-between',
    },
})
export class CycleTimeComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    @Input() machineList: Machine[] = [];
    dateFilter: DateFilter = getDefaultDateFilter();
    cycleTime: DashboardOilLevel = DUMMY_DASHBOARD_CYCLE_TIME;

    page: number = 0;

    maximum = 4;
    minimum = 3;
    step = 1;

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
        const machineName = encodeURIComponent(
            this.machineList[this.page].name
        );
        this.dashboardService
            .getCycleTime(machineName, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.cycleTime = resp.data;
                    }
                },
                error: () => {},
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.getChartData();
    }

    onPageChange($event) {
        this.page = $event;
        this.getChartData();
    }
}
