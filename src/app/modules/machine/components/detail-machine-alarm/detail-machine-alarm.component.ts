import { Component, Input, OnInit } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { MachineService } from '../../../../core/services/machine.service';
import { interval, take } from 'rxjs';
import { DetailMachineAlarm } from '../../../../core/models/machine.model';
import { DUMMY_DETAIL_MACHINE_ALARM } from "./detail-machine-alarm.dummy";
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';

@Component({
    selector: 'ahm-detail-top-machine-alarm',
  templateUrl: './detail-machine-alarm.component.html',
  styleUrls: [ './detail-machine-alarm.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class DetailMachineAlarmComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    @Input() machine_name = '';
    @Input() robot_name: string;

    dateFilter: DateFilter = getDefaultDateFilter();
    alarmList: DetailMachineAlarm = DUMMY_DETAIL_MACHINE_ALARM;

    constructor(private machineService: MachineService) {
    }

    ngOnInit() {
        this.fetchAlarm();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchAlarm();
            });
    }

    fetchAlarm() {
        this.machineService.getAlarm(this.machine_name, this.robot_name,  this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    this.alarmList = resp.data ;
                },
                error: () => {
                },
            });
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.fetchAlarm();
    }

    download() {
        this.machineService.downloadAlarm(this.machine_name, this.dateFilter);
    }

}
