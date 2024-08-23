import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { MachineService } from '../../../../core/services/machine.service';
import { Router } from '@angular/router';
import { debounceTime, interval, take } from 'rxjs';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import {
    DEFAULT_INTERVAL,
    ONE_MINUTE_INTERVAL,
} from '../../../../core/consts/app.const';
import { DetailMachineServoLoad } from 'src/app/core/models/machine.model';
import { DUMMY_DETAIL_MACHINE_SERVO_LOAD } from './detail-machine-servo-load';

@Component({
    selector: 'ahm-detail-machine-servo-load',
    templateUrl: './detail-machine-servo-load.component.html',
    styleUrls: ['./detail-machine-servo-load.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineServoLoadComponent {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';
    @Input() robot_name = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    servoLoadList: DetailMachineServoLoad = DUMMY_DETAIL_MACHINE_SERVO_LOAD;

    standard = 10;
    warning = 15;
    breakdown = 20;
    average = 13;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}

    ngOnInit() {
        this.robot_name = 'MASTER';
        setInterval(() => {
            this.servoLoadList = {
                ...DUMMY_DETAIL_MACHINE_SERVO_LOAD,
                data: DUMMY_DETAIL_MACHINE_SERVO_LOAD.data.map(item => ({
                    label: item.label,
                    date_time: item.date_time,
                    value: Math.floor(Math.random() * (30 - 20) + 10),
                })),
            };
        }, 3000);
    }

    ngOnChanges() {
        // this.fetchServoLoad();
        // interval(ONE_MINUTE_INTERVAL)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchServoLoad();
        //     });
    }

    fetchServoLoad() {
        this.machineService
            .getServoLoad(this.machine_name, this.robot_name, this.dateFilter)
            .pipe(take(1))
            .pipe(debounceTime(1000))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.servoLoadList = resp.data;
                    }
                },
                error: () => {},
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchServoLoad();
    }

    download() {
        this.machineService.downloadServoLoad(
            this.machine_name,
            this.robot_name
        );
    }

    goToSettings() {
        this.router.navigate(['/settings'], {
            queryParams: {
                name: 'Servo Load',
                machine: this.machine_name,
                robot: this.robot_name,
            },
        });
    }
}
