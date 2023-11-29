import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import * as moment from 'moment';
import { CommonModule } from '@angular/common';
import { DatepickerCalendarDateComponent } from '../datepicker-calendar-date/datepicker-calendar-date.component';

@Component({
    selector: 'ahm-datepicker-calendar',
    templateUrl: './datepicker-calendar.component.html',
    styleUrls: ['./datepicker-calendar.component.scss'],
    standalone: true,
    imports: [CommonModule, DatepickerCalendarDateComponent],
})
export class DatepickerCalendarComponent implements OnInit {
    @Input() date = new Date();
    today = new Date();

    @Input() selectedStart: Date | null = null;
    @Input() selectedEnd: Date | null = null;

    @Output() onDateClickEvent = new EventEmitter();

    get prevDaysArray() {
        const arr = [];

        const firstDayIndex = this.date.getDay();
        const prevLastDay = new Date(
            this.date.getFullYear(),
            this.date.getMonth(),
            0
        ).getDate();
        for (let x = firstDayIndex; x > 0; x--) {
            arr.push(prevLastDay - x + 1);
        }
        return arr;
    }

    get nextDaysArray() {
        const arr = [];
        const lastDayIndex = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            0
        ).getDay();

        const nextDays = 7 - lastDayIndex - 1;

        for (let j = 1; j <= nextDays; j++) {
            arr.push(j);
        }
        return arr;
    }

    get daysArray() {
        const arr = [];
        const lastDay = new Date(
            this.date.getFullYear(),
            this.date.getMonth() + 1,
            0
        ).getDate();
        for (let i = 1; i <= lastDay; i++) {
            arr.push(i);
        }
        return arr;
    }

    ngOnInit(): void {
        this.date.setDate(1);

        this.selectedStart?.setHours(0, 0, 0, 0);
        this.selectedEnd?.setHours(0, 0, 0, 0);

        this.date.setHours(0, 0, 0, 0);
        this.today.setHours(0, 0, 0, 0);
    }

    getClass(
        day: number
    ):
        | 'select'
        | 'disable'
        | 'default'
        | 'today'
        | 'in-select'
        | 'selected'
        | 'selected-start'
        | 'selected-end' {
        const d = new Date(this.date.getFullYear(), this.date.getMonth());
        d.setDate(day);
        d.setHours(0, 0, 0, 0);

        if (moment(this.selectedStart).isSame(d) && this.selectedEnd == null) {
            return 'selected';
        } else if (moment(this.selectedStart).isSame(d)) {
            return 'selected-start';
        } else if (moment(this.selectedEnd).isSame(d)) {
            return 'selected-end';
        } else if (
            moment(d).isAfter(this.selectedStart) &&
            moment(d).isBefore(this.selectedEnd)
        ) {
            return 'in-select';
        } else if (moment(this.today).isSame(d)) {
            return 'today';
        } else {
            return 'default';
        }
    }

    onDateClick(day: number) {
        const d = new Date(this.date.getFullYear(), this.date.getMonth());
        d.setDate(day);
        d.setHours(0, 0, 0, 0);

        this.onDateClickEvent.emit(d);
    }
}
