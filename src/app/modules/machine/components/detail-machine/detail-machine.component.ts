import { Component, Input, OnInit } from '@angular/core';
import { DetailMachine } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE } from "./detail-machine.dummy";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";

@Component({
    selector: 'ahm-detail-machine',
    templateUrl: './detail-machine.component.html',
    styleUrls: [ './detail-machine.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class DetailMachineComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';
    @Input() src = '';
    detailMachine: DetailMachine = DUMMY_DETAIL_MACHINE;

    constructor(private machineService: MachineService) {
    }

    ngOnInit() {
        this.fetchDetailMachine();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchDetailMachine();
            });
    }

    fetchDetailMachine() {
        this.machineService.getDetailMachine(this.machine_name)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if (resp.data?.length > 0) {
                        this.detailMachine = resp.data[0];
                    }
                },
                error: () => {
                },
            });
    }
}
