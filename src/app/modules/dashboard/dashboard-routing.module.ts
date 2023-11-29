import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard.component';
import { SettingProductionGraphComponent } from './pages/setting-production-graph/setting-production-graph.component';

const routes: Routes = [
    {
        path: '',
        component: DashboardComponent,
    },
    {
        path: 'setting-production-graph',
        component: SettingProductionGraphComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class DashboardRoutingModule {}
