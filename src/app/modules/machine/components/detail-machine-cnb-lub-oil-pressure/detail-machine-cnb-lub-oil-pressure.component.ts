import { Component, Input } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { DetailMachineCnbLubOilPressure } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { DUMMY_DETAIL_MACHINE_CNB_LUB_OIL_PRESSURE } from "./detail-machine-cnb-lub-oil-pressure.dummy";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";

@Component({
    selector: 'ahm-detail-machine-cnb-lub-oil-pressure',
    templateUrl: './detail-machine-cnb-lub-oil-pressure.component.html',
    styleUrls: [ './detail-machine-cnb-lub-oil-pressure.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class DetailMachineCnbLubOilPressureComponent {
    untilDestroyed = untilDestroyed();

    @Input() id = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    cnbLubOilPressureList: DetailMachineCnbLubOilPressure[] = DUMMY_DETAIL_MACHINE_CNB_LUB_OIL_PRESSURE;

    maximum = 0.53;
    minimum = 0;
    lowerLimit = 0.01;
    upperLimit = 0.45;

    constructor(private machineService: MachineService,
                private router: Router) {
    }

    ngOnInit() {
        this.fetchCnbLubOilPressure();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchCnbLubOilPressure();
            });
    }

    fetchCnbLubOilPressure() {
        this.machineService.getCnbLubOilPressure(this.id, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    this.cnbLubOilPressureList = resp.data || [];
                },
                error: () => {
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchCnbLubOilPressure();
    }

    download() {
        this.machineService.downloadCnbLubOilPressure(this.id, this.dateFilter);
    }

    goToSettings() {
        this.router.navigate([ '/SOMEWHERE' ]);
    }
}
