import { Component } from '@angular/core';
import { Schedule } from '../../../../core/models/schedule.model';
import { DUMMY_SCHEDULE_LIST } from '../../../dashboard/components/maintenance-schedule/maintenance-schedule.dummy';
import { interval, take } from 'rxjs';
import { DEFAULT_INTERVAL } from '../../../../core/consts/app.const';
import * as moment from 'moment/moment';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { MaintenancePreventiveService } from '../../../../core/services/maintenance-preventive.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ahm-preventive-maintenance-calendar',
    templateUrl: './preventive-maintenance-calendar.component.html',
    styleUrls: ['./preventive-maintenance-calendar.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class PreventiveMaintenanceCalendarComponent {
    machine_name = '';
    untilDestroyed = untilDestroyed();

    scheduleList: Schedule[] = DUMMY_SCHEDULE_LIST;
    currentMonth = new Date().getMonth();
    currentYear = new Date().getFullYear();

    constructor(
        private maintenanceService: MaintenancePreventiveService,
        private activatedRoute: ActivatedRoute
    ) {
        this.machine_name = this.activatedRoute.snapshot.paramMap.get('name');
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
        const end = new Date(
            this.currentYear,
            this.currentMonth + 1,
            0,
            23,
            59,
            59
        );
        this.maintenanceService
            .getSchedule(this.machine_name, start, end)
            .pipe(take(1))
            .subscribe(resp => {
                if (resp.data && resp.data?.length > 0) {
                    resp.data.forEach(r => {
                        r.start_date = moment(r.start_date).toDate();
                    });
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
