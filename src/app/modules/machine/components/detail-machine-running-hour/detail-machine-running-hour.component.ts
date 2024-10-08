import {
    Component,
    Input,
    OnChanges,
    OnInit,
    SimpleChanges,
    ChangeDetectionStrategy,
} from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineRunningHour } from 'src/app/core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE_RUNNING_HOUR } from './detail-machine-running-hour';
import {
    DEFAULT_INTERVAL,
    HALF_MINUTE_INTERVAL,
} from 'src/app/core/consts/app.const';

@Component({
    selector: 'ahm-detail-machine-running-hour',
    templateUrl: './detail-machine-running-hour.component.html',
    styleUrls: ['./detail-machine-running-hour.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineRunningHourComponent {
    untilDestroyed = untilDestroyed();

    dateFilter: DateFilter = getDefaultDateFilter();
    @Input() machine_name = '';
    @Input() robot_name = '';
    maximum = 9500;

    runningHourList: DetailMachineRunningHour =
        DUMMY_DETAIL_MACHINE_RUNNING_HOUR;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}

    ngOnInit() {
        setInterval(() => {
            this.runningHourList = {
                ...DUMMY_DETAIL_MACHINE_RUNNING_HOUR,
                data: DUMMY_DETAIL_MACHINE_RUNNING_HOUR.data.map(item => ({
                    ...item,
                    value: Math.floor(Math.random() * (1600 - 1500) + 1500),
                })),
            };
        }, 3000);
    }

    ngOnChanges() {
        // this.fetchRunningHour();
        // interval(HALF_MINUTE_INTERVAL)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchRunningHour();
        //     });
    }

    fetchRunningHour() {
        this.machineService
            .getRunningHour(this.machine_name, this.robot_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.runningHourList = resp.data;
                    }
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchRunningHour();
    }

    download() {
        this.machineService.downloadRunningHour(
            this.machine_name,
            this.robot_name
        );
    }

    goToSettings() {
        this.router.navigate(['/settings'], {
            queryParams: {
                name: 'Running Hour',
                machine: this.machine_name,
                robot: this.robot_name,
            },
        });
    }
}
