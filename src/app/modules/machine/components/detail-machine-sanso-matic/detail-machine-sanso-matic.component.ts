import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { interval, take } from 'rxjs';
import { DEFAULT_INTERVAL } from 'src/app/core/consts/app.const';
import { getDefaultDateFilter } from 'src/app/core/consts/datepicker.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DateFilter } from 'src/app/core/models/date-filter.model';
import { DetailMachineSansoMatic, DetailMachineTemperatureMirror } from 'src/app/core/models/machine.model';
import { MachineService } from 'src/app/core/services/machine.service';
import { DUMMY_DETAIL_MACHINE_SANSO_MATIC } from './detail-machine-sanso-matic';

@Component({
  selector: 'ahm-detail-machine-sanso-matic',
  templateUrl: './detail-machine-sanso-matic.component.html',
  styleUrls: ['./detail-machine-sanso-matic.component.scss'],
  host: {
    'class': 'dashboard-card',
  },
})
export class DetailMachineSansoMaticComponent {
  untilDestroyed = untilDestroyed();

  @Input() machine_name = '';
  dateFilter: DateFilter = getDefaultDateFilter();

  sansoMaticList: DetailMachineSansoMatic = DUMMY_DETAIL_MACHINE_SANSO_MATIC;
  minimum = 13;
  medium = 20;
  maximum = 40;

  constructor(private machineService: MachineService,
    private router: Router) {
  }

  ngOnInit() {
    this.fetchSansoMatic();
    interval(DEFAULT_INTERVAL)
      .pipe(this.untilDestroyed())
      .subscribe(() => {
        this.fetchSansoMatic();
      })
  }

  ngOnChanges() {
    this.fetchSansoMatic();
  }

  fetchSansoMatic() {
    this.machineService.getSansoMatic(this.machine_name, this.dateFilter)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          if (res.success) {
            this.sansoMaticList = res.data;
          }
        },
        error() {console.log('error api sanso matic')}
      })
  }

  onFilterChanged(dateFilter: DateFilter) {
    this.dateFilter = dateFilter;
    this.fetchSansoMatic();
  }

  download() {
    // this.machineService.downloadLubOilPressure(this.id, this.dateFilter);
  }

  goToSettings() {
    this.router.navigate(['/settings']);
  }
}
