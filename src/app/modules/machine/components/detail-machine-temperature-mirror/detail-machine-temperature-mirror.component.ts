import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { MachineService } from 'src/app/core/services/machine.service';

@Component({
  selector: 'ahm-detail-machine-temperature-mirror',
  templateUrl: './detail-machine-temperature-mirror.component.html',
  styleUrls: ['./detail-machine-temperature-mirror.component.scss'],
  host: {
    'class': 'dashboard-card',
  },
})
export class DetailMachineTemperatureMirrorComponent {
  untilDestroyed = untilDestroyed();

  @Input() id = '';
  dateFilter: DateFilter = getDefaultDateFilter();

  constructor(private machineService: MachineService,
    private router: Router) {
  }
}
