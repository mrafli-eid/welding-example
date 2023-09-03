import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { AllNotificationComponent } from './all-notification/all-notification.component';
import { MatTableModule } from '@angular/material/table';

@NgModule({
  declarations: [
    AllNotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    BreadcrumbsComponent,
    MatTableModule
  ]
})
export class NotificationModule { }
