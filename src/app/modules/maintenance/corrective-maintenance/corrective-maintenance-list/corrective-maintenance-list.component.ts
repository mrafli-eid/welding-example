import { Component, EventEmitter, Output } from '@angular/core';
import { MasterParams } from '../../../../core/models/master.model';
import { Pagination } from '../../../../core/models/pagination.model';
import { FormControl } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, take } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MasterDataDeleteComponent } from '../../../master/dialogs/master-data-delete/master-data-delete.component';
import { MaintenanceCorrectiveService } from '../../../../core/services/maintenance-corrective.service';
import { MaintenanceCorrective } from '../../../../core/models/maintenance-corrective.model';
import { DUMMY_MAINTENANCE_CORRECTIVE_LIST } from './corrective-maintenance-list.dummy';

@Component({
    selector: 'ahm-corrective-maintenance-list',
    templateUrl: './corrective-maintenance-list.component.html',
    styleUrls: ['./corrective-maintenance-list.component.scss'],
})
export class CorrectiveMaintenanceListComponent {
    machine_name = '';
    maintenanceList: MaintenanceCorrective[] =
        DUMMY_MAINTENANCE_CORRECTIVE_LIST;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<MaintenanceCorrective>();
    @Output() onDetail = new EventEmitter<MaintenanceCorrective>();

    constructor(
        private maintenanceService: MaintenanceCorrectiveService,
        private activatedRoute: ActivatedRoute,
        private matDialog: MatDialog
    ) {
        this.machine_name = this.activatedRoute.snapshot.paramMap.get('name');
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

    refreshData() {
        this.pagination.page_number = 1;
        this.fetchList();
    }

    fetchList() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.maintenanceService
            .getList(this.machine_name, this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.maintenanceList = response.body.data || [];
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
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

    edit(data: MaintenanceCorrective) {
        this.onEdit.emit(data);
    }

    delete(data: MaintenanceCorrective) {
        const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
            data: data.name,
        });

        matDialogRef.afterClosed().subscribe(resp => {
            if (resp) {
                this.maintenanceService
                    .delete(data.id)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.pagination.page_number = 1;
                        this.fetchList();
                    });
            }
        });
    }

    detail(data: MaintenanceCorrective) {
        this.onDetail.emit(data);
    }

    create() {
        this.onEdit.emit(null);
    }

    download() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.maintenanceService.exportExcel(
            this.machine_name,
            this.queryParams
        );
    }
}
