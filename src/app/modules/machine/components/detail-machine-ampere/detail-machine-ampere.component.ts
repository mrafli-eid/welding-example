import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineAmpereAndVoltage } from 'src/app/core/models/machine.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { DUMMY_DETAIL_MACHINE_AMPERE } from './detail-machine-ampere';
import { interval, take } from 'rxjs';


@Component({
  selector: 'ahm-detail-machine-ampere',
  templateUrl: './detail-machine-ampere.component.html',
  styleUrls: ['./detail-machine-ampere.component.scss'],
  host: {
    'class': 'dashboard-card',
  },
})
export class DetailMachineAmpereComponent {
  untilDestroyed = untilDestroyed();
  dateFilter: DateFilter = getDefaultDateFilter();

  @Input() machine_name = '';
  @Input() robot_name = '';
  
  setting = 950;
  minimum = 900;
  maximum = 1000;

  ampereList: DetailMachineAmpereAndVoltage = DUMMY_DETAIL_MACHINE_AMPERE;

  constructor(private machineService: MachineService,
    private router: Router) {}
    
  ngOnInit() {
    this.fetchAmpere();
    interval(1 * 60 * 1000)
      .pipe(this.untilDestroyed())
      .subscribe(() => {
        this.fetchAmpere();
      });
  }

  fetchAmpere(){
    this.machineService.getAmpere(this.machine_name, this.robot_name, this.dateFilter)
    .pipe(take(1))
    .subscribe({
      next: (resp) => {
        if (resp.success) {
          this.ampereList = resp.data;
        }
      }
    });
  }

  onFilterChanged(dateFilter: DateFilter) {
    this.dateFilter = dateFilter;
    this.fetchAmpere();
  }

  download() {
    // this.machineService.downloadLubOilPressure(this.id, this.dateFilter);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
