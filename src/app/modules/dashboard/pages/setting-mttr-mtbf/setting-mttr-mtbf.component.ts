import { Component, inject } from '@angular/core';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Sort } from '@angular/material/sort';
import { Router } from '@angular/router';
import { debounceTime, take } from 'rxjs';
import { getDefaultPagination } from 'src/app/core/consts/pagination.const';
import { MasterParams } from 'src/app/core/models/master.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { DashboardService } from 'src/app/core/services/dashboard.service';
import { DialogAddMttrMtbfComponent } from '../../dialogs/dialog-add-mttr-mtbf/dialog-add-mttr-mtbf.component';
import { MasterDataDeleteComponent } from 'src/app/modules/master/dialogs/master-data-delete/master-data-delete.component';
import { MttrMtbfList } from 'src/app/core/models/dashboard.model';

@Component({
    selector: 'ahm-setting-mttr-mtbf',
    templateUrl: './setting-mttr-mtbf.component.html',
    styleUrls: ['./setting-mttr-mtbf.component.scss'],
})
export class SettingMttrMtbfComponent {
    private router = inject(Router);
    private matDialog = inject(MatDialog);
    private dashboardService = inject(DashboardService);

    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = getDefaultPagination();
    searchTerm = new FormControl('');
    mttrMtbfList: MttrMtbfList[] = [];

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

    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.fetchList();
    }

    addSearchListener() {
        this.searchTerm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
            this.queryParams.search_term = val;
            this.pagination.page_number = 1;
            this.fetchList();
        });
    }

    fetchList() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.dashboardService
            .getSettingMttrMtbfList(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.mttrMtbfList = response.body.data || [];
                },
            });
    }

    toDashboard() {
        this.router.navigate(['/dashboard']);
    }

    create() {
        const matDialogRef = this.matDialog.open(DialogAddMttrMtbfComponent);

        matDialogRef.afterClosed().subscribe(res => {
            // Do something
          this.pagination.page_number = 1;
          this.fetchList();
        });
    }

    edit(data: any) {
        const matDialogRef = this.matDialog.open(DialogAddMttrMtbfComponent, {
            data,
        });

        matDialogRef.afterClosed().subscribe(res => {
            // Do something
          this.pagination.page_number = 1;
          this.fetchList();
        });
    }

    delete(data: MttrMtbfList) {
      const matDialogRef = this.matDialog.open(MasterDataDeleteComponent, {
        data: `Mtbf ${data.mtbf} and Mttr ${data.mttr}?`,
      });

      matDialogRef.afterClosed().subscribe(res => {
        // Do something
        this.pagination.page_number = 1;
        this.fetchList();
      });
    }
}
