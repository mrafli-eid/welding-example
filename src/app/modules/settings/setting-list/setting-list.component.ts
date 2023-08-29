import { Component } from '@angular/core';
import { MasterParams } from "../../../core/models/master.model";
import { Pagination } from "../../../core/models/pagination.model";
import { FormControl } from "@angular/forms";
import { debounceTime, take } from "rxjs";
import { Sort } from "@angular/material/sort";
import { Setting } from "../../../core/models/setting.model";
import { SettingService } from "../../../core/services/setting.service";
import { DUMMY_SETTING_LIST } from "./setting-list.dummy";

@Component({
    selector: 'ahm-setting-list',
    templateUrl: './setting-list.component.html',
    styleUrls: [ './setting-list.component.scss' ]
})
export class SettingListComponent {
    settingList: Setting[] = DUMMY_SETTING_LIST;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    constructor(private settingService: SettingService) {
    }

    ngOnInit() {
        this.addSearchListener();
        this.getSettingList();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.getSettingList();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.getSettingList();
    }

    getSettingList() {
        this.queryParams = {
            ...this.queryParams,
            page_number: this.pagination.page_number,
            page_size: this.pagination.page_size  + 5,
        };
        this.settingService.getSettingList(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.pagination = JSON.parse(response.headers.get('x-pagination'));
                    this.settingList = response.body.data || [];
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((val) => {
                this.queryParams.search_term = val;
                this.pagination.page_number = 1;
                this.getSettingList();
            });
    }


    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.getSettingList();
    }

}
