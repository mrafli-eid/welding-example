import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { UserContainerComponent } from './user/user-container/user-container.component';
import { RoleContainerComponent } from './role/role-container/role-container.component';
import { PermissionsContainerComponent } from './permissions/permissions-container/permissions-container.component';

const routes: Routes = [
    {
        path: '',
        component: UserManagementListComponent,
    },
    {
        path: 'user',
        component: UserContainerComponent,
    },
    {
        path: 'role',
        component: RoleContainerComponent,
    },
    {
        path: 'permissions',
        component: PermissionsContainerComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserManagementRoutingModule {}
