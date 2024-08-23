import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { DEFAULT_INTERVAL } from 'src/app/core/consts/app.const';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import {
    DetailMachineAmpereAndVoltage,
    DetailMachineSansoMatic,
    DetailMachineTemperatureMirror,
} from 'src/app/core/models/machine.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { DUMMY_DETAIL_MACHINE_SANSO_MATIC } from './detail-machine-sanso-matic';
import { DUMMY_DETAIL_MACHINE_VOLTAGE } from '../detail-machine-voltage/detail-machine-voltage';

@Component({
    selector: 'ahm-detail-machine-sanso-matic',
    templateUrl: './detail-machine-sanso-matic.component.html',
    styleUrls: ['./detail-machine-sanso-matic.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineSansoMaticComponent {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';
    dateFilter: DateFilter = getDefaultDateFilter();

    sansoMaticList: DetailMachineAmpereAndVoltage;
    minimum = 13;
    medium = 20;
    maximum = 40;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}

    ngOnInit() {
        setInterval(() => {
            this.sansoMaticList = {
                ...DUMMY_DETAIL_MACHINE_VOLTAGE,
                first_data: DUMMY_DETAIL_MACHINE_VOLTAGE.first_data.map(() => ({
                    value: Math.round(Math.random() * (10 - 1) + 1),
                })),
                second_data: DUMMY_DETAIL_MACHINE_VOLTAGE.second_data.map(
                    () => ({
                        value: Math.round(Math.random() * (10 - 1) + 1),
                    })
                ),
            };
        }, 3000);
    }

    ngOnChanges() {
        // this.fetchSansoMatic();
        // interval(DEFAULT_INTERVAL)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchSansoMatic();
        //     });
    }

    fetchSansoMatic() {
        this.machineService
            .getSansoMatic(this.machine_name, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (res: any) => {
                    if (res.success) {
                        this.sansoMaticList = res.data;
                    }
                },
                error() {
                    console.log('error api sanso matic');
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchSansoMatic();
    }

    download() {
        this.machineService.downloadSansoMatic(this.machine_name);
    }

    goToSettings() {
        this.router.navigate(['/settings'], {
            queryParams: { name: 'Sanso Matic A', machine: this.machine_name },
        });
    }
}
