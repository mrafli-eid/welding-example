import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActivityRoutingModule } from './user-activity-routing.module';
import { UserActivityListComponent } from './pages/user-activity-list/user-activity-list.component';


@NgModule({
    declarations: [
        UserActivityListComponent,
    ],
    imports: [
        CommonModule,
        UserActivityRoutingModule,
    ],
})
export class UserActivityModule {
}
