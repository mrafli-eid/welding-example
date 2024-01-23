import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BackofficeLayoutComponent } from './modules/layouts/backoffice-layout/backoffice-layout.component';

const routes: Routes = [
    {
        path: 'login',
        loadChildren: () =>
            import('./modules/login/login.module').then(m => m.LoginModule),
    },
    {
        path: '',
        pathMatch: 'full',
        redirectTo: '/login',
    },
    {
        path: '',
        component: BackofficeLayoutComponent,
        children: [
            {
                path: 'dashboard',
                loadChildren: () =>
                    import('./modules/dashboard/dashboard.module').then(
                        m => m.DashboardModule
                    ),
            },
            {
                path: 'machine',
                loadChildren: () =>
                    import('./modules/machine/machine.module').then(
                        m => m.MachineModule
                    ),
            },
            {
                path: 'master',
                loadChildren: () =>
                    import('./modules/master/master.module').then(
                        m => m.MasterModule
                    ),
            },
            {
                path: 'maintenance',
                loadChildren: () =>
                    import('./modules/maintenance/maintenance.module').then(
                        m => m.MaintenanceModule
                    ),
            },
            {
                path: 'user-activity',
                loadChildren: () =>
                    import('./modules/user-activity/user-activity.module').then(
                        m => m.UserActivityModule
                    ),
            },
            {
                path: 'user-management',
                loadChildren: () =>
                    import(
                        './modules/user-management/user-management.module'
                    ).then(m => m.UserManagementModule),
            },
            {
                path: 'account',
                loadChildren: () =>
                    import('./modules/account/account.module').then(
                        m => m.AccountModule
                    ),
            },
            {
                path: 'settings',
                loadChildren: () =>
                    import('./modules/settings/settings.module').then(
                        m => m.SettingsModule
                    ),
            },
            {
                path: 'notification',
                loadChildren: () =>
                    import('./modules/notification/notification.module').then(
                        m => m.NotificationModule
                    ),
            },
        ],
    },
    {
        path: '**',
        redirectTo: '/login',
    },
];

@NgModule({
    imports: [
        RouterModule.forRoot(routes, { paramsInheritanceStrategy: 'always' }),
    ],
    exports: [RouterModule],
})
export class AppRoutingModule {}
