import { Component, EventEmitter, Output } from '@angular/core';
import { USER_LIST_DUMMY } from './user-list.dummy';
import { MasterParams } from 'src/app/core/models/master.model';
import { Pagination } from 'src/app/core/models/pagination.model';
import { UserList } from 'src/app/core/models/user-management';
import { FormControl } from '@angular/forms';
import { UserManagementService } from 'src/app/core/services/user-management.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'ahm-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
    userList: UserList[] = USER_LIST_DUMMY;
    queryParams: Partial<MasterParams> = {};
    pagination: Pagination = {
        page_number: 1,
        page_size: 10,
        total_count: 100,
        total_pages: 10,
    };
    searchTerm = new FormControl('');

    @Output() onEdit = new EventEmitter<UserList[]>();
    @Output() onDetail = new EventEmitter<UserList[]>();

    constructor(private userManagementService: UserManagementService,
                private matDialog: MatDialog) {
}

}
