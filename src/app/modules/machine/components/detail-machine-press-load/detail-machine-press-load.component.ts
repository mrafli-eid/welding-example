import { Component, Input, OnInit } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { DetailMachinePressLoad } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { Router } from '@angular/router';
import { DUMMY_DETAIL_MACHINE_PRESS_LOAD } from "./detail-machine-press-load.dummy";
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';

@Component({
    selector: 'ahm-detail-machine-press-load',
    templateUrl: './detail-machine-press-load.component.html',
    styleUrls: [ './detail-machine-press-load.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class DetailMachinePressLoadComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    @Input() id = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    pressLoadList: DetailMachinePressLoad[] = DUMMY_DETAIL_MACHINE_PRESS_LOAD;

    constructor(private machineService: MachineService,
                private router: Router) {
    }

    ngOnInit() {
        this.fetchPressLoad();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchPressLoad();
            });
    }

    fetchPressLoad() {
        this.machineService.getPressLoad(this.id, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    this.pressLoadList = resp.data || [];
                },
                error: () => {
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchPressLoad();
    }

    download() {
        this.machineService.downloadPressLoad(this.id, this.dateFilter);
    }

    goToSettings() {
        this.router.navigate([ '/SOMEWHERE' ]);
    }
}
