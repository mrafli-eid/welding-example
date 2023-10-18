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
    permissionManagement: PermissionListUserManagement;
    isDetail = false;

    @ViewChild (PermissionsListComponent) listComponent: PermissionsListComponent;

    onDetail(permissionManagement: PermissionListUserManagement) {
        this.permissionManagement = permissionManagement;
        this.isDetail = true;
    }

    onEdit(permissionManagement: PermissionListUserManagement) {
        this.permissionManagement = permissionManagement;
    }

    onFinished() {
        this.permissionManagement = null;
        this.isDetail = false;
        this.listComponent.refreshData();
    }
}
