import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { DateFilter } from "../../../../core/models/date-filter.model";
import { DashboardService } from "../../../../core/services/dashboard.service";
import { interval, take } from "rxjs";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";
import { DatePipe } from '@angular/common';

@Component({
    selector: 'ahm-maintenance-indicator',
    templateUrl: './maintenance-indicator.component.html',
    styleUrls: [ './maintenance-indicator.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
    providers: [ DatePipe ],
})
  export class MaintenanceIndicatorComponent implements OnChanges, OnInit {
      untilDestroyed = untilDestroyed();
      todaysDate = new Date();

    @Input() dateFilter: DateFilter;

    targetMtbf = 200;
    mtbf = 190;

    targetMttr = 1.33;
    mttr = 1.4;

  constructor(private dashboardService: DashboardService, private datePipe: DatePipe) {

    }

    ngOnInit() {
        interval(DEFAULT_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.getData();
            });
    }

    ngOnChanges(): void {
        this.getData();
    }

    getData() {
        this.dashboardService.getMttr(this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if (resp.success) {
                        this.mttr = resp.data.value;
                    }
                },
                error: () => {
                },
            });


        this.dashboardService.getMtbf(this.dateFilter)
            .pipe(take(1))
            .subscribe({
                next: (resp) => {
                    if (resp.success) {
                        this.mtbf = resp.data.value;
                    }
                },
                error: () => {
                },
            });
    }

    getPreviousMonth(): string {
      const previousMonth = new Date(this.todaysDate);
      previousMonth.setMonth(previousMonth.getMonth() - 1);
      return this.datePipe.transform(previousMonth, 'MMMM');
    }
}
