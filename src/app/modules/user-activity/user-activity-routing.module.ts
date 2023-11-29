import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserActivityListComponent } from './pages/user-activity-list/user-activity-list.component';

const routes: Routes = [
    {
        path: '',
        component: UserActivityListComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class UserActivityRoutingModule {}
