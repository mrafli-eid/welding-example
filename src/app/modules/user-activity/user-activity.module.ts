import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserActivityRoutingModule } from './user-activity-routing.module';
import { UserActivityListComponent } from './pages/user-activity-list/user-activity-list.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorComponent } from "../../shared/paginator/paginator.component";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';


@NgModule({
    declarations: [
        UserActivityListComponent,
    ],
    imports: [
        CommonModule,
        UserActivityRoutingModule,
        FormsModule,
        ReactiveFormsModule,
        MatSortModule,
        PaginatorComponent,
        MatFormFieldModule,
        MatInputModule,
        MatSelectModule,           // <----- this module will be deprecated in the future version.
        MatDatepickerModule,        // <----- import(must)
        MatNativeDateModule 
    ]
})
export class UserActivityModule {
}
