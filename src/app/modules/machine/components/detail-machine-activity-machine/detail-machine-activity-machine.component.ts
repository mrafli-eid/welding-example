import { Component, Input } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { DetailMachineActivityMachine } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DUMMY_DETAIL_MACHINE_ACTIVITY_MACHINE } from './detail-machine-activity-machine.dummy';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';
import { getSortedRandomValues } from 'src/app/core/helpers/random';

@Component({
    selector: 'ahm-detail-machine-activity-machine',
    templateUrl: './detail-machine-activity-machine.component.html',
    styleUrls: ['./detail-machine-activity-machine.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineActivityMachineComponent {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    activityMachineList: DetailMachineActivityMachine =
        DUMMY_DETAIL_MACHINE_ACTIVITY_MACHINE;

    constructor(private machineService: MachineService) {}

    ngOnInit() {
        // this.fetchActivityMachine();
        // interval(1 * 60 * 1000)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchActivityMachine();
        //     });
        setInterval(() => {
            this.activityMachineList = {
                ...DUMMY_DETAIL_MACHINE_ACTIVITY_MACHINE,
                data: DUMMY_DETAIL_MACHINE_ACTIVITY_MACHINE.data.map(item => {
                    const [val1, val2, val3] = getSortedRandomValues();
                    return {
                        label: item.label,
                        value_run: val3,
                        value_idle: val2,
                        value_stop: val1,
                    };
                }),
            };
        }, 3000);
    }

    fetchActivityMachine() {
        this.machineService
            .getActivityMachine(this.machine_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.activityMachineList = resp.data;
                    }
                },
                error: () => {},
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchActivityMachine();
    }

    download() {
        this.machineService.downloadActivityMachine(this.machine_name);
    }
}
