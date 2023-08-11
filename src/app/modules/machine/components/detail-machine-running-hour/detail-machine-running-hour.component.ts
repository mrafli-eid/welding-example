import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineRunningHour } from 'src/app/core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { DUMMY_DETAIL_MACHINE_RUNNING_HOUR } from './detail-machine-running-hour';
import { DEFAULT_INTERVAL } from 'src/app/core/consts/app.const';
import { interval, take } from 'rxjs';

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
  @Input() machine_name = '';
  maximum = 950;
  robot_name = 'MASTER' || 'SLAVE';

  runningHourList: DetailMachineRunningHour = DUMMY_DETAIL_MACHINE_RUNNING_HOUR;

  constructor(private machineService: MachineService,
                private router: Router) {
    }
    
  ngOnInit() { 
    this.robot_name = 'MASTER';
    this.fetchRunningHour();
    interval(DEFAULT_INTERVAL)
    .pipe(this.untilDestroyed())
    .subscribe(() => {
      this.fetchRunningHour();
    });
    console.log(this.machine_name);
  }
  
  fetchRunningHour(){
    this.machineService.getRunningHour(this.machine_name, this.robot_name, this.dateFilter)
    .pipe(take(1))
    .subscribe({
      next: (resp) => {
        if (resp.success) {
          this.runningHourList = resp.data;
        }
      }
    });
  }
    
  onFilterChanged(dateFilter: DateFilter) {
    this.dateFilter = dateFilter;
    this.fetchRunningHour();
  }

  download() {
    // this.machineService.downloadLubOilPressure(this.id, this.dateFilter);
  }

  goToSettings() {
    this.router.navigate(['/SOMEWHERE']);
  }
}
