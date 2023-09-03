import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AllNotificationComponent } from './all-notification/all-notification.component';

const routes: Routes = [
    {
        path: '',
        component: AllNotificationComponent,
    },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class NotificationRoutingModule {}
