import { Component } from '@angular/core';
import { Router } from '@angular/router';

interface UserManagement {
    label: string;
    link: string;
}

@Component({
    selector: 'ahm-user-management-list',
    templateUrl: './user-management-list.component.html',
    styleUrls: ['./user-management-list.component.scss'],
})
export class UserManagementListComponent {
    userManagementList: UserManagement[] = [
        {
            label: 'User',
            link: '/user-management/user',
        },
        {
            label: 'Role',
            link: '/user-management/role',
        },
        {
            label: 'Permissions',
            link: '/user-management/permissions',
        },
    ];

    constructor(private router: Router) {}

    navigateTo(link: string): void {
        this.router.navigate([link]);
    }
}
