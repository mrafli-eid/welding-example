import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NotificationRoutingModule } from './notification-routing.module';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { AllNotificationComponent } from './all-notification/all-notification.component';
import { MatTableModule } from '@angular/material/table';
import {PaginatorComponent} from 'src/app/shared/paginator/paginator.component'

@NgModule({
  declarations: [
    AllNotificationComponent
  ],
  imports: [
    CommonModule,
    NotificationRoutingModule,
    BreadcrumbsComponent,
    MatTableModule,
    PaginatorComponent
  ]
})
export class NotificationModule { }
