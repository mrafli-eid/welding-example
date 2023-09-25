import { Component, Input, OnInit } from '@angular/core';
import { MachineService } from '../../../../core/services/machine.service';
import { Pagination } from '../../../../core/models/pagination.model';
import { FormControl } from '@angular/forms';
import {
    DetailMachineDescription,
    DetailMachineHistoryAlarm,
    DetailMachineHistoryAlarmParams,
} from '../../../../core/models/machine.model';
import { DUMMY_DETAIL_MACHINE_HISTORY_ALARM } from './detail-machine-history-alarm.dummy';
import { debounceTime, interval, take } from 'rxjs';
import {
    DEFAULT_INTERVAL,
    HALF_MINUTE_INTERVAL,
} from '../../../../core/consts/app.const';
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';

@Component({
    selector: 'ahm-detail-machine-history-alarm',
    templateUrl: './detail-machine-history-alarm.component.html',
    styleUrls: ['./detail-machine-history-alarm.component.scss'],
    host: {
        class: 'dashboard-card',
    },
})
export class DetailMachineHistoryAlarmComponent implements OnInit {
    untilDestroyed = untilDestroyed();

    @Input() machine_name: string;
    @Input() robot_name: string;

    searchTerm = new FormControl(null);
    description = new FormControl('');
    actDate = new FormControl('');

    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: DUMMY_DETAIL_MACHINE_HISTORY_ALARM.length,
        total_pages: 1,
    };
    queryParams: Partial<DetailMachineHistoryAlarmParams> = {
        search_term: this.searchTerm.value,
        page_size: this.pagination.page_size,
        page_number: this.pagination.page_number,
        description: this.description.value,
        act_date: this.actDate.value,
    };

    descriptionList: DetailMachineDescription[] = [
        {
            description: 'Error',
        },
    ];

    historyAlarmList: DetailMachineHistoryAlarm[] =
        DUMMY_DETAIL_MACHINE_HISTORY_ALARM;

    constructor(private machineService: MachineService) {}

    ngOnInit() {
        this.robot_name = 'MASTER';
    }

    ngOnChanges() {
        this.fetchList();
        this.addSearchListener();
        interval(HALF_MINUTE_INTERVAL)
            .pipe(this.untilDestroyed())
            .subscribe(() => {
                this.fetchList();
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges
            .pipe(debounceTime(350))
            .subscribe((val) => {
                this.queryParams.search_term = val;
                this.queryParams.page_number = 1;
                this.fetchList();
            });
    }

    fetchList() {
        this.machineService
            .getHistoryAlarm(
                this.machine_name,
                this.robot_name,
                this.queryParams
            )
            .pipe(take(1))
            .subscribe((response) => {
                this.pagination = JSON.parse(
                    response.headers.get('x-pagination')
                );
                this.historyAlarmList = response.body.data || [];
            });
    }

    changePage(page: number) {
        this.pagination.page_number = page;
        this.queryParams.page_number = page;
        this.fetchList();
    }

    changeLimit(limit: number) {
        this.pagination.page_size = limit;
        this.queryParams.page_size = limit;
        this.queryParams.page_number = 1;
        this.fetchList();
    }

    applyFilter() {
        let isChanged = false;
        if (this.actDate.value) {
            this.queryParams.act_date = this.actDate.value;
            isChanged = true;
        }

        if (this.description.value) {
            this.queryParams.description = this.description.value;
            isChanged = true;
        }

        if(this.searchTerm.value) {
            this.queryParams.search_term = this.searchTerm.value;
            isChanged = true;
        }

        if (isChanged) {
            this.pagination.page_number = 1;
            this.fetchList();
        }
        console.log(this.queryParams);
    }

    openFilter() {
        this.actDate.setValue(this.queryParams?.act_date);
        this.description.setValue(this.queryParams?.description);
    }

    download() {
        this.machineService.downloadHistoryAlarm(this.machine_name, this.robot_name, this.queryParams);
    }
}
