import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineRunningHour } from 'src/app/core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { DUMMY_DETAIL_MACHINE_RUNNING_HOUR } from './detail-machine-running-hour';

@Component({
  selector: 'ahm-detail-machine-running-hour',
  templateUrl: './detail-machine-running-hour.component.html',
  styleUrls: ['./detail-machine-running-hour.component.scss'],
  host: {
    'class': 'dashboard-card',
  },
})
export class DetailMachineRunningHourComponent {
  untilDestroyed = untilDestroyed();
  
  dateFilter: DateFilter = getDefaultDateFilter();
  @Input() id = '';
  maximum = 950;

  runningHourList: DetailMachineRunningHour[] = DUMMY_DETAIL_MACHINE_RUNNING_HOUR;

  constructor(private machineService: MachineService,
                private router: Router) {
    }
    
  fetchRunningHour(){
    this.machineService.get
  }
    
  onFilterChanged(dateFilter: DateFilter) {
    this.dateFilter = dateFilter;
    // this.fetchLubOilPressure();
  }

  download() {
    this.machineService.downloadLubOilPressure(this.id, this.dateFilter);
  }

  goToSettings() {
    this.router.navigate(['/SOMEWHERE']);
  }
}
