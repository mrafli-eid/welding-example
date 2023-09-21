import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementContainerComponent } from './user-management-container/user-management-container.component';
import { UserManagementUpsertComponent } from './user-management-upsert/user-management-upsert.component';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { SettingsRoutingModule } from '../settings/settings-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorComponent } from 'src/app/shared/paginator/paginator.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StringPipe } from 'src/app/shared/pipes/string.pipe';

@NgModule({
    declarations: [
        UserManagementContainerComponent,
        UserManagementUpsertComponent,
        UserManagementListComponent,
    ],
    imports: [
        CommonModule,
        SettingsRoutingModule,
        ReactiveFormsModule,
        FormsModule,
        BreadcrumbsComponent,
        MatSortModule,
        PaginatorComponent,
        NgOptimizedImage,
        MatSelectModule,
        MatInputModule,
        MatSlideToggleModule,
        StringPipe,
    ],
})
export class UserManagementModule {}
