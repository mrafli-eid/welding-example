import { Component, EventEmitter, Output } from '@angular/core';
import { MasterParams } from 'src/app/core/models/master.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { debounceTime, take } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { PermissionListUserManagement } from 'src/app/core/models/user-management';
import { DUMMY_PERMISSIONS_LIST } from './permissions-list.dummy';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { UserManagementDeleteComponent } from '../../dialogs/user-management-delete/user-management-delete.component';

@Component({
    selector: 'ahm-permissions-list',
    templateUrl: './permissions-list.component.html',
    styleUrls: ['./permissions-list.component.scss'],
})
export class PermissionsListComponent {
    queryParams: Partial<MasterParams> = {};
    permissionList: PermissionListUserManagement[] = DUMMY_PERMISSIONS_LIST;
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<PermissionListUserManagement>();
    @Output() onDetail = new EventEmitter<PermissionListUserManagement>();

    constructor(
        private userManagementService: UserManagementService,
        private matDialog: MatDialog
    ) {}

    ngOnInit() {
        this.addSearchListener();
        this.getListPermission();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.getListPermission();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.getListPermission();
    }
    
    addSearchListener() {
        this.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((val) => {
                this.queryParams.search_term = val;
                this.pagination.page_number = 1;
                this.getListPermission();
            });
    }

    refreshData() {
        this.pagination.page_number = 1;
        this.getListPermission();
    }

    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.getListPermission();
    }

    getListPermission() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.userManagementService
            .getListPermission(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: (response) => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.permissionList = response.body.data || [];
                },
            });
    }

    edit(data: PermissionListUserManagement) {
        this.onEdit.emit(data);
    }

    delete(data: PermissionListUserManagement) {
        const matDialogRef = this.matDialog.open(
            UserManagementDeleteComponent,
            {
                data: data.user_name,
            }
        );

        matDialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.userManagementService
                    .deletePermission(data.id)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.pagination.page_number = 1;
                        this.getListPermission();
                    });
            }
        });
    }

    detail(data: PermissionListUserManagement) {
        this.onDetail.emit(data);
    }
}
