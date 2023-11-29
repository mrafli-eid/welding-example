import { Component, ViewChild } from '@angular/core';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs.model';
import { UserListUserManagement } from 'src/app/core/models/user-management';
import { UserListComponent } from '../user-list/user-list.component';

@Component({
    selector: 'ahm-user-container',
    templateUrl: './user-container.component.html',
    styleUrls: ['./user-container.component.scss'],
})
export class UserContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'User Management', link: '/user-management' },
        { label: 'User', link: '/user-management/user' },
    ];
    userManagement: UserListUserManagement;
    isDetail = false;

    @ViewChild(UserListComponent) listComponent: UserListComponent;

    onDetail(userManagement: UserListUserManagement) {
        this.userManagement = userManagement;
        this.isDetail = true;
    }

    onEdit(userManagement: UserListUserManagement) {
        this.userManagement = userManagement;
    }

    onFinished() {
        this.userManagement = null;
        this.isDetail = false;
        this.listComponent.refreshData();
    }
}
