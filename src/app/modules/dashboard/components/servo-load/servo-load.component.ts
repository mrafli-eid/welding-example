import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { debounceTime, take } from 'rxjs';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { Machine } from 'src/app/core/models/layout-machine.model';
import { DetailMachineServoLoad } from 'src/app/core/models/machine.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { MachineService } from 'src/app/core/services/machine.service';
import { DUMMY_DETAIL_MACHINE_SERVO_LOAD } from 'src/app/modules/machine/components/detail-machine-servo-load/detail-machine-servo-load';

@Component({
    selector: 'ahm-servo-load',
    templateUrl: './servo-load.component.html',
    styleUrls: ['./servo-load.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class ServoLoadComponent {
    untilDestroyed = untilDestroyed();

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}

    @Input() machineList: Machine[] = [];

    dateFilter: DateFilter = getDefaultDateFilter();
    servoLoadList: DetailMachineServoLoad = DUMMY_DETAIL_MACHINE_SERVO_LOAD;

    robotName: string = 'MASTER' || 'SLAVE';

    standard = 10;
    warning = 15;
    breakdown = 20;
    average = 13;

    page: number = 0;

    ngOnInit() {
        this.robotName = 'MASTER';
        setInterval(() => {
            this.servoLoadList = {
                minimum: 10,
                maximum: 20,
                ...DUMMY_DETAIL_MACHINE_SERVO_LOAD,
                data: DUMMY_DETAIL_MACHINE_SERVO_LOAD.data.map(item => ({
                    date_time: item.date_time,
                    label: item.label,
                    value:
                        Math.floor(
                            Math.random() * (this.breakdown - this.standard + 1)
                        ) + this.standard,
                })),
            };
        }, 3000);
    }

    changeRobot() {
        if (this.robotName === 'MASTER') {
            this.robotName = 'SLAVE';
            this.getChartData();
        } else {
            this.robotName = 'MASTER';
            this.getChartData();
        }
        console.log(this.robotName);
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.getChartData();
    }

    download() {
        const machineName = encodeURIComponent(
            this.machineList[this.page].name
        );

        this.machineService.downloadServoLoad(machineName, this.robotName);
    }

    goToSettings() {
        const machineName = encodeURIComponent(
            this.machineList[this.page].name
        );

        this.router.navigate(['/settings'], {
            queryParams: {
                name: 'Servo Load',
                machine: machineName,
                robot: this.robotName,
            },
        });
    }

    getChartData(): void {
        const machineName = encodeURIComponent(
            this.machineList[this.page].name
        );
        this.machineService
            .getServoLoad(machineName, this.robotName, this.dateFilter)
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

    onPageChange($event) {
        this.page = $event;
        this.getChartData();
    }
}
