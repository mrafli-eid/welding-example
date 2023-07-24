import { Component, Input } from '@angular/core';
import { interval, take } from "rxjs";
import { DashboardService } from "../../../../../core/services/dashboard.service";
import { Machine } from "../../../../../core/models/layout-machine.model";
import { DateFilter } from "../../../../../core/models/date-filter.model";
import { getDefaultDateFilter } from "../../../../../core/consts/datepicker.const";
import { DashboardGrafikMttr } from "../../../../../core/models/dashboard.model";
import { DUMMY_DASHBOARD_MTTR } from "../maintenance-indicator-graph.dummy";
import { DEFAULT_INTERVAL } from "../../../../../core/consts/app.const";
import { untilDestroyed } from "../../../../../core/helpers/rxjs.helper";
import { DUMMY_DASHBOARD_PRODUCTION_GRAPH } from "../../production-graph/production-graph.dummy";

@Component({
    selector: 'ahm-maintenance-indicator-graph-mttr',
    templateUrl: './maintenance-indicator-graph-mttr.component.html',
    styleUrls: [ '../maintenance-indicator-graph.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class MaintenanceIndicatorGraphMTTRComponent {
    untilDestroyed = untilDestroyed();

    @Input() machineList: Machine[] = [];
    dateFilter: DateFilter = getDefaultDateFilter();
     chartData: DashboardGrafikMttr = DUMMY_DASHBOARD_MTTR;
    page: number = 0;

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
        // const machineName = encodeURIComponent(this.machineList[this.page].name);
        this.dashboardService.getGrafikMttr(this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if (resp.success) {
                        this.chartData = resp.data;
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


    protected readonly DUMMY_DASHBOARD_PRODUCTION_GRAPH = DUMMY_DASHBOARD_PRODUCTION_GRAPH;
}
