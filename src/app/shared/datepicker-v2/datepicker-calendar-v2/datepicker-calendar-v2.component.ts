import {
    Component,
    EventEmitter,
    Input,
    OnChanges,
    Output,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import * as moment from 'moment';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'ahm-datepicker-calendar-v2',
    templateUrl: './datepicker-calendar-v2.component.html',
    styleUrls: ['./datepicker-calendar-v2.component.scss'],
    standalone: true,
    imports: [CommonModule, FormsModule],
})
export class DatepickerCalendarV2Component implements OnChanges {
    @Input() label = 'Start';
    @Input() date = new Date();

    @Input() startDate;
    @Input() endDate;

    @Output() onSelectedDate = new EventEmitter<Date>();

    showedDate = new Date();

    @Input() calendarType: string = 'day';

    yearList = [];
    dateRange: any[] = [];

    monthList = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
    ];
    monthRange = [];

    yearlyList;
    yearRange = [];
    selectedYearIndex = 0;

    constructor() {
        this.yearlyList = [];
        const yearEnd = new Date().getFullYear() + 4;
        const yearStart = yearEnd - 35;
        for (let i = yearStart; i <= yearEnd; i += 9) {
            const item = [
                i,
                i + 1,
                i + 2,
                i + 3,
                i + 4,
                i + 5,
                i + 6,
                i + 7,
                i + 8,
            ];
            this.yearlyList.push(item);
        }
    }

    ngOnChanges() {
        this.showedDate = this.date;
        switch (this.calendarType) {
            case 'day':
            case 'week':
                this.generateDate();
                break;
            case 'month':
                this.generateYearList();
                this.generateMonth();
                break;
            case 'year':
                const currentYear = this.date.getFullYear();
                this.yearlyList.forEach((e, index) => {
                    const i = e.findIndex(y => y === currentYear);
                    if (i !== -1) {
                        this.selectedYearIndex = index;
                    }
                });
                this.generateYear();
                break;
        }
    }

    changeMonth(month: number) {
        this.showedDate.setMonth(month);
        this.generateDate();
    }

    changeYear(year: number) {
        this.showedDate.setFullYear(year);
        this.generateDate();
    }

    generateDate() {
        if (!this.showedDate) {
            return;
        }
        this.dateRange = [];
        let year = this.showedDate.getFullYear();
        let month = this.showedDate.getMonth();

        let dayone = new Date(year, month, 1).getDay();
        let lastdate = new Date(year, month + 1, 0).getDate();
        let dayend = new Date(year, month, lastdate).getDay();
        let monthlastdate = new Date(year, month, 0).getDate();

        for (let i = dayone; i > 0; i--) {
            this.dateRange.push({
                value: monthlastdate - i + 1,
                status: 'disabled',
            });
        }

        for (let i = 1; i <= lastdate; i++) {
            let isToday =
                i === this.date.getDate() &&
                month === this.date.getMonth() &&
                year === this.date.getFullYear();
            const date = moment(this.showedDate).set('date', i);
            if (isToday) {
                this.dateRange.push({
                    value: i,
                    status: 'active',
                });
            } else if (
                this.startDate &&
                moment(date).isBefore(this.startDate)
            ) {
                this.dateRange.push({
                    value: i,
                    status: 'disabled',
                });
            } else if (this.endDate && moment(date).isAfter(this.endDate)) {
                this.dateRange.push({
                    value: i,
                    status: 'disabled',
                });
            } else if (
                this.startDate &&
                moment(date).isBetween(this.startDate, this.date)
            ) {
                this.dateRange.push({
                    value: i,
                    status: 'in-range',
                });
            } else if (
                this.endDate &&
                moment(date).isBetween(this.date, this.endDate)
            ) {
                this.dateRange.push({
                    value: i,
                    status: 'in-range',
                });
            } else {
                this.dateRange.push({
                    value: i,
                    status: '',
                });
            }
        }

        for (let i = dayend; i < 6; i++) {
            this.dateRange.push({
                value: i - dayend + 1,
                status: 'disabled',
            });
        }
        this.generateYearList();
    }

    generateYearList() {
        this.yearList = [];
        const year = this.date.getFullYear();
        for (let i = 1; i <= 6; i++) {
            this.yearList.push(year + 6 - i);
        }
        this.yearList.push(year);
        for (let i = 1; i <= 6; i++) {
            this.yearList.push(year - i);
        }
    }

    nextMonth() {
        this.showedDate = moment(this.showedDate).add(1, 'month').toDate();
        this.generateDate();
    }

    prevMonth() {
        this.showedDate = moment(this.showedDate).subtract(1, 'month').toDate();
        this.generateDate();
    }

    selectDate(index: number) {
        if (this.dateRange[index].status === 'disabled') {
            return;
        }

        const value = this.dateRange[index].value;

        const selectedDate = new Date(this.showedDate);
        selectedDate.setDate(value);
        this.generateDate();
        this.onSelectedDate.emit(selectedDate);
    }

    nextYear() {
        this.showedDate = moment(this.showedDate).add(1, 'year').toDate();
        this.generateMonth();
    }

    prevYear() {
        this.showedDate = moment(this.showedDate).subtract(1, 'year').toDate();
        this.generateMonth();
    }

    selectMonth(index: number) {
        let selectedDate = moment({
            day: 1,
            month: index,
            year: this.showedDate.getFullYear(),
        }).toDate();

        if (this.startDate && moment(selectedDate).isBefore(this.startDate)) {
            return;
        } else if (this.endDate && moment(selectedDate).isAfter(this.endDate)) {
            return;
        }

        if (this.startDate) {
            selectedDate = moment(selectedDate)
                .add('month', 1)
                .subtract('day', 1)
                .toDate();
            selectedDate.setMinutes(59);
            selectedDate.setHours(23);
        }

        if (this.endDate) {
            selectedDate.setMinutes(0);
            selectedDate.setHours(0);
        }

        this.generateMonth();
        this.onSelectedDate.emit(selectedDate);
    }

    generateMonth() {
        this.monthRange = [];

        this.monthList.forEach((m, index) => {
            const date = new Date(this.showedDate);
            date.setMonth(index);

            let status = '';
            if (this.endDate) {
                if (moment(date).isAfter(this.endDate)) {
                    status = 'disabled';
                }

                if (
                    moment(date).isSameOrAfter(this.date) &&
                    moment(date).isSameOrBefore(this.endDate)
                ) {
                    status = 'in-range';
                }
            }
            if (this.startDate) {
                if (moment(date).isBefore(this.startDate)) {
                    status = 'disabled';
                }

                if (
                    moment(date).isSameOrAfter(this.startDate) &&
                    moment(date).isSameOrBefore(this.date)
                ) {
                    status = 'in-range';
                }
            }

            this.monthRange.push({
                value: m,
                status,
            });
        });
    }

    changeYearMonthly(year: number) {
        this.showedDate.setFullYear(year);
        this.generateMonth();
    }

    generateYear() {
        this.yearRange = [];

        this.yearlyList[this.selectedYearIndex].forEach(y => {
            const date = new Date();
            date.setFullYear(y);

            let status = '';
            if (this.endDate) {
                if (moment(date).isAfter(this.endDate)) {
                    status = 'disabled';
                }

                if (
                    moment(date).isSameOrAfter(this.date) &&
                    moment(date).isSameOrBefore(this.endDate)
                ) {
                    status = 'in-range';
                }
            }
            if (this.startDate) {
                if (moment(date).isBefore(this.startDate)) {
                    status = 'disabled';
                }

                if (
                    moment(date).isSameOrAfter(this.startDate) &&
                    moment(date).isSameOrBefore(this.date)
                ) {
                    status = 'in-range';
                }
            }

            this.yearRange.push({
                value: y,
                status,
            });
        });
    }

    nextYearYearly() {
        this.selectedYearIndex++;
        this.generateYear();
    }

    prevYearYearly() {
        this.selectedYearIndex--;
        this.generateYear();
    }

    changeYearYearly(index: number) {
        this.selectedYearIndex = index;
        this.generateYear();
    }

    selectYear(year: number) {
        let selectedDate = moment({
            day: 1,
            month: 0,
            year,
        }).toDate();

        if (this.startDate && moment(selectedDate).isBefore(this.startDate)) {
            return;
        } else if (this.endDate && moment(selectedDate).isAfter(this.endDate)) {
            return;
        }

        if (this.startDate) {
            selectedDate = moment(selectedDate)
                .add('year', 1)
                .subtract('day', 1)
                .toDate();
            selectedDate.setMinutes(59);
            selectedDate.setHours(23);
        }

        if (this.endDate) {
            selectedDate.setMinutes(0);
            selectedDate.setHours(0);
        }

        this.generateYear();
        this.onSelectedDate.emit(selectedDate);
    }
}
