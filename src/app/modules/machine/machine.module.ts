import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MachineRoutingModule } from './machine-routing.module';
import { DetailMachineComponent } from './components/detail-machine/detail-machine.component';
import { MachineComponent } from './pages/machine/machine.component';
import { DetailMachineAlarmComponent } from './components/detail-machine-alarm/detail-machine-alarm.component';
import {
    DetailMachineActivityMachineComponent
} from './components/detail-machine-activity-machine/detail-machine-activity-machine.component';
import {
    DetailMachineHistoryAlarmComponent
} from './components/detail-machine-history-alarm/detail-machine-history-alarm.component';
import {
    DetailMachineProductionGraphComponent
} from './components/detail-machine-production-graph/detail-machine-production-graph.component';
import {
    DetailMachineActualMaintenanceComponent
} from './components/detail-machine-actual-maintenance/detail-machine-actual-maintenance.component';
import {
    DetailMachineLubOilPressureComponent
} from './components/detail-machine-lub-oil-pressure/detail-machine-lub-oil-pressure.component';
import {
    ChartTopMachineAlarmComponent
} from '../dashboard/components/top-machine-alarm/chart-top-machine-alarm.component';
import { DatepickerComponent } from '../../shared/datepicker/datepicker.component';
import { DotComponent } from '../../shared/dot/dot.component';
import { PaginatorComponent } from '../../shared/paginator/paginator.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MatGridListModule } from "@angular/material/grid-list";
import { NgChartsModule } from "ng2-charts";
import {
    ChartDetailMachineAlarmComponent
} from "./components/detail-machine-alarm/chart-detail-machine-alarm.component";
import {
    ChartDetailMachineProductionGraphComponent
} from "./components/detail-machine-production-graph/chart-detail-machine-production-graph.component";
import {
    ChartDetailMachineLubOilPressureComponent
} from "./components/detail-machine-lub-oil-pressure/chart-detail-machine-lub-oil-pressure.component";
import {
    ChartDetailMachineActivityMachineComponent
} from "./components/detail-machine-activity-machine/chart-detail-machine-activity-machine.component";
import { MatMenuModule } from "@angular/material/menu";
import { MatInputModule } from "@angular/material/input";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { MatSelectModule } from "@angular/material/select";
import { DetailMachineTemperatureMirrorComponent } from './components/detail-machine-temperature-mirror/detail-machine-temperature-mirror.component';
import { ChartDetailMachineTemperatureMirrorComponent } from './components/detail-machine-temperature-mirror/chart-detail-machine-temperature-mirror.component';
import { DetailMachineRunningHourComponent } from './components/detail-machine-running-hour/detail-machine-running-hour.component';
import { ChartDetailMachineRunningHourComponent } from './components/detail-machine-running-hour/chart-detail-machine-running-hour.component';
import { DetailMachineAmpereComponent } from './components/detail-machine-ampere/detail-machine-ampere.component';
import { DetailMachineVoltageComponent } from './components/detail-machine-voltage/detail-machine-voltage.component';
import { DetailMachineServoLoadComponent } from './components/detail-machine-servo-load/detail-machine-servo-load.component';
import { ChartDetailMachineServoLoadComponent } from './components/detail-machine-servo-load/chart-detail-machine-servo-load.component';
import { ChartDetailMachineAmpereComponent } from './components/detail-machine-ampere/chart-detail-machine-ampere.component';
import { ChartDetailMachineVoltageComponent } from './components/detail-machine-voltage/chart-detail-machine-voltage.component';


@NgModule({
    declarations: [
        DetailMachineComponent,
        MachineComponent,
        DetailMachineAlarmComponent,
        DetailMachineActivityMachineComponent,
        DetailMachineHistoryAlarmComponent,
        DetailMachineProductionGraphComponent,
        DetailMachineActualMaintenanceComponent,
        DetailMachineLubOilPressureComponent,
        DetailMachineTemperatureMirrorComponent,
        DetailMachineRunningHourComponent,
        DetailMachineAmpereComponent,
        DetailMachineVoltageComponent,
        DetailMachineServoLoadComponent,
    ],
    imports: [
        CommonModule,
        MachineRoutingModule,
        ChartTopMachineAlarmComponent,
        DatepickerComponent,
        DotComponent,
        PaginatorComponent,
        ReactiveFormsModule,
        MatGridListModule,
        NgChartsModule,
        ChartTopMachineAlarmComponent,
        ChartDetailMachineAlarmComponent,
        ChartDetailMachineProductionGraphComponent,
        ChartDetailMachineLubOilPressureComponent,
        ChartDetailMachineActivityMachineComponent,
        ChartDetailMachineTemperatureMirrorComponent,
        ChartDetailMachineRunningHourComponent,
        ChartDetailMachineAmpereComponent,
        ChartDetailMachineVoltageComponent,
        ChartDetailMachineServoLoadComponent,
        MatMenuModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
    ],
})
export class MachineModule {
}
