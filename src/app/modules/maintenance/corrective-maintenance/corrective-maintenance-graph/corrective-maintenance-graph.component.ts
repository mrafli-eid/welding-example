import { Component } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { MaintenancePreventiveChart } from '../../../../core/models/maintenance-preventive.model';
import { DUMMY_MAINTENANCE_PREVENTIVE_CHART_LIST } from '../../preventive-maintenance/preventive-maintenance-graph/preventive-maintenance-graph.dummy';
import { ActivatedRoute } from '@angular/router';
import { interval, take } from 'rxjs';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { MaintenanceCorrectiveService } from '../../../../core/services/maintenance-corrective.service';

@Component({
    selector: 'ahm-corrective-maintenance-graph',
    templateUrl: './corrective-maintenance-graph.component.html',
    styleUrls: ['./corrective-maintenance-graph.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class CorrectiveMaintenanceGraphComponent {
    untilDestroyed = untilDestroyed();
    machine_name = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    data: MaintenancePreventiveChart[] =
        DUMMY_MAINTENANCE_PREVENTIVE_CHART_LIST;

    page: number = 0;

    constructor(
        private maintenanceService: MaintenanceCorrectiveService,
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
