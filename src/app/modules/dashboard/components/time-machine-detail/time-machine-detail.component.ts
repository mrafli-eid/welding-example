import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DateFilter } from '../../../../core/models/date-filter.model';
import { getDefaultDateFilter } from '../../../../core/consts/datepicker.const';
import { interval, take } from "rxjs";
import { DashboardService } from "../../../../core/services/dashboard.service";
import { TimeMachineDetail } from "../../../../core/models/dashboard.model";
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';

@Component({
    selector: 'ahm-time-machine-detail',
    templateUrl: './time-machine-detail.component.html',
    styleUrls: [ './time-machine-detail.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class TimeMachineDetailComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    @Input() dateFilter: DateFilter = getDefaultDateFilter();
    @Output() changedDateFilter = new EventEmitter<DateFilter>();

    data: TimeMachineDetail = {
        "value_stopline": 100,
        "value_idle": 20,
        "value_running": 30,
        "label": "Monday",
        "date_time": new Date()
    }

    chartData = [];

    constructor(private dashboardService: DashboardService) {
        this.convertToChartData();
    }

    ngOnInit() {
        this.getChartData();
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.getChartData();
            });
    }

    getChartData(): void {
        this.dashboardService.getTimeMachineDetail(this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if (resp.success) {
                        this.data = resp.data;
                        this.convertToChartData();
                    }
                },
                error: () => {
                },
            });
    }

    convertToChartData() {
        this.chartData = [];
        this.chartData.push(
            {
                value: this.data.value_running,
                color: [ '#33A02C' ]
            },
            {
                value: this.data.value_idle,
                color: [ '#F1BE42' ]
            },
            {
                value: this.data.value_stopline,
                color: [ '#DC3545' ]
            },
        )
    }

    onFilterChanged(dateFilter: DateFilter) {
        this.dateFilter = dateFilter;
        this.getChartData();
        this.changedDateFilter.emit(dateFilter);
    }
}
