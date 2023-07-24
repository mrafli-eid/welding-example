import { Component } from '@angular/core';
import { DateFilter } from "../../../../core/models/date-filter.model";
import { getDefaultDateFilter } from "../../../../core/consts/datepicker.const";

@Component({
    selector: 'ahm-time-machine-wrapper',
    templateUrl: './time-machine-wrapper.component.html',
    styleUrls: [ './time-machine-wrapper.component.scss' ]
})
export class TimeMachineWrapperComponent {
    dateFilter: DateFilter = getDefaultDateFilter();

    changedDateFilter(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
    }
}
