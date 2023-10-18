import { Component, EventEmitter, Output } from '@angular/core';
import { Sort } from '@angular/material/sort';
import { MasterLine, MasterParams } from '../../../../core/models/master.model';
import { MasterService } from '../../../../core/services/master.service';
import { debounceTime, take } from 'rxjs';
import { Pagination } from '../../../../core/models/pagination.model';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MasterDataDeleteComponent } from '../../dialogs/master-data-delete/master-data-delete.component';

@Component({
    selector: 'ahm-master-line-list',
    templateUrl: './master-line-list.component.html',
    styleUrls: [ './master-line-list.component.scss' ],
})
export class MasterLineListComponent {
    masterList: MasterLine[] = [
        {
            id: '18a628f2-356a-4fe7-8823-9f3dbcb3289a',
            name: 'LINE 4',
            created_at: '2023-05-15 09:29:56',
        },
        {
            id: 'a2dc825e-7f50-4d89-b8c2-5f4d2fb132ce',
            name: 'LINE 3',
            created_at: '2023-05-16 09:29:56',
        },
        {
            id: '3a2954c2-4fb4-4854-93f2-5a69c3f39a12',
            name: 'LINE 2',
            created_at: '2023-05-16 09:29:56',
        },
    ];
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<MasterLine>();
    @Output() onDetail = new EventEmitter<MasterLine>();

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
        this.masterService.getLineList(this.queryParams)
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

    edit(masterLine: MasterLine) {
        this.onEdit.emit(masterLine);
    }

    delete(masterLine: MasterLine) {
        const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
            data: masterLine.name,
        });

        matDialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.masterService.deleteLine(masterLine.id)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.pagination.page_number = 1;
                        this.getMasterList();
                    });
            }
        });
    }

    detail(masterLine: MasterLine) {
        this.onDetail.emit(masterLine);
    }

    download() {
        this.masterService.exportExcelMachine();
    }

}
