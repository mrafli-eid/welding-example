import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { UserManagementRoutingModule } from './user-management-routing.module';
import { UserManagementListComponent } from './user-management-list/user-management-list.component';
import { BreadcrumbsComponent } from 'src/app/shared/breadcrumbs/breadcrumbs.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorComponent } from 'src/app/shared/paginator/paginator.component';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { StringPipe } from 'src/app/shared/pipes/string.pipe';
import { UserContainerComponent } from './user/user-container/user-container.component';
import { UserListComponent } from './user/user-list/user-list.component';
import { UserDetailComponent } from './user/user-detail/user-detail.component';
import { UserUpsertComponent } from './user/user-upsert/user-upsert.component';

@NgModule({
    declarations: [
        UserManagementListComponent,
        UserContainerComponent,
        UserListComponent,
        UserDetailComponent,
        UserUpsertComponent,
    ],
    imports: [
        CommonModule,
        UserManagementRoutingModule,
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
