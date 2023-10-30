import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { MaintenanceRoutingModule } from './maintenance-routing.module';
import { MaintenanceListComponent } from './maintenance-list/maintenance-list.component';
import {
    PreventiveMaintenanceContainerComponent
} from './preventive-maintenance/preventive-maintenance-container/preventive-maintenance-container.component';
import {
    PreventiveMaintenanceCalendarComponent
} from './preventive-maintenance/preventive-maintenance-calendar/preventive-maintenance-calendar.component';
import {
    PreventiveMaintenanceGraphComponent
} from './preventive-maintenance/preventive-maintenance-graph/preventive-maintenance-graph.component';
import {
    PreventiveMaintenanceListComponent
} from './preventive-maintenance/preventive-maintenance-list/preventive-maintenance-list.component';
import { ChartMaintenanceComponent } from './chart-maintenance/chart-maintenance.component';
import { NgChartsModule } from "ng2-charts";
import {
    MaintenanceCalendarComponent
} from '../dashboard/components/maintenance-schedule/maintenance-calendar/maintenance-calendar.component';
import {
    MaintenanceCalendarScheduleComponent
} from '../dashboard/components/maintenance-schedule/maintenance-calendar-schedule/maintenance-calendar-schedule.component';
import {
    ChartProductionGraphComponent
} from '../dashboard/components/production-graph/chart-production-graph.component';
import { DatepickerComponent } from '../../shared/datepicker/datepicker.component';
import { DotComponent } from '../../shared/dot/dot.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MaintenanceDetailComponent } from './maintenance-detail/maintenance-detail.component';
import { StringPipe } from '../../shared/pipes/string.pipe';
import {
    PreventiveMaintenanceUpsertComponent
} from './preventive-maintenance/preventive-maintenance-upsert/preventive-maintenance-upsert.component';
import {
    PreventiveMaintenanceDetailComponent
} from './preventive-maintenance/preventive-maintenance-detail/preventive-maintenance-detail.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatNativeDateModule } from '@angular/material/core';
import { DatepickerV2Component } from 'src/app/shared/datepicker-v2/datepicker-v2.component';
import { CorrectiveMaintenanceContainerComponent } from './corrective-maintenance/corrective-maintenance-container/corrective-maintenance-container.component';
import { CorrectiveMaintenanceGraphComponent } from './corrective-maintenance/corrective-maintenance-graph/corrective-maintenance-graph.component';
import { CorrectiveMaintenanceListComponent } from './corrective-maintenance/corrective-maintenance-list/corrective-maintenance-list.component';
import { CorrectiveMaintenanceUpsertComponent } from './corrective-maintenance/corrective-maintenance-upsert/corrective-maintenance-upsert.component';
import { CorrectiveMaintenanceDetailComponent } from './corrective-maintenance/corrective-maintenance-detail/corrective-maintenance-detail.component';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';


@NgModule({
    declarations: [
    MaintenanceListComponent,
    PreventiveMaintenanceContainerComponent,
    PreventiveMaintenanceCalendarComponent,
    PreventiveMaintenanceGraphComponent,
    PreventiveMaintenanceListComponent,
    ChartMaintenanceComponent,
    MaintenanceDetailComponent,
    PreventiveMaintenanceUpsertComponent,
    PreventiveMaintenanceDetailComponent,
    CorrectiveMaintenanceContainerComponent,
    CorrectiveMaintenanceGraphComponent,
    CorrectiveMaintenanceListComponent,
    CorrectiveMaintenanceUpsertComponent,
    CorrectiveMaintenanceDetailComponent
  ],
    imports: [
        CommonModule,
        MaintenanceRoutingModule,
        NgChartsModule,
        MaintenanceCalendarComponent,
        MaintenanceCalendarScheduleComponent,
        ChartProductionGraphComponent,
        DatepickerComponent,
        DotComponent,
        PaginationComponent,
        FormsModule,
        MatSortModule,
        NgOptimizedImage,
        PaginatorComponent,
        ReactiveFormsModule,
        MatDialogModule,
        StringPipe,
        MatDatepickerModule,
        MatInputModule,
        MatNativeDateModule,
        DatepickerV2Component,
        MatSelectModule,
        MatFormFieldModule,
    ],
})
export class MaintenanceModule {
}
