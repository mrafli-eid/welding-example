import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { interval, take } from 'rxjs';
import { DetailMachineRurgeCell } from 'src/app/core/models/machine.model';

@Component({
  selector: 'ahm-detail-machine-rurge-cell',
  templateUrl: './detail-machine-rurge-cell.component.html',
  styleUrls: ['./detail-machine-rurge-cell.component.scss'],
  host: {
    'class': 'dashboard-card',
  },
})
export class DetailMachineRurgeCellComponent {
    untilDestroyed = untilDestroyed();
    dateFilter: DateFilter = getDefaultDateFilter();

    @Input() machine_name = '';
    maximum = 20;
    rurgeCellList: DetailMachineRurgeCell = DUMMY;

    constructor(
        private machineService: MachineService,
        private router: Router
    ) {}
}
