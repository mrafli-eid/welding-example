import { NgModule } from '@angular/core';
import { CommonModule, NgOptimizedImage } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { DashboardComponent } from './pages/dashboard.component';
import { TimeMachineDetailComponent } from './components/time-machine-detail/time-machine-detail.component';
import { LayoutMachineAreaComponent } from './components/layout-machine-area/layout-machine-area.component';
import { MaintenanceScheduleComponent } from './components/maintenance-schedule/maintenance-schedule.component';
import { MachineActivityComponent } from './components/machine-activity/machine-activity.component';
import { ProductionGraphComponent } from './components/production-graph/production-graph.component';
import { TopMachineAlarmComponent } from './components/top-machine-alarm/top-machine-alarm.component';
import { MaintenanceIndicatorComponent } from './components/maintenance-indicator/maintenance-indicator.component';
import {
    MaintenanceIndicatorGraphMTBFComponent
} from './components/maintenance-indicator-graph/mtbf/maintenance-indicator-graph-mtbf.component';
import {
    MaintenanceIndicatorGraphMTTRComponent
} from './components/maintenance-indicator-graph/mttr/maintenance-indicator-graph-mttr.component';
import {
    MaintenanceCalendarComponent
} from './components/maintenance-schedule/maintenance-calendar/maintenance-calendar.component';
import {
    MaintenanceCalendarScheduleComponent
} from './components/maintenance-schedule/maintenance-calendar-schedule/maintenance-calendar-schedule.component';
import { DatepickerComponent } from '../../shared/datepicker/datepicker.component';
import { PaginationComponent } from '../../shared/pagination/pagination.component';
import { ChartTopMachineAlarmComponent } from './components/top-machine-alarm/chart-top-machine-alarm.component';
import { ChartProductionGraphComponent } from './components/production-graph/chart-production-graph.component';
import { ChartOilLevelComponent } from './components/oil-level/chart-oil-level.component';
import {
    ChartMaintenanceIndicatorGraphMTBFComponent
} from './components/maintenance-indicator-graph/mtbf/chart-maintenance-indicator-graph-mtbf.component';
import {
    ChartMaintenanceIndicatorGraphMTTRComponent
} from './components/maintenance-indicator-graph/mttr/chart-maintenance-indicator-graph-mttr.component';
import { ChartMachineActivityComponent } from './components/machine-activity/chart-machine-activity.component';
import { DotComponent } from '../../shared/dot/dot.component';
import { ChartTimeMachineDetailComponent } from './components/time-machine-detail/chart-time-machine-detail.component';
import { OilLevelComponent } from './components/oil-level/oil-level.component';
import { CycleTimeComponent } from './components/cycle-time/cycle-time.component';
import { ChartCycleTimeComponent } from './components/cycle-time/chart-cycle-time.component';
import { TimeMachineWrapperComponent } from './components/time-machine-wrapper/time-machine-wrapper.component';
import { ThousandPipe } from '../../shared/pipes/thousand.pipe';
import { SettingProductionGraphComponent } from './pages/setting-production-graph/setting-production-graph.component';
import { DialogAddProductionGraphComponent } from './dialogs/dialog-add-production-graph/dialog-add-production-graph.component';
import { DialogEditProductionGraphComponent } from './dialogs/dialog-edit-production-graph/dialog-edit-production-graph.component';
import { MatDialogModule } from '@angular/material/dialog';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSortModule } from '@angular/material/sort';
import { PaginatorComponent } from 'src/app/shared/paginator/paginator.component';
import { MatInputModule } from '@angular/material/input';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { OnlyNumberDirective } from 'src/app/shared/directives/number-only.directive';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DatepickerV2Component } from 'src/app/shared/datepicker-v2/datepicker-v2.component';


@NgModule({
    declarations: [
        DashboardComponent,
        TimeMachineDetailComponent,
        LayoutMachineAreaComponent,
        MaintenanceScheduleComponent,
        MachineActivityComponent,
        ProductionGraphComponent,
        TopMachineAlarmComponent,
        MaintenanceIndicatorComponent,
        MaintenanceIndicatorGraphMTBFComponent,
        MaintenanceIndicatorGraphMTTRComponent,
        OilLevelComponent,
        CycleTimeComponent,
        TimeMachineWrapperComponent,
        SettingProductionGraphComponent,
        DialogAddProductionGraphComponent,
        DialogEditProductionGraphComponent,
    ],
    imports: [
        CommonModule,
        DashboardRoutingModule,
        MaintenanceCalendarComponent,
        MaintenanceCalendarScheduleComponent,
        DatepickerComponent,
        PaginationComponent,
        ChartTopMachineAlarmComponent,
        ChartProductionGraphComponent,
        ChartOilLevelComponent,
        ChartMaintenanceIndicatorGraphMTBFComponent,
        ChartMaintenanceIndicatorGraphMTTRComponent,
        ChartMachineActivityComponent,
        DotComponent,
        ChartTimeMachineDetailComponent,
        ChartCycleTimeComponent,
        ThousandPipe,
        MatSelectModule,
        FormsModule,
        MatSortModule,
        NgOptimizedImage,
        PaginatorComponent,
        ReactiveFormsModule,
        MatDialogModule,
        MatInputModule,
        MatFormFieldModule,
        MatDatepickerModule,
        MatNativeDateModule,
        OnlyNumberDirective,
        DatepickerV2Component
    ],
})
export class DashboardModule {
}
