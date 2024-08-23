import { Component, EventEmitter, Output } from '@angular/core';
import { MasterParams } from 'src/app/core/models/master.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { debounceTime, take } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { RoleListUserManagement } from 'src/app/core/models/user-management';
import { ROLE_LIST_COMPONENT_DUMMY } from './role-list.dummy';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { UserManagementDeleteComponent } from '../../dialogs/user-management-delete/user-management-delete.component';

@Component({
    selector: 'ahm-role-list',
    templateUrl: './role-list.component.html',
    styleUrls: ['./role-list.component.scss'],
})
export class RoleListComponent {
    roleList: RoleListUserManagement[] = ROLE_LIST_COMPONENT_DUMMY;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<RoleListUserManagement>();
    @Output() onDetail = new EventEmitter<RoleListUserManagement>();

    constructor(
        private userManagementService: UserManagementService,
        private matDialog: MatDialog
    ) {}

    ngOnInit() {
        this.addSearchListener();
        this.getListRole();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.getListRole();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.getListRole();
    }

    refreshData() {
        this.pagination.page_number = 1;
        this.getListRole();
    }

    getListRole() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.userManagementService
            .getListRole(this.queryParams)
            .pipe(take(1))
            .subscribe({
                next: response => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.roleList = response.body.data;
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges.pipe(debounceTime(300)).subscribe(val => {
            this.queryParams.search_term = val;
            this.pagination.page_number = 1;
            this.getListRole();
        });
    }

    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.getListRole();
    }

    edit(roleManagement: RoleListUserManagement) {
        this.onEdit.emit(roleManagement);
    }

    delete(roleManagement: RoleListUserManagement) {
        const matDialogRef = this.matDialog.open(
            UserManagementDeleteComponent,
            {
                data: roleManagement.name,
            }
        );

        matDialogRef.afterClosed().subscribe(resp => {
            // if (resp) {
            //     this.userManagementService
            //         .deleteRole(roleManagement.id)
            //         .pipe(take(1))
            //         .subscribe(() => {
            //             this.pagination.page_number = 1;
            //             this.getListRole();
            //         });
            // }
        });
    }

    detail(roleManagement: RoleListUserManagement) {
        this.onDetail.emit(roleManagement);
    }
}
