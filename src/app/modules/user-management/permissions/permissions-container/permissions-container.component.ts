import { Component, ViewChild } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumbs.model';
import { PermissionListUserManagement } from 'src/app/core/models/user-management';
import { PermissionsListComponent } from '../permissions-list/permissions-list.component';
// import { UserManagement } from 'src/app/core/models/user-management';

@Component({
    selector: 'ahm-permissions-container',
    templateUrl: './permissions-container.component.html',
    styleUrls: ['./permissions-container.component.scss'],
})
export class PermissionsContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Management User', link: '/user-management' },
        { label: 'Permissions', link: '/user-management/permissions' },
    ];
    data: PermissionListUserManagement;
    isDetail = false;

    @ViewChild(PermissionsListComponent)
    listComponent: PermissionsListComponent;

    onDetail(data: PermissionListUserManagement) {
        this.data = data;
        this.isDetail = true;
    }

    onEdit(data: PermissionListUserManagement) {
        this.data = data;
    }

    onFinished() {
        this.data = null;
        this.isDetail = false;
        this.listComponent.refreshData();
    }
}
