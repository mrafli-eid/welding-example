import { Component } from '@angular/core';
import { Breadcrumb } from '../../../../core/models/breadcrumbs.model';
import { UserManagement } from 'src/app/core/models/user-management';

@Component({
    selector: 'ahm-permissions-container',
    templateUrl: './permissions-container.component.html',
    styleUrls: ['./permissions-container.component.scss'],
})
export class PermissionsContainerComponent {
    breadcrumbs: Breadcrumb[] = [
        { label: 'Management User', link: '/user-management' },
        { label: 'Permissions', link: '/permissions' },
    ];
    isDetail = false;
    permissions: UserManagement[];

    onDetail(permissions: UserManagement[]) {
        this.permissions = permissions;
        this.isDetail = true;
    }

    onEdit(permissions: UserManagement[]) {
        this.permissions = permissions;
    }

    onFinished() {
        this.permissions = null;
        this.isDetail = false;
    }
}
