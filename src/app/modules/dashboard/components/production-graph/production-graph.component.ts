import { Component, Input } from '@angular/core';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { interval, take } from 'rxjs';
import { DashboardService } from '../../../../core/services/dashboard.service';
import { DashboardProductionGraph } from '../../../../core/models/dashboard.model';
import { DUMMY_DASHBOARD_PRODUCTION_GRAPH } from './production-graph.dummy';
import { Machine } from '../../../../core/models/layout-machine.model';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { Router } from '@angular/router';

@Component({
    selector: 'ahm-production-graph',
    templateUrl: './production-graph.component.html',
    styleUrls: ['./production-graph.component.scss'],
    host: {
        class: 'dashboard-card justify-content-between',
    },
})
export class ProductionGraphComponent {
    untilDestroyed = untilDestroyed();

    @Input() machineList: Machine[] = [];
    dateFilter: DateFilter = getDefaultDateFilter();
    productionGraph: DashboardProductionGraph =
        DUMMY_DASHBOARD_PRODUCTION_GRAPH;

    page: number = 0;

    constructor(
        private dashboardService: DashboardService,
        private router: Router
    ) {}

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
            .getProductionGraph(machineName, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if (resp.success) {
                        this.productionGraph = resp.data;
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

    goToSettings() {
        this.router.navigate(['/dashboard/setting-production-graph']);
    }
}
