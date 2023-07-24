import { Component, Input } from '@angular/core';
import { Pagination } from "../../../../core/models/pagination.model";
import {
    DetailMachineActualMaintenance,
    DetailMachineActualMaintenanceParams
} from "../../../../core/models/machine.model";
import { FormControl } from "@angular/forms";
import { MachineService } from "../../../../core/services/machine.service";
import { debounceTime, interval, take } from "rxjs";
import { DUMMY_DETAIL_MACHINE_ACTUAL_MAINTENANCE } from "./detail-machine-actual-maintenance.dummy";
import { DEFAULT_INTERVAL } from "../../../../core/consts/app.const";
import { untilDestroyed } from 'src/app/core/helpers/rxjs.helper';

@Component({
    selector: 'ahm-detail-machine-actual-maintenance',
    templateUrl: './detail-machine-actual-maintenance.component.html',
    styleUrls: [ './detail-machine-actual-maintenance.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class DetailMachineActualMaintenanceComponent {
    untilDestroyed = untilDestroyed();

    @Input() id: string;
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: DUMMY_DETAIL_MACHINE_ACTUAL_MAINTENANCE.length,
        total_pages: 1,
    };
    queryParams: Partial<DetailMachineActualMaintenanceParams> = {
        page_size: this.pagination.page_size,
        page_number: this.pagination.page_number
    }

    searchTerm = new FormControl('');
    actDate = new FormControl(null);
    planDate = new FormControl(null);

    actualMaintenanceList: DetailMachineActualMaintenance[] = DUMMY_DETAIL_MACHINE_ACTUAL_MAINTENANCE;

    constructor(private machineService: MachineService) {

    }

    ngOnInit() {
        this.addSearchListener();
        this.fetchList();
        interval(DEFAULT_INTERVAL)
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
        this.machineService.getActualMaintenance(this.id, this.queryParams)
            .pipe(take(1))
            .subscribe((response) => {
                this.pagination = JSON.parse(response.headers.get('x-pagination'));
                this.actualMaintenanceList = response.body.data || [];
            })
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

        if (this.planDate.value) {
            this.queryParams.plan_date = this.planDate.value;
            isChanged = true;
        }

        if (isChanged) {
            this.pagination.page_number = 1;
            this.fetchList();
        }
    }

    openFilter() {
        this.actDate.setValue(this.queryParams?.act_date);
        this.planDate.setValue(this.queryParams?.plan_date);
    }
}
