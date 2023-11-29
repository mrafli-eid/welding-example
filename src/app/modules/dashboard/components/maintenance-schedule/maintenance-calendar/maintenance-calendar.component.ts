import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    OnInit,
    Output,
} from '@angular/core';
import { DAYS, MONTHS, MONTHS_FULL } from './maintenance-calendar.const';
import { CommonModule } from '@angular/common';
import { Schedule } from '../../../../../core/models/schedule.model';

@Component({
    selector: 'ahm-maintenance-calendar',
    templateUrl: './maintenance-calendar.component.html',
    styleUrls: ['./maintenance-calendar.component.scss'],
    standalone: true,
    imports: [CommonModule],
})
export class MaintenanceCalendarComponent implements OnInit, OnChanges {
    @Input() scheduleList: Schedule[] = [];
    DAYS = DAYS;
    contentClass = 'calendar-content month-view';
    calendarLabel = '';
    items: any[] = [];
    prevDays: number[] = [];
    nextDays: number[] = [];
    today = new Date();
    @Input('value') selected = this.today;
    selectedDate: any;
    selectedMonth: any;
    selectedYear: any;
    @Output('value') selectEmitter = new EventEmitter();
    @Output() onSelectedDateEvent = new EventEmitter();
    startYear: number = this.selected.getFullYear() + 1 - 16;
    endYear: number = this.selected.getFullYear();

    currentEvent = {};

    constructor() {}

    _currentState = 'month-view';

    get currentState(): string {
        return this._currentState;
    }

    set currentState(input: string) {
        this._currentState = input;
        this.contentClass = `calendar-content ${input}`;
        if (input === 'year-view') {
            this.generateYearViewData();
        }
        if (input === 'month-view') {
            this.generateMonthViewData();
        }
        if (input === 'multi-year-view') {
            this.generateMultiYearViewData();
        }
        this.generateLabel();
    }

    setCurrentEvent() {
        const todayMonth = this.today.getMonth();
        const todayDate = this.today.getDate();
        const todayYear = this.today.getFullYear();
        this.currentEvent = {};

        if (
            todayMonth === this.selectedMonth &&
            todayYear === this.selectedYear
        ) {
            this.currentEvent[todayDate] = 0;
        }

        this.scheduleList.forEach(s => {
            if (s.start_date.getMonth() === this.selectedMonth) {
                const date = s.start_date.getDate();
                this.currentEvent[date] = 1;
            }
        });
    }

    ngOnInit(): void {
        this.selectedDate = this.selected.getDate();
        this.selectedMonth = this.selected.getMonth();
        this.selectedYear = this.selected.getFullYear();
        this.generateMonthViewData();
        this.generateLabel();
    }

    ngOnChanges(): void {
        this.setCurrentEvent();
    }

    changeState(): void {
        if (this.currentState === 'month-view') {
            this.currentState = 'multi-year-view';
        } else if (this.currentState === 'year-view') {
            this.currentState = 'multi-year-view';
        } else {
            this.currentState = 'month-view';
        }
    }

    prev(): void {
        if (this.currentState === 'month-view') {
            this.decrementMonth();
            this.generateMonthViewData();
        }
        if (this.currentState === 'multi-year-view') {
            const temp = this.startYear;
            this.startYear = temp - 1 - 16;
            this.endYear = temp - 1;
            this.generateLabel();
            this.generateMultiYearViewData();
        }
    }

    next(): void {
        if (this.currentState === 'month-view') {
            this.incrementMonth();
            this.generateMonthViewData();
        }
        if (this.currentState === 'multi-year-view') {
            const temp = this.endYear;
            this.startYear = temp + 1;
            this.endYear = temp + 1 + 16;
            this.generateLabel();
            this.generateMultiYearViewData();
        }
    }

    emitChanges(): void {
        this.onSelectedDateEvent.emit({
            selectedMonth: this.selectedMonth,
            selectedYear: this.selectedYear,
        });
    }

    incrementMonth(): void {
        this.selectedMonth += 1;
        if (this.selectedMonth === 12) {
            this.selectedYear += 1;
            this.selectedMonth = 0;
        }
        this.emitChanges();
        this.generateLabel();
    }

    decrementMonth(): void {
        this.selectedMonth -= 1;
        if (this.selectedMonth === -1) {
            this.selectedYear -= 1;
            this.selectedMonth = 11;
        }
        this.emitChanges();
        this.generateLabel();
    }

    clickItem(value: string): void {
        if (this.currentState === 'month-view') {
            this.selectedDate = value;
            this.selected = new Date(
                this.selectedYear,
                this.selectedMonth,
                this.selectedDate
            );
            // close
        } else if (this.currentState === 'multi-year-view') {
            this.selectedYear = value;
            this.currentState = 'year-view';
        } else {
            this.selectedMonth = parseInt(value);
            this.currentState = 'month-view';
            this.emitChanges();
        }
    }

    clearItems(): void {
        this.items = [];
        this.prevDays = [];
        this.nextDays = [];
    }

    generateMonthViewData(): void {
        this.clearItems();
        const date = new Date(this.selectedYear, this.selectedMonth, 1);

        const lastDay = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            0
        ).getDate();

        for (let i = 1; i <= lastDay; i++) {
            this.items.push(i);
        }

        const prevLastDay = new Date(
            date.getFullYear(),
            date.getMonth(),
            0
        ).getDate();
        const firstDayIndex = date.getDay();
        for (let i = firstDayIndex; i > 0; i--) {
            this.prevDays.push(prevLastDay - i + 1);
        }

        const lastDayIndex = new Date(
            date.getFullYear(),
            date.getMonth() + 1,
            1
        ).getDay();
        const nextDays = 7 - lastDayIndex;
        for (let i = 1; i <= nextDays; i++) {
            this.nextDays.push(i);
        }
    }

    generateMultiYearViewData(): void {
        this.clearItems();
        for (let i = this.startYear; i <= this.endYear; i++) {
            this.items.push(i);
        }
    }

    generateYearViewData(): void {
        this.items = MONTHS;
    }

    generateLabel(): void {
        if (this.currentState === 'month-view') {
            this.calendarLabel =
                MONTHS_FULL[this.selectedMonth] + ' ' + this.selectedYear;
        } else if (this.currentState === 'multi-year-view') {
            this.calendarLabel = `${this.startYear} - ${this.endYear}`;
        } else if (this.currentState === 'year-view') {
            this.calendarLabel = `${this.selectedYear}`;
        }
        this.setCurrentEvent();
    }
}
