import { Component, Input } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { DetailMachineActivityMachine } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE_ACTIVITY_MACHINE } from "./detail-machine-activity-machine.dummy";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";

@Component({
    selector: 'ahm-detail-machine-activity-machine',
    templateUrl: './detail-machine-activity-machine.component.html',
    styleUrls: [ './detail-machine-activity-machine.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class DetailMachineActivityMachineComponent {
    untilDestroyed = untilDestroyed();

    @Input() id = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    activityMachineList: DetailMachineActivityMachine = DUMMY_DETAIL_MACHINE_ACTIVITY_MACHINE;

    constructor(private machineService: MachineService) {
    }

    ngOnInit() {
        this.fetchActivityMachine();
        interval(1 * 60 * 1000)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchActivityMachine();
            });
    }

    fetchActivityMachine() {
        this.machineService.getActivityMachine(this.id, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if(resp.success) {
                        this.activityMachineList = resp.data;
                    }
                },
                error: () => {
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchActivityMachine();
    }

    download() {
        this.machineService.downloadActivityMachine(this.id, this.dateFilter);
    }
}
