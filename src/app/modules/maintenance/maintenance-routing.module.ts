import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MaintenanceListComponent } from "./maintenance-list/maintenance-list.component";
import {
    PreventiveMaintenanceContainerComponent
} from "./preventive-maintenance/preventive-maintenance-container/preventive-maintenance-container.component";
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';

const routes: Routes = [
    {
        path: '',
        component: MaintenanceListComponent,
    },
    {
        path: ':id',
        component: MaintenanceDetailComponent,
        children: [
            {
              path: '',
              redirectTo: 'preventive',
              pathMatch: 'full'
            },
            {
                path: 'preventive',
                component: PreventiveMaintenanceContainerComponent
            },
            {
                path: 'corrective',
                component: PreventiveMaintenanceContainerComponent
            },
        ]
    },
];

@NgModule({
    imports: [ RouterModule.forChild(routes) ],
    exports: [ RouterModule ],
})
export class MaintenanceRoutingModule {
}
