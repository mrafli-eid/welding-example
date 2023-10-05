import { Component } from '@angular/core';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs.model';
import { UserListUserManagement } from 'src/app/core/models/user-management';

@Component({
    selector: 'ahm-user-container',
    templateUrl: './user-container.component.html',
    styleUrls: ['./user-container.component.scss'],
}) 
export class UserContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Data Master', link: '/master' },
        { label: 'Subject', link: '/master/subject' },
    ];
    userManagement: UserListUserManagement[];
    isDetail = false;

    onDetail(userManagement: UserListUserManagement[]) {
        this.userManagement = userManagement;
        this.isDetail = true;
    }

    onEdit(userManagement: UserListUserManagement[]) {
        this.userManagement = userManagement;
    }

    onFinished() {
        this.userManagement = null;
        this.isDetail = false;
    }
}
