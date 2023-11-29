import { Component } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { interval, take } from 'rxjs';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { ActivatedRoute } from '@angular/router';
import { MaintenancePreventiveChart } from '../../../../core/models/maintenance-preventive.model';
import { DUMMY_MAINTENANCE_PREVENTIVE_CHART_LIST } from './preventive-maintenance-graph.dummy';
import { MaintenancePreventiveService } from '../../../../core/services/maintenance-preventive.service';

@Component({
    selector: 'ahm-preventive-maintenance-graph',
    templateUrl: './preventive-maintenance-graph.component.html',
    styleUrls: ['./preventive-maintenance-graph.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class PreventiveMaintenanceGraphComponent {
    untilDestroyed = untilDestroyed();
    machine_name = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    data: MaintenancePreventiveChart[] =
        DUMMY_MAINTENANCE_PREVENTIVE_CHART_LIST;

    page: number = 0;

    constructor(
        private maintenanceService: MaintenancePreventiveService,
        private activatedRoute: ActivatedRoute
    ) {
        this.machine_name = this.activatedRoute.snapshot.paramMap.get('name');
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
        this.maintenanceService
            .getChart(this.machine_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.data = resp.data;
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
