import { Component, OnInit } from '@angular/core';
import { ScheduleService } from '../../../../core/services/schedule.service';
import { Schedule } from '../../../../core/models/schedule.model';
import * as moment from "moment";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DUMMY_SCHEDULE_LIST } from "./maintenance-schedule.dummy";
import { interval, take } from "rxjs";
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";

@Component({
    selector: 'ahm-maintenance-schedule',
    templateUrl: './maintenance-schedule.component.html',
    styleUrls: [ './maintenance-schedule.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class MaintenanceScheduleComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    scheduleList: Schedule[] = DUMMY_SCHEDULE_LIST;
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();

    constructor(private scheduleService: ScheduleService) {
    }

    ngOnInit() {
        this.getScheduleList();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.getScheduleList();
            });
    }

    getScheduleList() {
        const start = new Date(this.currentYear, this.currentMonth, 1, 0, 0, 0);
        const end = new Date(this.currentYear, this.currentMonth + 1, 0, 23, 59, 59);
        this.scheduleService.getSchedule(start, end)
            .pipe(take(1))
            .subscribe((resp) => {
                if (resp.data && resp.data?.length > 0) {
                    resp.data.forEach((r) => {
                        r.start_date = moment(r.start_date).toDate();
                    })
                    this.scheduleList = resp.data;
                }
            });
    }

    setDate(input: any) {
        this.currentYear = input.selectedYear;
        this.currentMonth = input.selectedMonth;
        this.getScheduleList();
    }

}
