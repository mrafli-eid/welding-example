import { Component, Input } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { MachineService } from '../../../../core/services/machine.service';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { DetailMachineLubOilPressure } from '../../../../core/models/machine.model';
import { DUMMY_DETAIL_MaCHINE_LUB_OIL_PRESSURE } from "./detail-machine-lub-oil-pressure.dummy";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";

@Component({
    selector: 'ahm-detail-machine-lub-oil-pressure',
    templateUrl: './detail-machine-lub-oil-pressure.component.html',
    styleUrls: [ './detail-machine-lub-oil-pressure.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class DetailMachineLubOilPressureComponent {
    untilDestroyed = untilDestroyed();

    @Input() id = '';

    dateFilter: DateFilter = getDefaultDateFilter();
    lubOilPressureList: DetailMachineLubOilPressure[] = DUMMY_DETAIL_MaCHINE_LUB_OIL_PRESSURE;

    minimum = 0.1;
    lowerLimit = 0.5;
    upperLimit = 1.2;
    maximum = 1.27;

    constructor(private machineService: MachineService,
                private router: Router) {
    }

    ngOnInit() {
        this.fetchLubOilPressure();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchLubOilPressure();
            });
    }

    fetchLubOilPressure() {
        this.machineService.getLubOilPressure(this.id, this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    this.lubOilPressureList = resp.data || [];
                },
                error: () => {
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchLubOilPressure();
    }

    download() {
        this.machineService.downloadLubOilPressure(this.id, this.dateFilter);
    }

    goToSettings() {
        this.router.navigate([ '/settings' ]);
    }
}
