import { Component, EventEmitter, Output } from '@angular/core';
import { MasterParams } from 'src/app/core/models/master.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { debounceTime, take } from 'rxjs';
import { Sort } from '@angular/material/sort';
import { FormControl } from '@angular/forms';
import { USER_LIST_DUMMY } from './user-list.dummy';
import { UserListUserManagement } from 'src/app/core/models/user-management';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { MatDialog } from '@angular/material/dialog';
import { UserManagementDeleteComponent } from '../../dialogs/user-management-delete/user-management-delete.component';

@Component({
    selector: 'ahm-user-list',
    templateUrl: './user-list.component.html',
    styleUrls: ['./user-list.component.scss'],
})
export class UserListComponent {
    userList: UserListUserManagement[] = USER_LIST_DUMMY;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<UserListUserManagement>();
    @Output() onDetail = new EventEmitter<UserListUserManagement>();

    constructor(
        private userManagementService: UserManagementService,
        private matDialog: MatDialog
    ) {}

    ngOnInit() {
        this.addSearchListener();
        this.getListUser();
    }

    onSelectPage(page: number) {
        this.pagination.page_number = page;
        this.getListUser();
    }

    onSelectLimit(limit: number) {
        this.pagination.page_size = limit;
        this.pagination.page_number = 1;
        this.getListUser();
    }

    getListUser() {
        this.queryParams = {
            ...this.queryParams,
            page_size: this.pagination.page_size,
            page_number: this.pagination.page_number,
        };
        this.userManagementService
            .getListUser(this.queryParams)
            .pipe(debounceTime(300))
            .subscribe({
                next: (response) => {
                    this.pagination = JSON.parse(
                        response.headers.get('x-pagination')
                    );
                    this.userList = response.body.data || [];
                    console.log(response.body.data);
                },
            });
    }

    addSearchListener() {
        this.searchTerm.valueChanges
            .pipe(debounceTime(300))
            .subscribe((val) => {
                this.queryParams.search_term = val;
                this.pagination.page_number = 1;
                this.getListUser();
            });
    }

    sortData(sort: Sort) {
        const order_by = sort.active + ' ' + sort.direction;
        this.queryParams.order_by = order_by;
        this.getListUser();
    }

    edit(userManagement: UserListUserManagement) {
        this.onEdit.emit(userManagement);
    }

    delete(userManagement: UserListUserManagement) {
        const matDialogRef = this.matDialog.open(UserManagementDeleteComponent, {
            data: userManagement.username,
        });

        matDialogRef.afterClosed().subscribe((resp) => {
            if (resp) {
                this.userManagementService
                    .deleteUser(userManagement.id)
                    .pipe(take(1))
                    .subscribe(() => {
                        this.pagination.page_number = 1;
                        this.getListUser();
                    });
            }
        });
    }

    detail(userManagement: UserListUserManagement) {
        this.onDetail.emit(userManagement);
    }
}
