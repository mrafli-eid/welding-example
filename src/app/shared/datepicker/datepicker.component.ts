import {
    Component,
    EventEmitter,
    Input,
    OnInit,
    Output,
    ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    DateRangePresetComponent,
    RANGE_PRESET_OPTIONS,
} from './date-range-preset/date-range-preset.component';
import * as moment from 'moment';
import { DatepickerCalendarComponent } from './datepicker-calendar/datepicker-calendar.component';
import { DatepickerCalendarDateComponent } from './datepicker-calendar-date/datepicker-calendar-date.component';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { DateFilter } from '../../core/models/date-filter.model';

@Component({
    selector: 'ahm-datepicker-legacy',
    templateUrl: './datepicker.component.html',
    styleUrls: ['./datepicker.component.scss'],
    standalone: true,
    imports: [
        CommonModule,
        DatepickerCalendarComponent,
        DatepickerCalendarDateComponent,
        DateRangePresetComponent,
        MatMenuModule,
        FormsModule,
    ],
})
export class DatepickerComponent implements OnInit {
    @ViewChild(MatMenuTrigger) trigger: MatMenuTrigger;
    firstMonth: Date = new Date();
    secondMonth: Date = new Date();

    tempDateStart: Date | null = null;
    tempDateEnd: Date | null = null;

    tempTimeStart: string = '00:00';
    tempTimeEnd: string = '00:00';

    tempSelectedRangePreset = null;
    selectedRangePreset = null;

    @Input() dateFilter: DateFilter = null;
    @Output() dateChanged = new EventEmitter();
    @Input() hideDayPreset = false;

    months = [
        'Januari',
        'Februari',
        'Maret',
        'April',
        'Mei',
        'Juni',
        'Juli',
        'Agustus',
        'September',
        'Oktober',
        'November',
        'Desember',
    ];

    get firstMonthDisplay() {
        return this.months[this.firstMonth.getMonth()];
    }

    get secondMonthDisplay() {
        return this.months[this.secondMonth.getMonth()];
    }

    get firstYearDisplay() {
        return this.firstMonth.getFullYear();
    }

    get secondYearDisplay() {
        return this.secondMonth.getFullYear();
    }

    ngOnInit(): void {
        this.initDatepicker();
    }

    onSelectedRangePreset(selected: string) {
        this.tempSelectedRangePreset = selected;
    }

    onClickRightChevron() {
        this.firstMonth.setMonth(this.firstMonth.getMonth() + 1);
        this.secondMonth.setMonth(this.secondMonth.getMonth() + 1);
    }

    onClickLeftChevron() {
        this.firstMonth.setMonth(this.firstMonth.getMonth() - 1);
        this.secondMonth.setMonth(this.secondMonth.getMonth() - 1);
    }

    onDateClickManagerEvent(date: Date) {
        this.onDateClickEvent(date);
    }

    onDateClickEvent(date: Date) {
        if (this.tempDateStart == null) {
            this.tempDateStart = date;
        } else if (this.tempDateStart != null && this.tempDateEnd == null) {
            if (moment(date).isAfter(this.tempDateStart)) {
                this.tempDateEnd = date;
            } else if (moment(date).isBefore(this.tempDateStart)) {
                this.tempDateStart = date;
            }
        } else if (this.tempDateStart != null && this.tempDateEnd != null) {
            this.tempDateStart = date;
            this.tempDateEnd = null;
        }
    }

    save(): void {
        const startDate = new Date(this.tempDateStart);
        const endDate = this.tempDateEnd;

        const startHour = +this.tempTimeStart.split(':')[0];
        const startMinute = +this.tempTimeStart.split(':')[1];
        startDate.setHours(startHour);
        startDate.setMinutes(startMinute);

        const endHour = +this.tempTimeEnd.split(':')[0];
        const endMinute = +this.tempTimeEnd.split(':')[1];
        endDate.setHours(endHour);
        endDate.setMinutes(endMinute);

        this.selectedRangePreset = this.tempSelectedRangePreset;

        const dateFilter: DateFilter = {
            start: startDate,
            end: endDate,
            type: this.tempSelectedRangePreset,
        };
        this.dateChanged.emit(dateFilter);
        this.trigger.closeMenu();
        //
    }

    cancel(): void {
        this.trigger.closeMenu();
    }

    initDatepicker(): void {
        if (this.dateFilter?.start) {
            this.selectedRangePreset = this.dateFilter.type;

            this.tempSelectedRangePreset = this.dateFilter.type;
            this.tempDateStart = this.dateFilter.start;
            this.tempDateEnd = this.dateFilter.end;

            this.firstMonth = this.tempDateStart;
            if (
                this.tempDateStart.getFullYear() ===
                    this.tempDateEnd.getFullYear() &&
                this.tempDateStart.getMonth() === this.tempDateEnd.getMonth()
            ) {
                this.secondMonth?.setMonth(this.firstMonth?.getMonth() + 1);
            } else {
                this.secondMonth = this.tempDateEnd;
            }
        } else {
            this.firstMonth = new Date();
            this.secondMonth = new Date();
            this.secondMonth?.setMonth(this.firstMonth?.getMonth() + 1);
            this.tempSelectedRangePreset = RANGE_PRESET_OPTIONS.DEFAULT;
        }
    }
}
