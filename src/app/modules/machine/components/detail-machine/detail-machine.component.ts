import { Component, Input, OnInit } from '@angular/core';
import { DetailMachine } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE } from './detail-machine.dummy';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';
import { getSortedRandomValues } from '../../../../core/helpers/random';
@Component({
    selector: 'ahm-detail-machine',
    templateUrl: './detail-machine.component.html',
    styleUrls: ['./detail-machine.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';
    @Input() src = '';
    detailMachine: DetailMachine = DUMMY_DETAIL_MACHINE;

    constructor(private machineService: MachineService) {}

    ngOnInit() {
        // this.fetchDetailMachine();
        // interval(DEFAULT_INTERVAL)
        //     .pipe(this.untilDestroyed())
        //     .subscribe(() => {
        //         this.fetchDetailMachine();
        //     });

        setInterval(() => {
            const [val1, val2, val3] = getSortedRandomValues();
            this.detailMachine = {
                ...DUMMY_DETAIL_MACHINE,
                value_running: val3,
                value_idle: val2,
                value_stopline: val1,
            };
        }, 3000);
    }

    fetchDetailMachine() {
        this.machineService
            .getDetailMachine(this.machine_name)
            .pipe(take(1))
            .subscribe({
                next: resp => {
                    if (resp.data?.length > 0) {
                        this.detailMachine = resp.data[0];
                    }
                },
                error: () => {},
            });
    }
}
