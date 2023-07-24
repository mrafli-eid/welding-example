import { Component, EventEmitter, Output } from '@angular/core';
import { MasterParams } from '../../../../core/models/master.model';
import { Pagination } from '../../../../core/models/pagination.model';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, take } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MasterDataDeleteComponent } from '../../../master/dialogs/master-data-delete/master-data-delete.component';
import { DUMMY_PREVENTIVE_MAINTENANCE } from './preventive-maintenance-list.dummy';
import { MaintenancePreventive } from '../../../../core/models/maintenance.model';
import { MaintenancePreventiveService } from '../../../../core/services/maintenance-preventive.service';
import { ActivatedRoute } from '@angular/router';

@Component({
    selector: 'ahm-preventive-maintenance-list',
    templateUrl: './preventive-maintenance-list.component.html',
    styleUrls: [ './preventive-maintenance-list.component.scss' ],
    host: {
        'class': 'dashboard-card',
    },
})
export class PreventiveMaintenanceListComponent {
    id = '';
    maintenanceList: MaintenancePreventive[] = DUMMY_PREVENTIVE_MAINTENANCE;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');


    @Output() onEdit = new EventEmitter<MaintenancePreventive>();
    @Output() onDetail = new EventEmitter<MaintenancePreventive>();

    constructor(private maintenanceService: MaintenancePreventiveService,
                private activatedRoute: ActivatedRoute,
                private matDialog: MatDialog) {
        this.id = this.activatedRoute.snapshot.paramMap.get('id');
    }

    ngOnInit() {
        this.addSearchListener();
        this.fetchList();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.fetchList();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.fetchList();
    }

    fetchList() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.maintenanceService.getList(this.id, this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.pagination = JSON.parse(response.headers.get('x-pagination'));
                    this.maintenanceList = response.body.data || [];
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((val) => {
                this.queryParams.search_term = val;
                this.pagination.page_number = 1;
                this.fetchList();
            });
    }


    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.fetchList();
    }

    edit(data: MaintenancePreventive) {
        this.onEdit.emit(data);
    }

    delete(data: MaintenancePreventive) {
        const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
            data: data.name,
        });

        matDialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.maintenanceService.delete(data.id)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.pagination.page_number = 1;
                        this.fetchList();
                    });
            }
        });
    }

    detail(data: MaintenancePreventive) {
        this.onDetail.emit(data);
    }

    create() {
        this.onEdit.emit(null);
    }

    ok(data: MaintenancePreventive) {
        const temp: MaintenancePreventive = {
            ...data,
            ok: true,
        }
        this.onEdit.emit(temp);
    }

    download() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.maintenanceService.exportExcel(this.id, this.queryParams);
    }

    upload(event) {
        this.maintenanceService.upload(event.target.files[0]).subscribe((resp) => {
            this.fetchList();
        });
    }
}
