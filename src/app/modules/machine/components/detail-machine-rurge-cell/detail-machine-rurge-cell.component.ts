import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { interval, take } from 'rxjs';
import { DetailMachineRurgeCell } from 'src/app/core/models/machine.model';
import { DUMMY_DETAIL_MACHINE_RURGE_CELL } from './detail-machine-rurge-cell';
import { DEFAULT_INTERVAL } from 'src/app/core/consts/app.const';

@Component({
    selector: 'ahm-detail-machine-rurge-cell',
    templateUrl: './detail-machine-rurge-cell.component.html',
    styleUrls: ['./detail-machine-rurge-cell.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineRurgeCellComponent {
    untilDestroyed = untilDestroyed();
    dateFilter: DateFilter = getDefaultDateFilter();

    @Input() machine_name = '';
    maximum = 20;
    rurgeCellList: DetailMachineRurgeCell = DUMMY_DETAIL_MACHINE_RURGE_CELL;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}

    ngOnInit() {
        setInterval(() => {
            this.rurgeCellList = {
                ...DUMMY_DETAIL_MACHINE_RURGE_CELL,
                data: DUMMY_DETAIL_MACHINE_RURGE_CELL.data.map(item => ({
                    ...item,
                    value: Math.floor(Math.random() * (30 - 20)) + 10,
                })),
            };
        }, 3000);
    }

    ngOnChanges() {
        // this.fetchRurgeCell();
        // interval(DEFAULT_INTERVAL)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchRurgeCell();
        //     });
    }

    fetchRurgeCell() {
        this.machineService
            .getRurgeCell(this.machine_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.rurgeCellList = resp.data;
                    }
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchRurgeCell();
    }

    download() {
        this.machineService.downloadRurgeCell(this.machine_name);
    }

    goToSettings() {
        this.router.navigate(['/settings'], {
            queryParams: { name: 'Rurge Cell', machine: this.machine_name },
        });
    }
}
