import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineAmpereAndVoltage } from 'src/app/core/models/machine.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE_VOLTAGE } from './detail-machine-voltage';
import {
    DEFAULT_INTERVAL,
    ONE_MINUTE_INTERVAL,
} from 'src/app/core/consts/app.const';

@Component({
    selector: 'ahm-detail-machine-voltage',
    templateUrl: './detail-machine-voltage.component.html',
    styleUrls: ['./detail-machine-voltage.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineVoltageComponent {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';
    @Input() robot_name = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    setting = 250;
    minimum = 100;
    maximum = 400;

    voltageList: DetailMachineAmpereAndVoltage = DUMMY_DETAIL_MACHINE_VOLTAGE;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}

    ngOnInit() {
        this.robot_name = 'MASTER';

        setInterval(() => {
            this.voltageList = {
                ...DUMMY_DETAIL_MACHINE_VOLTAGE,
                maximum: 400,
                minimum: 100,
                first_data: DUMMY_DETAIL_MACHINE_VOLTAGE.first_data.map(() => ({
                    value: Math.round(Math.random() * (300 - 100) + 100),
                })),
                second_data: DUMMY_DETAIL_MACHINE_VOLTAGE.second_data.map(
                    () => ({
                        value: Math.round(Math.random() * (300 - 100) + 100),
                    })
                ),
            };
        }, 3000);
    }

    ngOnChanges() {
        // this.fetchVoltage();
        // interval(ONE_MINUTE_INTERVAL)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchVoltage();
        //     });
    }

    fetchVoltage() {
        this.machineService
            .getVoltage(this.machine_name, this.robot_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.success) {
                        this.voltageList = resp.data;
                    }
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchVoltage();
    }

    download() {
        this.machineService.downloadVoltage(this.machine_name, this.robot_name);
    }

    goToSettings() {
        this.router.navigate(['/settings'], {
            queryParams: {
                name: 'Voltage',
                machine: this.machine_name,
                robot: this.robot_name,
            },
        });
    }
}
