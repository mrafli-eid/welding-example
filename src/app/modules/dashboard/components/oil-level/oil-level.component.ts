import { Component, Input, OnInit } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { interval, take } from 'rxjs';
import { DashboardOilLevel } from '../../../../core/models/dashboard.model';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DUMMY_DASHBOARD_OIL_LEVEL } from './oil-level.dummy';
import { Machine } from '../../../../core/models/layout-machine.model';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";

@Component({
    selector: 'ahm-oil-level',
    templateUrl: './oil-level.component.html',
    styleUrls: [ './oil-level.component.scss' ],
    host: {
        'class': 'dashboard-card justify-content-between',
    },
})
export class OilLevelComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    @Input() machineList: Machine[] = [];
    dateFilter: DateFilter = getDefaultDateFilter();
    oilLevel: DashboardOilLevel = DUMMY_DASHBOARD_OIL_LEVEL;

    page: number = 0;

    maximum = 300;
    warning = 150;
    minimum = 0;

    constructor(private dashboardService: DashboardService) {
    }

    ngOnInit() {
        this.getChartData();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.getChartData();
            });
    }

    getChartData(): void {
        const machineName = encodeURIComponent(this.machineList[this.page].name);
        this.dashboardService.getOilLevel(machineName, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if (resp.success) {
                        this.oilLevel = resp.data;
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

    onPageChange($event) {
        this.page = $event;
        this.getChartData();
    }
}
