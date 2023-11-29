import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Sort } from '@angular/material/sort';
import { MasterParams } from 'src/app/core/models/master.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { ActivityUserService } from 'src/app/core/services/user-activity.service';
import { debounceTime, take } from 'rxjs';
import * as dayjs from 'dayjs';
import {
    LogTypeList,
    UserActivity,
    UsernameList,
} from 'src/app/core/models/user-activity.model';
import {
    DUMMY_LOG_TYPE_LIST,
    DUMMY_USERNAME_LIST,
    DUMMY_USER_ACTIVITY_LIST,
} from './user-activity.dummy';
import { MatDialog } from '@angular/material/dialog';

@Component({
    selector: 'ahm-user-activity-list',
    templateUrl: './user-activity-list.component.html',
    styleUrls: ['./user-activity-list.component.scss'],
})
export class UserActivityListComponent {
    usernameList: UsernameList[] = DUMMY_USERNAME_LIST;
    logTypeList: LogTypeList[] = DUMMY_LOG_TYPE_LIST;
    userActivityList: UserActivity[] = DUMMY_USER_ACTIVITY_LIST;
    searchTerm = new FormControl('');
    user_name = new FormControl('');
    log_type = new FormControl('');
    date_time = new FormControl('');
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };

    constructor(private userActivityService: ActivityUserService) {}

    ngOnInit() {
        this.addSearchListener();
        this.addUserNameFilter();
        this.getUsernameList();
        this.getLogTypeList();
        this.getActivityUserList();
        this.addLogTypeFilter();
        this.addDateTimeFilter();
    }

    getUsernameList() {
        this.userActivityService
            .getUsernameList()
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.usernameList = response.data || [];
                },
            });
    }

    getLogTypeList() {
        this.userActivityService
            .getLogTypeList()
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.logTypeList = response.data || [];
                },
            });
    }

    getActivityUserList() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.userActivityService
            .getActivityUserList(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.userActivityList = response.body.data || [];
                },
            });
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.getActivityUserList();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.getActivityUserList();
    }

    addUserNameFilter() {
        this.user_name.valueChanges.pipe(debounceTime(300)).subscribe(val => {
            this.queryParams.user_name = val;
            this.pagination.page_number = 1;
            this.getActivityUserList();
        });
    }

    addLogTypeFilter() {
        this.log_type.valueChanges.pipe(debounceTime(300)).subscribe(val => {
            this.queryParams.log_type = val;
            this.pagination.page_number = 1;
            this.getActivityUserList();
        });
    }

    addSearchListener() {
        this.searchTerm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
            this.queryParams.search_term = val;
            this.pagination.page_number = 1;
            this.getActivityUserList();
        });
    }

    addDateTimeFilter() {
        this.date_time.valueChanges.pipe(debounceTime(300)).subscribe(val => {
            this.pagination.page_number = 1;
            this.getActivityUserList();
            this.queryParams.date_time = dayjs(val).format(
                'YYYY-MM-DD HH:mm:ss'
            );
            console.log(this.queryParams.date_time);
        });
    }

    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.getActivityUserList();
    }
}
