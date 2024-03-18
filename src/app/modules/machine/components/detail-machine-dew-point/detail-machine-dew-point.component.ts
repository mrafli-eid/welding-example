import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineDewPoint } from 'src/app/core/models/machine.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE_DEW_POINT } from './detail-machine-dew-point';
import { DEFAULT_INTERVAL } from 'src/app/core/consts/app.const';

@Component({
    selector: 'ahm-detail-machine-dew-point',
    templateUrl: './detail-machine-dew-point.component.html',
    styleUrls: ['./detail-machine-dew-point.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineDewPointComponent {
    untilDestroyed = untilDestroyed();
    dateFilter: DateFilter = getDefaultDateFilter();

    @Input() machine_name = '';
    maximum = 20;
    dewPointList: DetailMachineDewPoint = DUMMY_DETAIL_MACHINE_DEW_POINT;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}

    ngOnChanges() {
        this.fetchDewPoint();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchDewPoint();
            });
    }

    fetchDewPoint() {
        this.machineService
            .getDewPoint(this.machine_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.dewPointList = resp.data;
                    }
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchDewPoint();
    }

    download() {
        this.machineService.downloadDewPoint(
            this.machine_name
        );
    }

    goToSettings() {
        this.router.navigate(['/settings'], {
            queryParams: { name: 'Dew Point', machine: this.machine_name },
        });
    }
}
