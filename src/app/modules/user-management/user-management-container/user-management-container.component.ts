import { Component } from '@angular/core';
import { Breadcrumb } from 'src/app/core/models/breadcrumbs.model';

@Component({
    selector: 'ahm-user-management-container',
    templateUrl: './user-management-container.component.html',
    styleUrls: ['./user-management-container.component.scss'],
})
export class UserManagementContainerComponent {
    breadcrumbs: Breadcrumb[] = [{ label: 'User Managament', link: '/user-management' }];

    
}
