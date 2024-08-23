import { Component, Input, Inject } from '@angular/core';
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
import { ProductionPlanService } from 'src/app/core/services/production-plan.service';
import { CalendarProductionGraph } from 'src/app/core/models/register.model';
import { DialogEditProductionGraphComponent } from '../../dialogs/dialog-edit-production-graph/dialog-edit-production-graph.component';
import {
    MAT_DIALOG_DATA,
    MatDialog,
    MatDialogRef,
} from '@angular/material/dialog';
import { ProductionGraphPlan } from 'src/app/core/models/production-graph.model';

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
    calendarProductionGraph: CalendarProductionGraph[];

    page: number = 0;

    constructor(
        private dashboardService: DashboardService,
        private router: Router,
        private productionPlanService: ProductionPlanService,
        private matDialog: MatDialog
    ) {}

    ngOnInit() {
        // this.getCalendarProductionGraph();
        // this.getChartData();
        // interval(DEFAULT_INTERVAL)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.getChartData();
        //     });
        setInterval(() => {
            this.productionGraph = {
                machine_name: DUMMY_DASHBOARD_PRODUCTION_GRAPH.machine_name,
                subject_name: DUMMY_DASHBOARD_PRODUCTION_GRAPH.subject_name,
                data: DUMMY_DASHBOARD_PRODUCTION_GRAPH.data.map(item => ({
                    actual: Math.round(Math.random() * (1600 - 1500) + 1500),
                    label: item.label,
                    date_time: item.date_time,
                    plan: Math.round(Math.random() * (1600 - 1500) + 1500),
                })),
            };
        }, 3000);
    }

    edit(data: CalendarProductionGraph) {
        const matDialogRef = this.matDialog.open(
            DialogEditProductionGraphComponent,
            {
                data,
            }
        );

        matDialogRef.afterClosed().subscribe(resp => {
            if (resp) {
                this.getChartData();
            }
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
                next: resp => {
                    if (resp.success) {
                        this.productionGraph = resp.data;
                    }
                },
                error: () => {},
            });
    }

    getCalendarProductionGraph() {
        this.productionPlanService
            .getCalendarProductionGraph()
            .pipe(take(1))
            .subscribe((res: any) => {
                console.log(res.data);
                this.calendarProductionGraph = res.data;
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
