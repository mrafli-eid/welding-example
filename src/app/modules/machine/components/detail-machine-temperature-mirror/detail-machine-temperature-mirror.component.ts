import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import {
    DetailMachineAmpereAndVoltage,
    DetailMachineTemperatureMirror,
} from 'src/app/core/models/machine.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE_TEMPERATURE_MIRROR } from './detail-machine-temperature-mirror';
import { DEFAULT_INTERVAL } from 'src/app/core/consts/app.const';
import { DUMMY_DETAIL_MACHINE_VOLTAGE } from '../detail-machine-voltage/detail-machine-voltage';

@Component({
    selector: 'ahm-detail-machine-temperature-mirror',
    templateUrl: './detail-machine-temperature-mirror.component.html',
    styleUrls: ['./detail-machine-temperature-mirror.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineTemperatureMirrorComponent {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    temperatureMirrorList: DetailMachineAmpereAndVoltage;

    minimum = 13;
    medium = 20;
    maximum = 40;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}

    ngOnInit() {
        // this.fetchTemperatureMirror();
        // interval(DEFAULT_INTERVAL)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchTemperatureMirror();
        //     });

        setInterval(() => {
            this.temperatureMirrorList = {
                ...DUMMY_DETAIL_MACHINE_VOLTAGE,
                minimum: 13,
                maximum: 40,
                first_data: DUMMY_DETAIL_MACHINE_VOLTAGE.first_data.map(() => ({
                    value: Math.round(Math.random() * (40 - 13) + 13),
                })),
                second_data: DUMMY_DETAIL_MACHINE_VOLTAGE.second_data.map(
                    () => ({
                        value: Math.round(Math.random() * (40 - 13) + 13),
                    })
                ),
            };
        }, 3000);
    }

    fetchTemperatureMirror() {
        // this.machineService
        //     .getTemperatureMirror(this.machine_name, this.dateFilter)
        //     .pipe(take(1))
        //     .subscribe({
        //         next: (res: any) => {
        //             if (res.success) {
        //                 this.temperatureMirrorList = res.data;
        //             }
        //         },
        //     });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchTemperatureMirror();
    }

    download() {
        this.machineService.downloadTemperatureMirror(this.machine_name);
    }

    goToSettings() {
        this.router.navigate(['/settings'], {
            queryParams: { name: 'Temp Mirror', machine: this.machine_name },
        });
    }
}
