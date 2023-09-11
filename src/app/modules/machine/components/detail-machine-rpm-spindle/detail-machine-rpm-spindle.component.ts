import { Component, Input, OnChanges, OnInit, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineRpmSpindle } from '../../../../core/models/machine.model';
import { MachineService } from '../../../../core/services/machine.service';
import { DUMMY_DETAIL_MACHINE_RPM_SPINDLE } from './detail-machine-rpm-spindle';
import { DEFAULT_INTERVAL } from 'src/app/core/consts/app.const';
import { interval, take } from 'rxjs';

@Component({
  selector: 'ahm-detail-machine-rpm-spindle',
  templateUrl: './detail-machine-rpm-spindle.component.html',
  styleUrls: ['./detail-machine-rpm-spindle.component.scss'],
  host: {
    'class': 'dashboard-card',
},
})
export class DetailMachineRpmSpindleComponent {
  untilDestroyed = untilDestroyed();
  
  @Input() machine_name = '';
  dateFilter: DateFilter = getDefaultDateFilter();
  maximum = 100;

  rpmSpindleList: DetailMachineRpmSpindle = DUMMY_DETAIL_MACHINE_RPM_SPINDLE;
 
  constructor(private machineService: MachineService,
                private router: Router) {
    }
  
  ngOnChanges() {
    this.fetchRpmSpindle();
    interval(DEFAULT_INTERVAL)
    .pipe(this.untilDestroyed())
    .subscribe(() => {
      this.fetchRpmSpindle();
    });
  }
  
  fetchRpmSpindle(){
    this.machineService.getRpmSpindle(this.machine_name, this.dateFilter)
    .pipe(take(1))
    .subscribe({
      next: (resp) => {
        if (resp.success) {
          this.rpmSpindleList = resp.data;
        }
      }
    });
  }
    
  onFilterChanged(dateFilter: DateFilter) {
    this.dateFilter = dateFilter;
    this.fetchRpmSpindle();
  }

  download() {
    // this.machineService.downloadLubOilPressure(this.id, this.dateFilter);
  }

  goToSettings() {
    this.router.navigate(['/settings'], { queryParams: {name: "RPM A", machine: this.machine_name } });
  }

}
