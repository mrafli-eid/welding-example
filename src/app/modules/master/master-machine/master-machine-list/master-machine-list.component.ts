import { Component, EventEmitter, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MasterMachine, MasterParams } from '../../../../core/models/master.model';
import { MasterService } from '../../../../core/services/master.service';
import { debounceTime, take } from 'rxjs';
import { Pagination } from '../../../../core/models/pagination.model';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MasterDataDeleteComponent } from '../../dialogs/master-data-delete/master-data-delete.component';
import { DUMMY_MASTER_MACHINE_LIST } from "./master-machine-list.dummy";

@Component({
    selector: 'ahm-master-machine-list',
    templateUrl: './master-machine-list.component.html',
    styleUrls: [ './master-machine-list.component.scss' ],
})
export class MasterMachineListComponent {
    masterList: MasterMachine[] = DUMMY_MASTER_MACHINE_LIST;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<MasterMachine>();
    @Output() onDetail = new EventEmitter<MasterMachine>();

    constructor(private masterService: MasterService,
                private matDialog: MatDialog) {
    }

    ngOnInit() {
        this.addSearchListener();
        this.getMasterList();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.getMasterList();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.getMasterList();
    }

    getMasterList() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.masterService.getMachineList(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.pagination = JSON.parse(response.headers.get('x-pagination'));
                    this.masterList = response.body.data || [];
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((val) => {
                this.queryParams.search_term = val;
                this.pagination.page_number = 1;
                this.getMasterList();
            });
    }


    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.getMasterList();
    }

    edit(masterMachine: MasterMachine) {
        this.onEdit.emit(masterMachine);
    }

    delete(masterMachine: MasterMachine) {
        const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
            data: masterMachine.name,
        });

        matDialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.masterService.deleteMachine(masterMachine.id)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.pagination.page_number = 1;
                        this.getMasterList();
                    });
            }
        });
    }

    detail(masterMachine: MasterMachine) {
        this.onDetail.emit(masterMachine);
    }

    download() {
        this.masterService.exportExcelMachine();
    }

}
