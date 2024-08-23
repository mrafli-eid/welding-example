import { Component, EventEmitter, Output } from '@angular/core';
import { MasterParams } from '../../../../core/models/master.model';
import { Pagination } from '../../../../core/models/pagination.model';
import { FormControl } from '@angular/forms';
import { RegisterService } from '../../../../core/services/register.service';
import { MatDialog } from '@angular/material/dialog';
import { debounceTime, take } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { MasterDataDeleteComponent } from '../../dialogs/master-data-delete/master-data-delete.component';
import { MachineLine } from '../../../../core/models/register.model';
import { DUMMY_REGISTER_MACHINE_LINE_LIST } from './register-machine-line-list.dummy';

@Component({
    selector: 'ahm-register-machine-line-list',
    templateUrl: './register-machine-line-list.component.html',
    styleUrls: ['./register-machine-line-list.component.scss'],
})
export class RegisterMachineLineListComponent {
    masterList: MachineLine[] = DUMMY_REGISTER_MACHINE_LINE_LIST;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<MachineLine>();
    @Output() onDetail = new EventEmitter<MachineLine>();

    constructor(
        private registerService: RegisterService,
        private matDialog: MatDialog
    ) {}

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

    refreshData() {
        this.pagination.page_number = 1;
        this.getMasterList();
    }

    getMasterList() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.registerService
            .getMachineLineList(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.masterList = response.body.data || [];
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
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

    edit(data: MachineLine) {
        this.onEdit.emit(data);
    }

    delete(data: MachineLine) {
        const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
            data: data.line_name,
        });

        matDialogRef.afterClosed().subscribe(resp => {
            // if (resp) {
            //     this.registerService
            //         .deleteMachineLine(data.line_id)
            //         .pipe(take(1))
            //         .subscribe(() => {
            //             this.pagination.page_number = 1;
            //             this.getMasterList();
            //         });
            // }
        });
    }

    detail(data: MachineLine) {
        this.onDetail.emit(data);
    }

    download() {
        this.registerService.exportMachineLine();
    }
}
