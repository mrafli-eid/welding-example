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
import { DetailMachineRpmSpindleComponent } from './components/detail-machine-rpm-spindle/detail-machine-rpm-spindle.component';
import { ChartDetailMachineRpmSpindleComponent } from './components/detail-machine-rpm-spindle/chart-detail-machine-rpm-spindle.component';
import { DetailMachineRurgeCellComponent } from './components/detail-machine-rurge-cell/detail-machine-rurge-cell.component';
import { ChartDetailMachineRurgeCellComponent } from './components/detail-machine-rurge-cell/chart-detail-machine-rurge-cell.component';
import { DetailMachineSansoMaticComponent } from './components/detail-machine-sanso-matic/detail-machine-sanso-matic.component';
import { ChartDetailMachineSansoMaticComponent } from './components/detail-machine-sanso-matic/chart-detail-machine-sanso-matic.component';
import { DetailMachineDewPointComponent } from './components/detail-machine-dew-point/detail-machine-dew-point.component';
import { ChartDetailMachineDewPointComponent } from './components/detail-machine-dew-point/chart-detail-machine-dew-point.component';


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
        DetailMachineRpmSpindleComponent,
        DetailMachineRurgeCellComponent,
        DetailMachineSansoMaticComponent,
        DetailMachineDewPointComponent,
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
        ChartDetailMachineRunningHourComponent,
        ChartDetailMachineAmpereComponent,
        ChartDetailMachineVoltageComponent,
        ChartDetailMachineServoLoadComponent,
        ChartDetailMachineTemperatureMirrorComponent,
        ChartDetailMachineDewPointComponent,
        MatMenuModule,
        MatInputModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatSelectModule,
    ],
})
export class MachineModule {
}
