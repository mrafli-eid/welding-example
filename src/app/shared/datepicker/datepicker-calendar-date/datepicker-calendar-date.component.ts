import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'ahm-datepicker-calendar-date',
    templateUrl: './datepicker-calendar-date.component.html',
    styleUrls: [ './datepicker-calendar-date.component.scss' ],
    standalone: true,
    imports: [ CommonModule ],
})

export class DatepickerCalendarDateComponent implements OnInit {
    @Input() d: number = 0;
    @Input() dateStyle:
        | 'disable'
        | 'default'
        | 'today'
        | 'select'
        | 'in-select'
        | 'selected'
        | 'selected-start'
        | 'selected-end' = 'default';

    constructor() {
    }

    ngOnInit(): void {
    }
}
